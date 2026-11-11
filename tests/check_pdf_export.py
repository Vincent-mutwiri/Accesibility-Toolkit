"""PDF pagination regression: run against the local Vite server.

Requires Python Playwright and pypdf. PDFs/artifacts are saved under /tmp.
"""
from pathlib import Path
import json
from playwright.sync_api import sync_playwright, expect
from pypdf import PdfReader
from pypdf.generic import ContentStream

OUTPUT = Path('/tmp/ihub-pdf-qa')
OUTPUT.mkdir(exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path='/opt/brave.com/brave/brave')
    page = browser.new_page(viewport={'width': 1280, 'height': 900})
    page.goto('http://localhost:3000/#/online-learning')
    page.wait_for_load_state('networkidle')
    page.evaluate('document.fonts.ready')
    # Pure pagination cases catch the old forward-search clipping bug and
    # verify no source pixels are lost between slices.
    page.evaluate("""async () => {
      const {planPageSlices} = await import('/accessibility/pdfPagination.ts');
      const cases = [
        {height:2500, limit:1000, ranges:[{start:950,end:1050}], first:950},
        {height:2500, limit:1000, ranges:[{start:999.5,end:1010.2}], first:999},
        {height:2500, limit:1000, ranges:[], first:1000},
        {height:900, limit:1000, ranges:[{start:50,end:890}], first:900},
        {height:2500, limit:1000, ranges:[{start:0,end:1800},{start:980,end:1020}], first:980},
      ];
      for (const c of cases) {
        const slices = planPageSlices(c.height,c.limit,c.ranges);
        if(slices[0].end !== c.first) throw Error('Wrong first break');
        let cursor=0;
        for(const slice of slices) {
          if(slice.start !== cursor || slice.end<=cursor || slice.end-cursor>c.limit) throw Error('Missing pixels or oversized page');
          cursor=slice.end;
        }
        if(cursor!==c.height) throw Error('Missing final pixels');
      }
    }""")
    # Observe the exact expanded export layout and canvas slices while using
    # the real Download PDF button, html2canvas and jsPDF.
    page.evaluate("""() => {
      window.pdfSlices=[]; window.pdfBounds=null;
      const snapshot = (source, kind) => {
        const owner=source.ownerDocument;
        const origin=source.getBoundingClientRect();
        const bounds=el=>{const r=el.getBoundingClientRect();return {start:r.top-origin.top,end:r.bottom-origin.top,text:el.textContent?.slice(0,90)}};
        const rows=[...source.querySelectorAll('[data-pdf-keep-together]')].map(bounds);
        const headings=[...source.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(bounds);
        const lines=[];
        const walker=owner.createTreeWalker(source,NodeFilter.SHOW_TEXT);
        let node;
        while((node=walker.nextNode())) {
          if(!node.textContent.trim() || node.parentElement.closest('.pdf-ignore,[hidden]'))continue;
          const style=owner.defaultView.getComputedStyle(node.parentElement);
          if(style.display==='none'||style.visibility==='hidden')continue;
          const range=owner.createRange();range.selectNodeContents(node);
          for(const r of range.getClientRects()) if(r.width&&r.height)lines.push({start:r.top-origin.top,end:r.bottom-origin.top,text:node.textContent.slice(0,90)});
        }
        return {height:origin.height,rows,headings,lines,kind};
      };
      new MutationObserver(() => {
        if(!document.documentElement.classList.contains('pdf-capturing')) return;
        const source=document.querySelector('[data-toolkit-section], [data-guide-content]');
        window.pdfBounds=snapshot(source,'live');
      }).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
      // Read the actual renderer document immediately before html2canvas
      // disposes its iframe. Live page coordinates can differ after cloning.
      const removeChild=Node.prototype.removeChild;
      Node.prototype.removeChild=function(node){
        if(node instanceof HTMLIFrameElement && node.classList.contains('html2canvas-container')) {
          const source=node.contentDocument?.querySelector('[data-toolkit-section]') || node.contentDocument?.querySelector('[data-guide-content]');
          if(source)window.pdfBounds=snapshot(source,'clone');
        }
        return Reflect.apply(removeChild,this,[node]);
      };
      const original=CanvasRenderingContext2D.prototype.drawImage;
      CanvasRenderingContext2D.prototype.drawImage=function(...args){
        const [image,sx,sy,sw,sh,dx,dy,dw,dh]=args;
        if(args.length===9 && image instanceof HTMLCanvasElement && image.width===this.canvas.width && image.height>this.canvas.height && sx===0 && dx===0 && dy===0 && sw===dw && sh===dh && dh===this.canvas.height) {
          window.pdfSlices.push({start:sy,end:sy+sh,width:image.width,sourceHeight:image.height});
        }
        return Reflect.apply(original,this,args);
      };
    }""")
    for route,size,width in [('management-systems','combined',1280),('online-learning','standard',1280),('management-systems','standard',1280),('management-systems','large',960)]:
        page.set_viewport_size({'width':width,'height':900})
        if size == 'large':
            page.goto('http://localhost:3000/#/settings')
            page.get_by_role('button',name='Extra Large',exact=True).click()
        page.goto('http://localhost:3000/#/'+route)
        page.wait_for_load_state('networkidle')
        if size == 'combined':
            page.get_by_role('button',name='Click here for the checklist',exact=False).click()
            page.evaluate("""() => {
              const surface=document.createElement('div');surface.setAttribute('aria-hidden','true');surface.dataset.testPdfSurface='';
              surface.style.cssText='position:fixed;left:-99999px;top:0;width:820px;opacity:0;pointer-events:none';
              const section=document.createElement('section');section.dataset.toolkitSection='Management Systems';section.style.padding='24px 32px';
              const source=document.querySelector('[data-guide-content]');
              for(const child of source.childNodes)section.append(child.cloneNode(true));
              surface.append(section);document.body.append(surface);
            }""")
        page.evaluate('window.pdfSlices=[];window.pdfBounds=null')
        with page.expect_download(timeout=120000) as download:
            if size == 'combined':
                page.evaluate("""async () => {
                  const {downloadElementsAsPdf}=await import('/accessibility/pdfExport.ts');
                  await downloadElementsAsPdf([{element:document.querySelector('[data-toolkit-section]'),title:'Management Systems'}],'management-combined-test');
                }""")
            else:
                page.get_by_role('button',name='Download PDF',exact=True).click()
        path=OUTPUT/f'{route}-{size}.pdf'
        download.value.save_as(path)
        slices=page.evaluate('pdfSlices')
        bounds=page.evaluate('pdfBounds')
        assert slices and bounds and bounds['rows'], 'Capture was not observed'
        assert bounds['kind']=='clone', 'Must verify actual rendered layout'
        assert bounds['headings'] and bounds['lines'], 'Hidden export surfaces must still have text bounds'
        (OUTPUT/f'{route}-{size}-bounds.json').write_text(json.dumps({'bounds':bounds,'slices':slices},indent=2))
        pdf=PdfReader(path)
        assert len(pdf.pages)==len(slices), (len(pdf.pages),len(slices))
        cursor=0
        for index,slice in enumerate(slices):
            assert slice['start']==cursor, 'Source pixels were dropped or duplicated'
            cursor=slice['end']
            scale=slice['sourceHeight']/bounds['height']
            if index<len(slices)-1:
                boundary=slice['end']/scale
                for row in bounds['rows']:
                    # A single row taller than a page must span pages; all
                    # ordinary checklist rows must stay on a single page.
                    if row['end']-row['start'] < (269/190)*slice['width']/scale:
                        assert not row['start']<boundary<row['end'], (size,index,boundary,row)
                for text in bounds['headings']+bounds['lines']:
                    assert not text['start']<boundary<text['end'], (route,size,index,boundary,text)
            # Inspect actual PDF image transforms: nothing can extend below
            # the A4 content box even if a candidate gap is below the limit.
            for operands,operator in ContentStream(pdf.pages[index].get_contents(),pdf).operations:
                if operator==b'cm' and float(operands[0])>100:
                    assert float(operands[3]) <= 269*72/25.4 + .1
                    assert float(operands[5]) >= 10*72/25.4
        assert cursor==slices[0]['sourceHeight'], 'The end of the guide was lost'
        expect(page.get_by_role('button',name='Download PDF',exact=True)).to_be_enabled()
        assert not page.evaluate("document.documentElement.classList.contains('pdf-capturing')")
        print(f'{route} {size}: {len(pdf.pages)} pages; {len(bounds["rows"])} intact rows; {len(bounds["lines"])} unsplit text lines. {path}',flush=True)
        if size == 'combined': page.evaluate("document.querySelector('[data-test-pdf-surface]').remove()")
    browser.close()
