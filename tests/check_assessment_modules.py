"""Category assessment regression. Requires local Vite, Playwright, pypdf, Brave.

python3 tests/check_assessment_modules.py --url http://localhost:3000
Uses an optional local axe script; synthetic assessment data never leaves localhost.
"""
import argparse
import copy
import json
import re
import traceback
from pathlib import Path

from playwright.sync_api import expect, sync_playwright
from pypdf import PdfReader


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--url', default='http://localhost:3000')
    parser.add_argument('--production-url', help='Optional running production preview for the same PDF scope checks')
    parser.add_argument('--browser', default='/opt/brave.com/brave/brave')
    parser.add_argument('--output', type=Path, default=Path('/tmp/ihub-module-qa'))
    parser.add_argument('--axe', type=Path, default=Path('/tmp/ihub-axe.min.js'))
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    results, audits, errors = [], [], []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True, executable_path=args.browser)

        def context():
            ctx = browser.new_context(viewport={'width': 1440, 'height': 1000})
            ctx.route(re.compile(r'https?://([^/]*\.)?(googletagmanager\.com|google-analytics\.com)/'), lambda route: route.abort())
            socket = args.url.rstrip('/').replace('http://', 'ws://').replace('https://', 'wss://')
            ctx.route_web_socket(re.compile('^' + re.escape(socket) + '/'), lambda ws: None)
            ctx.on('page', lambda page: page.on('pageerror', lambda error: errors.append(str(error))))
            return ctx

        def go(page, route='self-assessment'):
            page.goto(args.url.rstrip('/') + '/#/' + route)
            page.wait_for_load_state('networkidle')
            expect(page.locator('main h1')).to_have_count(1)

        boot = context()
        page = boot.new_page()
        go(page)
        contract = page.evaluate("""async () => {
          const m = await import('/assessment/model.ts');
          const c = await import('/assessment/catalog.ts');
          return {draft:m.emptyDraft(),key:m.STORAGE_KEY,modules:c.modules,questions:c.allQuestions};
        }""")
        boot.close()
        template, key = contract['draft'], contract['key']
        modules = contract['modules']
        titles = {m['id']: m['title'] for m in modules}
        (args.output / 'contract.json').write_text(json.dumps(contract, indent=2))

        def seed(ctx, draft):
            ctx.add_init_script("""(() => {if (!sessionStorage.getItem('module-seeded')) {
              localStorage.setItem(%s, %s);sessionStorage.setItem('module-seeded','1');
            }})();""" % (json.dumps(key), json.dumps(json.dumps(draft))))

        def check_module(page, mid, checked=True):
            page.locator('.assessment-module-group').get_by_role('checkbox', name=re.compile('^' + re.escape(titles[mid]))).set_checked(checked)

        def apply(page):
            page.get_by_role('button', name='Apply module changes', exact=True).click()

        def nav(page, title):
            page.get_by_role('navigation', name='Assessment sections', exact=True).get_by_role('button', name=re.compile(title)).click()

        def review(page):
            nav(page, '^Review findings$')
            expect(page.locator('.assessment-results')).to_be_visible()

        def q(page, qid):
            return page.locator('#question-' + qid)

        def answer(page, qid, value):
            q(page, qid).locator('input[type=radio][value="' + value + '"]').check()

        def audit(page, state):
            if not args.axe.exists():
                return
            page.add_script_tag(path=str(args.axe))
            violations = page.evaluate("""async () => (await axe.run(document, {
              runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}
            })).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))""")
            audits.append({'state': state, 'violations': violations})

        def run(name, operation):
            ctx = context()
            page = ctx.new_page()
            try:
                operation(ctx, page)
                results.append({'scenario': name, 'passed': True})
                print('PASS ' + name, flush=True)
            except Exception as error:
                trace = traceback.format_exc()
                results.append({'scenario': name, 'passed': False, 'error': str(error), 'trace': trace})
                print('FAIL ' + name + '\n' + trace, flush=True)
                try:
                    page.screenshot(path=str(args.output / (name + '.png')), full_page=True)
                except Exception:
                    pass
            finally:
                ctx.close()
                (args.output / 'results.json').write_text(json.dumps({'scenarios': results, 'axe': audits, 'pageerrors': errors}, indent=2))

        def catalog_model(ctx, page):
            go(page)
            summary = page.evaluate("""async () => {
              const c=await import('/assessment/catalog.ts'),m=await import('/assessment/model.ts');
              const assert=(ok,msg)=>{if(!ok)throw new Error(msg)};
              assert(c.modules.length===10&&c.allQuestions.length===52,'catalog size');
              assert(new Set(c.allQuestions.map(q=>q.id)).size===52,'duplicate catalog ID');
              const expected=[7,5,4,8,6,6,3,4,4,2];
              c.modules.forEach((mod,i)=>assert(mod.questionIds.length===expected[i],mod.id+' count'));
              for(let mask=0;mask<1024;mask++) {
                const selected=c.modules.filter((_,i)=>mask&(1<<i)).map(x=>x.id);
                const qs=c.getActiveQuestions(selected),ss=c.getActiveSections(selected);
                const expectedIds=new Set(c.modules.filter(x=>selected.includes(x.id)).flatMap(x=>x.questionIds));
                assert(qs.length===22+expectedIds.size,'selection count '+mask);
                assert(new Set(qs.map(q=>q.id)).size===qs.length,'selection duplicates '+mask);
                assert(qs.every(q=>ss.some(s=>s.id===q.sectionId)),'section coverage '+mask);
                const draft=m.emptyDraft();draft.selectedModules=selected;
                const report=m.buildReport(draft);
                assert(report.total===qs.length&&report.answered===0,'report scope '+mask);
                assert(report.modules.length===selected.length&&report.notAssessed.length===10-selected.length,'coverage '+mask);
              }
              const d=m.emptyDraft();d.selectedModules=['tutoring','hearing-access'];
              d.responses.SH01={...m.emptyResponse(),answer:'no',context:'Shared live caption issue'};
              let r=m.buildReport(d);
              assert(r.items.filter(x=>x.id==='SH01').length===1&&r.items.find(x=>x.id==='SH01').modules.length===2,'shared result');
              assert(r.modules.every(x=>x.answered===1),'shared summaries');
              d.selectedModules=[];assert(!m.buildReport(d).items.some(x=>x.id==='SH01'),'inactive leakage');
              d.selectedModules=['hearing-access'];assert(m.buildReport(d).answered===1,'restore inactive');
              for(const question of c.specialistQuestions) {
                assert(question.options.length>=2&&question.guidance&&question.verify&&question.source.path,'incomplete content '+question.id);
                assert(question.relatedCore.every(id=>/^Q/.test(id)),'core references '+question.id);
                const response={...m.emptyResponse(),answer:'yes',options:['other']};
                assert(m.responseErrors(question,response).length===1,'Other validation '+question.id);
                response.other='Reviewed method';assert(!m.responseErrors(question,response).length,'Other valid '+question.id);
                response.answer='no';assert(!m.responseErrors(question,response).length,'inactive yes validation '+question.id);
                response.answer='na';response.naReason='Feature absent';
                assert(m.responseErrors(question,response).length===(question.allowNA?0:1),'NA permission '+question.id);
                assert(question.allowNA===Boolean(question.naCondition),'NA rule missing '+question.id);
              }
              const h=c.allQuestions.find(x=>x.id==='HEAR01');d.responses.HEAR01={...m.emptyResponse(),answer:'na',naReason:'No captioned media'};
              d.responses.Q06.answer='no';assert(m.draftResponseErrors(h,d.responses.HEAR01,d).length,'caption NA guard');
              d.responses.Q06.answer='yes';assert(m.draftResponseErrors(h,d.responses.HEAR01,d).length,'activeSH01 guard');
              d.selectedModules=[];assert(!m.draftResponseErrors(h,d.responses.HEAR01,d).length,'inactiveSH01 guard');
              return {combinations:1024,unique:52};
            }""")
            assert summary == {'combinations': 1024, 'unique': 52}

        run('catalog-all-1024-selections-and-validation', catalog_model)

        def migration(ctx, page):
            legacy = {k: copy.deepcopy(v) for k, v in template.items() if k not in ['selectedModules', 'moduleVersions']}
            legacy['schemaVersion'] = 1
            legacy['responses'] = {k: v for k, v in legacy['responses'].items() if k.startswith('Q')}
            legacy['project'] = 'Legacy résumé project'
            legacy['responses']['Q01'].update(answer='no', context='Original exact answer')
            seed(ctx, legacy)
            go(page)
            expect(page.get_by_label('Project or product name')).to_have_value(legacy['project'])
            expect(page.locator('.assessment-intro')).to_contain_text('carried forward')
            assert json.loads(page.evaluate('(key)=>localStorage.getItem(key)', key)) == legacy
            result = page.evaluate("""async () => {
              const m=await import('/assessment/model.ts'),before=localStorage.getItem(m.STORAGE_KEY);
              const original=Storage.prototype.setItem;
              Storage.prototype.setItem=()=>{throw new Error('quota')};
              try {const r=m.readDraft();return {status:r.status,saved:m.saveDraft(r.draft),unchanged:before===localStorage.getItem(m.STORAGE_KEY)}}
              finally{Storage.prototype.setItem=original}
            }""")
            assert result == {'status': 'migrated', 'saved': False, 'unchanged': True}
            check_module(page, 'visual-access')
            apply(page)
            raw = json.loads(page.evaluate('(key)=>localStorage.getItem(key)', key))
            assert raw['schemaVersion'] == 2 and raw['selectedModules'] == ['visual-access']
            assert raw['responses']['Q01']['context'] == 'Original exact answer'
            page.reload(wait_until='networkidle')
            expect(page.locator('progress')).to_have_attribute('max', '25')

        run('legacy-migration-no-write-and-failed-save', migration)

        def invalid_drafts(ctx, page):
            go(page)
            checked = page.evaluate("""async () => {
              const m=await import('/assessment/model.ts');const base=m.emptyDraft(),bad=[];
              const add=(edit,status='invalid')=>{const d=structuredClone(base);edit(d);bad.push([d,status])};
              add(d=>d.selectedModules=['unknown']);add(d=>d.selectedModules=['steam','steam']);
              add(d=>d.selectedModules='steam');add(d=>delete d.moduleVersions.steam);
              add(d=>d.moduleVersions.unknown='1.0.0');add(d=>d.moduleVersions.steam='99','incompatible');
              add(d=>d.responses.SH01.options=['not-an-option']);add(d=>d.responses.DSL01.answer='na');
              add(d=>d.responses.TUT01.notes=4);add(d=>d.responses.unknown=m.emptyResponse());
              add(d=>d.schemaVersion=99,'incompatible');add(d=>d.questionVersion='99','incompatible');
              add(d=>d.selectedModules=['__proto__']);add(d=>d.responses.DSL01.notes='x'.repeat(4001));
              try {
                for(const [d,status] of bad){const raw=JSON.stringify(d);localStorage.setItem(m.STORAGE_KEY,raw);
                  if(m.readDraft().status!==status||localStorage.getItem(m.STORAGE_KEY)!==raw)throw new Error('bad draft accepted or overwritten');}
                const valid=m.emptyDraft();valid.responses.STM02={...m.emptyResponse(),answer:'yes',notes:'Inactive valid answer'};
                if(!m.saveDraft(valid)||m.readDraft().draft.responses.STM02.notes!=='Inactive valid answer')throw new Error('inactive save lost');
                return bad.length;
              }finally{localStorage.removeItem(m.STORAGE_KEY)}
            }""")
            assert checked == 14

        run('strict-module-draft-validation', invalid_drafts)

        def selection(ctx, page):
            go(page)
            audit(page, 'core-only-setup')
            check_module(page, 'tutoring')
            check_module(page, 'hearing-access')
            expect(page.get_by_role('button', name='Start assessment', exact=True)).to_be_disabled()
            expect(page.get_by_role('button', name='Review findings', exact=True)).to_be_disabled()
            expect(page.locator('.assessment-module-picker')).to_contain_text('Preview: 32 unique')
            apply(page)
            expect(page.locator('progress')).to_have_attribute('max', '32')
            expect(page.locator('#module-picker-title')).to_be_focused()
            audit(page, 'two-modules-applied')
            nav(page, 'Shared specialist checks')
            expect(q(page, 'SH01')).to_have_count(1)
            answer(page, 'SH01', 'no')
            q(page, 'SH01').locator('textarea').fill('Shared caption barrier')
            audit(page, 'shared-no-guidance')
            nav(page, re.escape(titles['tutoring']))
            answer(page, 'TUT01', 'yes')
            q(page, 'TUT01').get_by_role('checkbox', name='Other — please describe', exact=True).check()
            page.get_by_role('button', name='Continue', exact=True).click()
            expect(q(page, 'TUT01').locator('[aria-invalid=true]')).to_be_focused()
            q(page, 'TUT01').locator('[id=other-TUT01]').fill('Saved exclusive tutor method')
            review(page)
            expect(page.locator('.assessment-finding')).to_have_count(32)
            article = page.locator('.assessment-finding').filter(has=page.get_by_role('heading', name=re.compile('^SH01:')))
            expect(article).to_contain_text(titles['tutoring'])
            expect(article).to_contain_text(titles['hearing-access'])
            page.get_by_role('button', name='Edit answer for TUT01', exact=True).click()
            expect(page.locator('#heading-TUT01')).to_be_focused()
            nav(page, '^Before you begin$')
            check_module(page, 'tutoring', False)
            expect(page.locator('.assessment-module-picker')).to_contain_text('retain its answers')
            apply(page)
            expect(page.locator('progress')).to_have_attribute('max', '26')
            review(page)
            expect(page.locator('.assessment-finding')).to_have_count(26)
            expect(page.locator('.assessment-results')).not_to_contain_text('Saved exclusive tutor method')
            expect(page.locator('.assessment-results')).to_contain_text('Shared caption barrier')
            nav(page, '^Before you begin$')
            check_module(page, 'tutoring')
            apply(page)
            nav(page, re.escape(titles['tutoring']))
            expect(q(page, 'TUT01').locator('#other-TUT01')).to_have_value('Saved exclusive tutor method')
            nav(page, '^Before you begin$')
            check_module(page, 'hearing-access', False)
            page.get_by_role('button', name='Discard selection changes', exact=True).focus()
            page.keyboard.press('Enter')
            expect(page.locator('#module-picker-title')).to_be_focused()
            expect(page.locator('progress')).to_have_attribute('max', '32')
            page.reload(wait_until='networkidle')
            expect(page.locator('progress')).to_have_attribute('max', '32')
            page.get_by_role('button', name='Clear assessment', exact=True).click()
            page.get_by_role('button', name='Yes, clear all answers', exact=True).click()
            expect(page.locator('progress')).to_have_attribute('max', '22')
            assert page.evaluate('(key)=>localStorage.getItem(key)', key) is None

        run('selection-dedup-edit-remove-restore-clear', selection)

        def hearing_guard(ctx, page):
            draft = copy.deepcopy(template)
            draft['selectedModules'] = ['hearing-access']
            draft['responses']['Q06']['answer'] = 'no'
            seed(ctx, draft)
            go(page)
            nav(page, re.escape(titles['hearing-access']))
            answer(page, 'HEAR01', 'na')
            q(page, 'HEAR01').locator('textarea').fill('No captions yet')
            page.locator('.assessment-section-actions').get_by_role('button', name='Review findings', exact=True).click()
            expect(q(page, 'HEAR01')).to_contain_text('cannot be used')
            expect(q(page, 'HEAR01').locator('textarea')).to_have_attribute('aria-invalid', 'true')
            expect(q(page, 'HEAR01').locator('textarea')).to_be_focused()
            audit(page, 'specialist-applicability-error')
            review(page)
            expect(page.locator('.assessment-results')).to_contain_text('required follow-up details missing')

        run('caption-not-applicable-cross-check', hearing_guard)

        def guide_suggestions(ctx, page):
            draft = copy.deepcopy(template)
            draft['selectedModules'] = ['steam']
            seed(ctx, draft)
            go(page, 'hearing-impairment')
            page.get_by_role('link', name='Assess this category', exact=True).click()
            expect(page.locator('.assessment-module-picker')).to_contain_text('The guide suggested')
            expect(page.locator('progress')).to_have_attribute('max', '28')
            page.get_by_role('button', name='Add suggested module', exact=True).click()
            expect(page.locator('progress')).to_have_attribute('max', '28')
            apply(page)
            expect(page.locator('progress')).to_have_attribute('max', '32')
            saved = json.loads(page.evaluate('(key)=>localStorage.getItem(key)', key))
            assert set(saved['selectedModules']) == {'steam', 'hearing-access'}
            go(page, 'lms')
            page.get_by_role('link', name='Assess this category — Management Systems', exact=True).click()
            expect(page.locator('.assessment-module-picker')).to_contain_text('The guide suggested Management Systems')
            expect(page.locator('progress')).to_have_attribute('max', '32')

        run('guide-suggestions-preserve-existing-scope', guide_suggestions)

        def denied_storage(ctx, page):
            ctx.add_init_script("""Storage.prototype.getItem=()=>{throw new Error('denied')};
              Storage.prototype.setItem=()=>{throw new Error('denied')};Storage.prototype.removeItem=()=>{throw new Error('denied')};""")
            go(page)
            page.get_by_label('Project or product name').fill('Session category project')
            check_module(page, 'dual-sensory-access')
            apply(page)
            nav(page, re.escape(titles['dual-sensory-access']))
            answer(page, 'DSL01', 'unsure')
            q(page, 'DSL01').locator('textarea').fill('Need suitable test setup')
            q(page, 'DSL01').get_by_role('link').click()
            expect(page.locator('main h1')).not_to_contain_text('self-assessment')
            page.go_back()
            expect(page.get_by_label('Project or product name')).to_have_value('Session category project')
            expect(page.locator('progress')).to_have_attribute('max', '24')
            nav(page, re.escape(titles['dual-sensory-access']))
            expect(q(page, 'DSL01').locator('textarea')).to_have_value('Need suitable test setup')
            page.reload(wait_until='networkidle')
            expect(page.locator('progress')).to_have_attribute('max', '22')
            expect(page.get_by_label('Project or product name')).to_have_value('')

        run('storage-denied-modules-same-tab-resume', denied_storage)

        def source_destinations(ctx, page):
            root = Path(__file__).resolve().parents[1]
            app = (root / 'App.tsx').read_text()
            source_files = {
                '/management-systems': 'ManagementSystems', '/online-learning': 'OnlineLearning',
                '/digital-learning': 'DigitalLearning', '/tutoring': 'Tutoring', '/steam': 'STEAM',
                '/workforce': 'Workforce', '/visual-impairment': 'VisualImpairment',
                '/hearing-impairment': 'HearingImpairment', '/dual-sensory-loss': 'DualSensoryLoss',
                '/intellectual-developmental-disabilities': 'IntellectualDevelopmentalDisabilities',
            }
            for question in contract['questions']:
                source = question['source']
                assert 'path="' + source['path'] + '"' in app
                content = (root / 'pages' / (source_files[source['path']] + 'Page.tsx')).read_text()
                if source.get('sectionId'):
                    assert 'id="' + source['sectionId'] + '"' in content, question['id']
            for route, name in source_files.items():
                go(page, route.lstrip('/'))
                expect(page.get_by_role('link', name='Assess this category', exact=True)).to_be_visible()
            go(page, 'lms')
            expect(page.get_by_role('link', name='Assess this category — Management Systems', exact=True)).to_be_visible()

        run('all-sources-and-category-entry-links', source_destinations)

        def all_modules_pdf(ctx, page):
            draft = copy.deepcopy(template)
            draft['selectedModules'] = [m['id'] for m in modules]
            draft['project'] = 'Inclusive résumé — Ελληνικά Кириллица ✓'
            draft['scope'] = 'All ten category modules'
            seed(ctx, draft)
            go(page)
            expect(page.locator('progress')).to_have_attribute('max', '52')
            review(page)
            expect(page.locator('.assessment-finding')).to_have_count(52)
            audit(page, 'all-modules-partial-report')
            with page.expect_download() as download:
                page.get_by_role('button', name='Download PDF report', exact=True).click()
            filename = args.output / 'all52-partial.pdf'
            download.value.save_as(filename)
            text = '\n'.join(p.extract_text() for p in PdfReader(filename).pages)
            assert 'Partial assessment | 0 of 52 answered' in text
            assert 'Not assessed in depth' in text and 'not a tagged accessible PDF' in text
            assert 'Ελληνικά Кириллица ✓' in text
            for question in contract['questions']:
                assert text.count(question['id'] + ' | Section:') == 1
            for module in modules:
                assert module['title'] in text and module['version'] in text
            # Replace saved responses and reload, checking full-scope completion separately.
            for response in draft['responses'].values():
                response['answer'] = 'no'
                response['context'] = 'Verified implementation gap: café — Ω'
            page.evaluate('(pair)=>localStorage.setItem(pair[0],JSON.stringify(pair[1]))', [key, draft])
            page.reload(wait_until='networkidle')
            review(page)
            expect(page.locator('.assessment-report-state')).to_have_text('Complete self-assessment')
            audit(page, 'all-modules-complete-report')
            with page.expect_download() as download:
                page.get_by_role('button', name='Download PDF report', exact=True).click()
            filename = args.output / 'all52-complete.pdf'
            download.value.save_as(filename)
            text = '\n'.join(p.extract_text() for p in PdfReader(filename).pages)
            assert 'Complete self-assessment | 52 of 52 answered' in text
            assert text.count('Verified implementation gap: café — Ω') == 52
            # Removing every module excludes specialist IDs AND their retained free text.
            draft['selectedModules'] = []
            for qid, response in draft['responses'].items():
                if not qid.startswith('Q'):
                    response['context'] = 'PRIVATE INACTIVE SPECIALIST DETAIL'
            page.evaluate('(pair)=>localStorage.setItem(pair[0],JSON.stringify(pair[1]))', [key, draft])
            page.reload(wait_until='networkidle')
            review(page)
            expect(page.locator('.assessment-finding')).to_have_count(22)
            expect(page.locator('.assessment-results')).not_to_contain_text('PRIVATE INACTIVE')
            with page.expect_download() as download:
                page.get_by_role('button', name='Download PDF report', exact=True).click()
            filename = args.output / 'core-with-inactive.pdf'
            download.value.save_as(filename)
            text = '\n'.join(p.extract_text() for p in PdfReader(filename).pages)
            assert 'Complete self-assessment | 22 of 22 answered' in text
            assert 'PRIVATE INACTIVE' not in text and 'SH01 | Section:' not in text
            assert 'None selected. This is a core-only assessment.' in text
            for module in modules:
                assert module['title'] in text

        run('all52-partial-full-unicode-and-inactive-pdfs', all_modules_pdf)

        def mobile(ctx, page):
            page.set_viewport_size({'width': 390, 'height': 844})
            draft = copy.deepcopy(template)
            draft['selectedModules'] = [m['id'] for m in modules]
            seed(ctx, draft)
            go(page)
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
            audit(page, 'mobile-all-modules-setup')
            nav(page, 'Shared specialist checks')
            answer(page, 'SH01', 'na')
            page.get_by_role('button', name='Continue', exact=True).click()
            expect(q(page, 'SH01').locator('textarea')).to_be_focused()
            audit(page, 'mobile-specialist-required-error')
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
            review(page)
            audit(page, 'mobile-all52-report')
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
            page.screenshot(path=str(args.output / 'mobile-report.png'), full_page=True)

        run('mobile-layout-and-accessibility', mobile)

        def max_storage(ctx, page):
            go(page)
            assert page.evaluate("""async () => {
              const m=await import('/assessment/model.ts');const d=m.emptyDraft();
              const c=await import('/assessment/catalog.ts');d.selectedModules=c.modules.map(x=>x.id);
              for(const r of Object.values(d.responses)) {
                r.answer='no';for(const key of ['other','notes','context','naReason'])r[key]='\\u0001'.repeat(4000);
              }
              try{return m.saveDraft(d)&&m.readDraft().status==='restored'&&m.readDraft().draft.responses.DSL02.context.length===4000}
              finally{localStorage.removeItem(m.STORAGE_KEY)}
            }""")

        run('maximum-escaped-draft-round-trip', max_storage)
        if args.production_url:
            args.url = args.production_url
            args.output = args.output / 'production'
            args.output.mkdir(parents=True, exist_ok=True)
            run('production-all52-and-inactive-pdfs', all_modules_pdf)
        # Keep one authoritative combined result even when production artifacts
        # live separately. Never overwrite development PDFs with preview output.
        output = args.output.parent if args.production_url else args.output
        (output / 'results.json').write_text(json.dumps({'scenarios': results, 'axe': audits, 'pageerrors': errors}, indent=2))
        browser.close()

    failed = [r['scenario'] for r in results if not r['passed']]
    violations = [a for a in audits if a['violations']]
    print(json.dumps({'passed': len(results) - len(failed), 'total': len(results), 'failed': failed,
                      'axe_states': len(audits), 'axe_failures': violations, 'pageerrors': errors}, indent=2))
    raise SystemExit(1 if failed or violations or errors else 0)


if __name__ == '__main__':
    main()