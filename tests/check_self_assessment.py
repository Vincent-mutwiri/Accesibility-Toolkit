"""Self-assessment browser/model/PDF regression (running Vite development server).

python3 tests/check_self_assessment.py --url http://localhost:3000
Requires Python Playwright, pypdf and Brave. No assessment data leaves localhost.
Artifacts and a machine-readable per-scenario report are retained under --output.
An existing /tmp/ihub-axe.min.js is used by default; omit that file to skip axe.
"""
import argparse
import copy
import json
import re
import traceback
from pathlib import Path

from playwright.sync_api import expect, sync_playwright
from pypdf import PdfReader


def arguments():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--url', default='http://localhost:3000')
    parser.add_argument('--browser', default='/opt/brave.com/brave/brave')
    parser.add_argument('--axe', type=Path, default=Path('/tmp/ihub-axe.min.js') if Path('/tmp/ihub-axe.min.js').exists() else None)
    parser.add_argument('--output', type=Path, default=Path('/tmp/ihub-assessment-qa'))
    return parser.parse_args()


def main():
    args = arguments()
    args.output.mkdir(parents=True, exist_ok=True)
    results, audits, errors = [], [], []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True, executable_path=args.browser)

        def context(**kwargs):
            ctx = browser.new_context(viewport={'width': 1440, 'height': 1000}, color_scheme='light', **kwargs)
            ctx.route(re.compile(r'https?://([^/]*\.)?(googletagmanager\.com|google-analytics\.com)/'), lambda route: route.abort())
            # Vite HMR is not application behavior; unrelated edits/builds must
            # not reload a page while an axe audit or PDF request is in flight.
            socket_url = args.url.rstrip('/').replace('https://', 'wss://').replace('http://', 'ws://')
            ctx.route_web_socket(re.compile('^' + re.escape(socket_url) + '/'), lambda socket: None)
            ctx.on('page', lambda page: page.on('pageerror', lambda error: errors.append(str(error))))
            return ctx

        def go(page, route='self-assessment'):
            page.goto(args.url.rstrip('/') + '/#/' + route)
            page.wait_for_load_state('networkidle')
            expect(page.locator('main h1')).to_have_count(1)

        bootstrap = context()
        page = bootstrap.new_page()
        go(page)
        contract = page.evaluate("""async () => {
          const m = await import('/assessment/model.ts');
          const q = await import('/assessment/questions.ts');
          return {key:m.STORAGE_KEY, draft:m.emptyDraft(), questions:q.questions, sections:q.sections};
        }""")
        bootstrap.close()
        key, template = contract['key'], contract['draft']
        questions, sections = contract['questions'], contract['sections']
        (args.output / 'contract.json').write_text(json.dumps(contract, indent=2))

        def seed(ctx, raw):
            # Seed once, not on every reload: clear/reload must not resurrect fixtures.
            ctx.add_init_script("""(() => {
              if (!sessionStorage.getItem('qa-seeded')) {
                localStorage.setItem(%s, %s); sessionStorage.setItem('qa-seeded','1');
              }
            })();""" % (json.dumps(key), json.dumps(raw)))

        def section(page, sid):
            index = next(i for i, item in enumerate(sections) if item['id'] == sid)
            page.get_by_role('navigation', name='Assessment sections', exact=True).get_by_role('button').nth(index + 1).click()
            expect(page.locator('.assessment-content > h2')).to_have_text(sections[index]['title'])

        def question(page, qid):
            return page.locator('#question-' + qid)

        def answer(page, qid, value):
            question(page, qid).locator('input[type=radio][value="' + value + '"]').check()

        def review(page):
            page.get_by_role('navigation', name='Assessment sections', exact=True).get_by_role('button', name='Review findings', exact=True).click()
            expect(page.locator('.assessment-results')).to_be_visible()

        def axe(page, state):
            if not args.axe:
                return
            page.add_script_tag(path=str(args.axe))
            audit = page.evaluate("""async () => {
              const result = await axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});
              return result.violations.map(v=>({id:v.id, impact:v.impact, nodes:v.nodes.map(n=>({target:n.target, summary:n.failureSummary}))}));
            }""")
            audits.append({'state': state, 'violations': audit})
            (args.output / 'axe.json').write_text(json.dumps(audits, indent=2))

        def run(name, operation):
            ctx = context()
            page = ctx.new_page()
            try:
                operation(ctx, page)
                results.append({'scenario': name, 'passed': True})
                print('PASS ' + name, flush=True)
            except Exception as error:
                trace = traceback.format_exc()
                results.append({'scenario': name, 'passed': False, 'error': str(error), 'traceback': trace})
                print('FAIL ' + name + '\n' + trace, flush=True)
                try:
                    page.screenshot(path=str(args.output / (name + '-failure.png')), full_page=True)
                    (args.output / (name + '-failure.html')).write_text(page.content())
                except Exception:
                    pass
            finally:
                ctx.close()
                (args.output / 'results.json').write_text(json.dumps({'scenarios': results, 'axe': audits, 'pageerrors': errors}, indent=2))

        def initial_navigation(ctx, page):
            go(page)
            expect(page.locator('progress')).to_have_attribute('value', '0')
            assert page.evaluate('(key)=>localStorage.getItem(key)', key) is None, 'Opening must not create a draft'
            axe(page, 'intro')
            start = page.get_by_role('button', name='Start assessment', exact=True)
            start.focus()
            page.keyboard.press('Enter')
            expect(page.locator('.assessment-content > h2')).to_be_focused()
            expect(page.locator('input[type=radio]:checked')).to_have_count(0)
            expect(page.locator('.assessment-followup')).to_have_count(0)
            assert not any(page.locator('.assessment-feedback').all_text_contents()), 'Guidance must wait for an answer'
            first = question(page, 'Q01').locator('input[type=radio]').first
            first.focus()
            page.keyboard.press('Space')
            expect(first).to_be_checked()
            expect(page.locator('progress')).to_have_attribute('value', '1')
            page.get_by_role('button', name='Continue', exact=True).click()
            expect(page.locator('.assessment-content > h2')).to_be_focused()
            expect(page.locator('input[type=radio]:checked')).to_have_count(0)
            page.get_by_role('button', name='Back', exact=True).click()
            expect(first).to_be_checked()
            axe(page, 'answered-yes')

        run('initial-navigation-keyboard', initial_navigation)

        def branching(ctx, page):
            go(page)
            section(page, 'A')
            answer(page, 'Q01', 'no')
            expect(question(page, 'Q01').get_by_role('status')).to_contain_text(questions[0]['guidance'])
            expect(question(page, 'Q01').get_by_role('checkbox')).to_have_count(0)
            answer(page, 'Q01', 'unsure')
            expect(question(page, 'Q01').get_by_role('status')).to_contain_text(questions[0]['verify'])
            axe(page, 'unsure')
            answer(page, 'Q01', 'yes')
            boxes = question(page, 'Q01').get_by_role('checkbox')
            expect(boxes).to_have_count(len(questions[0]['options']) + 1)
            boxes.first.check()
            boxes.nth(1).check()
            question(page, 'Q01').get_by_role('checkbox', name='Other — please describe', exact=True).check()
            page.get_by_role('button', name='Continue', exact=True).click()
            expect(page.locator('#other-Q01')).to_have_attribute('aria-invalid', 'true')
            expect(page.locator('#other-Q01')).to_be_focused()
            axe(page, 'other-validation')
            review(page)
            expect(page.locator('.assessment-results')).to_contain_text('required follow-up details missing')
            expect(page.locator('.assessment-results')).to_contain_text('Required detail missing:')
            page.get_by_role('button', name='Edit answer for Q01', exact=True).click()
            expect(page.locator('#heading-Q01')).to_be_focused()
            page.locator('#other-Q01').fill('STALE OTHER METHOD')
            page.locator('#notes-Q01').fill('STALE YES EXPLANATION')
            answer(page, 'Q01', 'no')
            page.locator('#context-Q01').fill('Current partial implementation barrier')
            review(page)
            text = page.locator('.assessment-results').inner_text()
            assert 'STALE OTHER METHOD' not in text and 'STALE YES EXPLANATION' not in text
            assert questions[0]['options'][0]['label'] not in text
            assert 'Current partial implementation barrier' in text
            assert 'required follow-up details missing' not in text
            expect(page.locator('#results-no + article')).to_have_count(1)
            axe(page, 'partial-results')

        run('conditional-validation-active-only', branching)

        def applicability(ctx, page):
            go(page)
            assert len([q for q in questions if q['allowNA']]) == 4
            for entry in sections:
                section(page, entry['id'])
                for q in [item for item in questions if item['sectionId'] == entry['id']]:
                    expect(question(page, q['id']).get_by_role('radio', name='Not applicable', exact=True)).to_have_count(1 if q['allowNA'] else 0)
            q = next(q for q in questions if q['allowNA'])
            section(page, q['sectionId'])
            answer(page, q['id'], 'na')
            page.get_by_role('button', name='Continue', exact=True).click()
            reason = page.locator('#reason-' + q['id'])
            expect(reason).to_have_attribute('aria-invalid', 'true')
            expect(reason).to_be_focused()
            reason.fill('No such media exists within the assessed course.')
            review(page)
            expect(page.locator('.assessment-results')).to_contain_text('No such media exists within the assessed course.')
            section(page, 'E')
            for qid in ['Q21', 'Q22']:
                answer(page, qid, 'yes')
                expect(question(page, qid).get_by_role('checkbox')).to_have_count(0)
                expect(question(page, qid).get_by_role('textbox')).to_have_count(1)
                page.locator('#notes-' + qid).fill(qid + ' anonymised participation and follow-up example')
            review(page)
            for qid in ['Q21', 'Q22']:
                expect(page.locator('.assessment-results')).to_contain_text(qid + ' anonymised participation and follow-up example')

        run('applicability-and-open-ended', applicability)

        def persistence_clear(ctx, page):
            go(page)
            page.get_by_label('Project or product name').fill('Résumé course — QA')
            page.get_by_label('What are you assessing?').fill('Enrolment through lesson completion')
            section(page, 'A')
            answer(page, 'Q01', 'no')
            page.locator('#context-Q01').fill('Retained barrier context')
            raw = page.evaluate('(key)=>localStorage.getItem(key)', key)
            assert json.loads(raw)['project'] == 'Résumé course — QA'
            page.reload()
            expect(page.get_by_role('button', name='Resume assessment', exact=True)).to_be_visible()
            expect(page.get_by_label('Project or product name')).to_have_value('Résumé course — QA')
            page.get_by_role('button', name='Resume assessment', exact=True).click()
            expect(question(page, 'Q01').get_by_role('radio', name='No / Not yet fully', exact=True)).to_be_checked()
            expect(page.locator('#context-Q01')).to_have_value('Retained barrier context')
            review(page)
            expect(page.locator('.assessment-results')).to_contain_text('Résumé course — QA')
            expect(page.locator('.assessment-results')).to_contain_text('Enrolment through lesson completion')
            page.get_by_role('button', name='Clear assessment', exact=True).click()
            expect(page.get_by_role('button', name='Cancel', exact=True)).to_be_focused()
            page.get_by_role('button', name='Cancel', exact=True).click()
            expect(page.get_by_role('button', name='Clear assessment', exact=True)).to_be_focused()
            assert page.evaluate('(key)=>localStorage.getItem(key)', key) == raw
            page.get_by_role('button', name='Clear assessment', exact=True).click()
            page.get_by_role('button', name='Yes, clear all answers', exact=True).click()
            expect(page.locator('.assessment-content > h2')).to_be_focused()
            assert page.evaluate('(key)=>localStorage.getItem(key)', key) is None
            go(page, 'about')
            go(page)
            page.reload()
            expect(page.get_by_label('Project or product name')).to_have_value('')
            expect(page.locator('progress')).to_have_attribute('value', '0')
            page.get_by_role('button', name='Start assessment', exact=True).click()
            expect(page.locator('input[type=radio]:checked')).to_have_count(0)

        run('persistence-and-confirmed-clear', persistence_clear)

        invalid = copy.deepcopy(template)
        invalid['responses']['Q01']['options'] = ['unknown-option']
        future_schema = {**template, 'schemaVersion': 999}
        future_questions = {**template, 'questionVersion': 'future-999'}
        for label, raw in [('corrupt', '{invalid-json'), ('invalid', json.dumps(invalid)), ('schema', json.dumps(future_schema)), ('question-version', json.dumps(future_questions))]:
            def blocked(ctx, page, raw=raw):
                seed(ctx, raw)
                go(page)
                expect(page.get_by_label('Project or product name')).to_be_disabled()
                expect(page.get_by_role('button', name='Start assessment', exact=True)).to_have_count(0)
                expect(page.get_by_role('navigation', name='Assessment sections').get_by_role('button', name='Review findings', exact=True)).to_be_disabled()
                assert page.evaluate('(key)=>localStorage.getItem(key)', key) == raw
                page.reload()
                assert page.evaluate('(key)=>localStorage.getItem(key)', key) == raw
                page.get_by_role('button', name='Clear assessment', exact=True).click()
                page.get_by_role('button', name='Cancel', exact=True).click()
                assert page.evaluate('(key)=>localStorage.getItem(key)', key) == raw
                page.get_by_role('button', name='Clear assessment', exact=True).click()
                page.get_by_role('button', name='Yes, clear all answers', exact=True).click()
                expect(page.get_by_label('Project or product name')).to_be_enabled()
                assert page.evaluate('(key)=>localStorage.getItem(key)', key) is None
            run('blocked-draft-' + label, blocked)

        def denied(ctx, page):
            ctx.add_init_script("Object.defineProperty(window,'localStorage',{get(){throw new Error('Storage denied by QA')}})")
            go(page)
            expect(page.locator('.assessment-sidebar')).to_contain_text('storage is unavailable')
            page.get_by_label('Project or product name').fill('Session-only project')
            section(page, 'A')
            answer(page, 'Q01', 'no')
            page.locator('#context-Q01').fill('Exact session-only barrier context')
            expect(page.locator('.assessment-sidebar')).to_contain_text('session only')
            question(page, 'Q01').get_by_role('link').click()
            expect(page.locator('main h1')).not_to_contain_text('self-assessment')
            page.wait_for_load_state('networkidle')
            assert '#/digital-learning' in page.url
            page.go_back()
            expect(page.get_by_label('Project or product name')).to_have_value('Session-only project')
            expect(page.locator('.assessment-sidebar')).to_contain_text('Session-only draft restored')
            page.get_by_role('button', name='Resume assessment', exact=True).click()
            expect(question(page, 'Q01').get_by_role('radio', name='No / Not yet fully', exact=True)).to_be_checked()
            expect(page.locator('#context-Q01')).to_have_value('Exact session-only barrier context')
            review(page)
            expect(page.locator('.assessment-results')).to_contain_text('Session-only project')
            expect(page.locator('.assessment-results')).to_contain_text(questions[0]['guidance'])
            page.get_by_role('button', name='Clear assessment', exact=True).click()
            page.get_by_role('button', name='Yes, clear all answers', exact=True).click()
            expect(page.locator('progress')).to_have_attribute('value', '0')
            expect(page.locator('.assessment-sidebar')).to_contain_text('storage could not be cleared')
            # Navigate using a real SPA source link: a full page.goto would erase
            # module memory and could conceal a resurrected session-only draft.
            review(page)
            page.locator('.assessment-finding').first.get_by_role('link').click()
            expect(page.locator('main h1')).not_to_contain_text('self-assessment')
            page.wait_for_load_state('networkidle')
            page.go_back()
            expect(page.get_by_label('Project or product name')).to_have_value('')
            expect(page.locator('progress')).to_have_attribute('value', '0')
            page.get_by_role('button', name='Start assessment', exact=True).click()
            expect(page.locator('input[type=radio]:checked')).to_have_count(0)
            answer(page, 'Q01', 'no')
            expect(page.locator('#context-Q01')).to_have_value('')
            # Memory fallback deliberately cannot survive a document reload.
            page.reload()
            expect(page.locator('progress')).to_have_attribute('value', '0')
            expect(page.get_by_label('Project or product name')).to_have_value('')

        run('denied-storage-session-fallback', denied)

        def model_edges(ctx, page):
            go(page)
            checks = page.evaluate("""async () => {
              const m=await import('/assessment/model.ts'); const {questions:q}=await import('/assessment/questions.ts');
              const check=(value,message)=>{if(!value)throw Error(message)};
              const d=m.emptyDraft(), before=JSON.stringify(d), empty=m.buildReport(d);
              check(empty.answered===0 && empty.pending===0 && !empty.complete && empty.counts.unanswered===22,'empty report counts');
              check(JSON.stringify(d)===before,'report mutated input');
              let n=0;
              for(const question of q){
                const r={...m.emptyResponse(),answer:'yes',options:question.openPrompt?[]:['other'],other:'',notes:'old yes detail',naReason:'old exclusion'};
                check(m.responseErrors(question,r).length===(question.openPrompt?0:1),'other required only on active yes');
                for(const answer of ['no','unsure',undefined]){
                  r.answer=answer; check(m.responseErrors(question,r).length===0,'inactive errors leaked');
                  d.responses[question.id]=r; const item=m.buildReport(d).items.find(i=>i.id===question.id);
                  check(!item.details.join(' ').includes('old yes detail')&&!item.details.join(' ').includes('old exclusion'),'inactive evidence leaked');
                  n++;
                }
                if(!question.allowNA)check(m.responseErrors(question,{...m.emptyResponse(),answer:'na',naReason:'absent'}).length>0,'illegal NA accepted');
                d.responses[question.id]={...m.emptyResponse(),answer:'yes'};
              }
              check(m.buildReport(d).complete,'optional yes details prevent completion');
              const original=localStorage.getItem(m.STORAGE_KEY);
              const bad=[null,[],{}, {...d,project:'x'.repeat(161)}, {...d,scope:'x'.repeat(1001)}, {...d,updatedAt:'bad'},
                {...d,responses:{Q99:m.emptyResponse()}}, {...d,responses:{Q01:{...m.emptyResponse(),answer:'bogus'}}},
                {...d,responses:{Q01:{...m.emptyResponse(),options:['other','other']}}},
                {...d,responses:{Q01:{...m.emptyResponse(),notes:'x'.repeat(4001)}}},
                {...d,responses:{Q21:{...m.emptyResponse(),options:['other']}}}];
              try { for(const fixture of bad){const raw=JSON.stringify(fixture);localStorage.setItem(m.STORAGE_KEY,raw);check(m.readDraft().status==='invalid','malformed persisted value accepted');check(localStorage.getItem(m.STORAGE_KEY)===raw,'read overwrote invalid value');n++;} }
              finally {if(original===null)localStorage.removeItem(m.STORAGE_KEY);else localStorage.setItem(m.STORAGE_KEY,original);}
              return n;
            }""")
            assert checks >= 70

        run('pure-model-edge-cases', model_edges)

        def source_links(ctx, page):
            draft = copy.deepcopy(template)
            for response in draft['responses'].values():
                response['answer'] = 'no'
            seed(ctx, json.dumps(draft))
            go(page)
            for q in questions:
                review(page)
                article = page.locator('.assessment-finding').filter(has=page.get_by_role('heading', name=re.compile('^' + q['id'] + ':')))
                link = article.get_by_role('link')
                expected = '#' + q['source']['path']
                assert link.get_attribute('href').startswith(expected)
                link.click()
                page.wait_for_load_state('networkidle')
                expect(page.locator('main h1')).to_have_count(1)
                assert expected in page.url
                if q['source'].get('sectionId'):
                    expect(page.locator('#' + q['source']['sectionId'])).to_be_visible()
                    if q['source']['sectionId'] == 'checklist':
                        toggle = page.get_by_role('button', name='Click here for the checklist')
                        expect(toggle).to_have_attribute('aria-expanded', 'true')
                        panel = page.locator('[id=' + json.dumps(toggle.get_attribute('aria-controls')) + ']')
                        expect(panel).to_be_visible()
                        expect(panel.get_by_role('checkbox').first).to_be_visible()
                go(page)

        run('all-toolkit-source-links', source_links)

        def pdf_download(page, filename):
            with page.expect_download(timeout=60000) as event:
                page.get_by_role('button', name='Download PDF report', exact=True).click()
            path = args.output / filename
            event.value.save_as(path)
            expect(page.get_by_role('button', name='Download PDF report', exact=True)).to_be_enabled()
            return path

        def inspect_pdf(path, complete):
            pdf = PdfReader(path)
            texts = [p.extract_text() or '' for p in pdf.pages]
            text = '\n'.join(texts)
            (path.with_suffix('.txt')).write_text(text)
            assert len(text) > 5000, 'Report must contain real selectable text'
            assert len(pdf.pages) > 1, 'Fixture should exercise pagination'
            assert ('Status: Complete self-assessment' if complete else 'Status: Partial assessment') in text
            assert 'not certification' in text and 'not a tagged accessible PDF' in text
            for q in questions:
                assert text.count(q['id'] + ' | Section:') == 1, q['id'] + ' missing/duplicated'
            urls = []
            for index, pdf_page in enumerate(pdf.pages):
                assert f'Page {index + 1} of {len(pdf.pages)}' in texts[index]
                assert 'iHUB | EDTECH INCLUSION TOOLKIT' in texts[index]
                assert float(pdf_page.mediabox.width) < float(pdf_page.mediabox.height)
                def visit(value, cm, tm, font, size):
                    if value.strip():
                        assert 15 <= float(tm[5]) <= float(pdf_page.mediabox.height) - 15, ('Text beyond page', value[:100], tm)
                pdf_page.extract_text(visitor_text=visit)
                for annotation in pdf_page.get('/Annots', []):
                    action = annotation.get_object().get('/A')
                    if action and action.get('/URI'):
                        urls.append(str(action['/URI']))
            assert len(urls) >= 22
            assert all('/#/' in url for url in urls), 'Broken HashRouter PDF links'
            return text, len(pdf.pages)

        def partial_pdf(ctx, page):
            draft = copy.deepcopy(template)
            draft['project'] = 'Café – Ελληνικά – Русский'
            draft['scope'] = 'Course scope: résumé, naïve, Łódź, accessibility & inclusion.'
            draft['responses']['Q01'].update(answer='no', notes='STALE-PDF-YES', other='STALE-PDF-OTHER', options=['other'], context='Current blocker only')
            draft['responses']['Q02'].update(answer='unsure')
            qna = next(q for q in questions if q['allowNA'])
            draft['responses'][qna['id']].update(answer='na', naReason='No matching content in course scope')
            draft['responses']['Q21'].update(answer='yes', notes='Learner participation example')
            draft['responses']['Q22'].update(answer='yes', options=[], notes='Improvement tracking example')
            # An unfinished Other response must be explicit in both representations.
            draft['responses']['Q03'].update(answer='yes', options=['other'])
            seed(ctx, json.dumps(draft))
            go(page)
            review(page)
            text, count = inspect_pdf(pdf_download(page, 'partial-unicode.pdf'), False)
            for expected in [draft['project'], 'résumé', 'naïve', 'Łódź', 'Current blocker only', 'How to verify:', 'No matching content in course scope', 'Needs completion:', 'Learner participation example']:
                assert expected in text, expected
            assert 'STALE-PDF-YES' not in text and 'STALE-PDF-OTHER' not in text
            print(f'  Partial Unicode PDF: {count} pages', flush=True)

        run('partial-pdf-unicode-and-pending', partial_pdf)

        def complete_pdf(ctx, page):
            draft = copy.deepcopy(template)
            draft['project'], draft['scope'] = 'Complete regression course', 'All twenty-two practices'
            long_notes = 'LONG-BEGIN ' + ' '.join(f'paragraph{i:03d} accessible learning' for i in range(100)) + ' LONG-END'
            assert len(long_notes) <= 4000
            for q in questions:
                response = draft['responses'][q['id']]
                response.update(answer='yes', notes=f"{q['id']} implementation example")
                if q['options']:
                    response['options'] = [q['options'][0]['id']]
            draft['responses']['Q21']['notes'] = long_notes
            seed(ctx, json.dumps(draft))
            go(page)
            review(page)
            expect(page.locator('.assessment-results')).to_contain_text('Complete self-assessment')
            expect(page.locator('progress')).to_have_attribute('value', '22')
            expect(page.locator('.assessment-finding')).to_have_count(22)
            axe(page, 'complete-results')
            text, count = inspect_pdf(pdf_download(page, 'complete-long.pdf'), True)
            assert 'LONG-BEGIN' in text and 'LONG-END' in text
            for index in range(100):
                assert text.count(f'paragraph{index:03d}') == 1, 'Long response dropped/duplicated'
            for q in questions:
                if q['options']:
                    assert q['options'][0]['label'] in text
            print(f'  Complete long response PDF: {count} pages', flush=True)

        run('complete-pdf-long-response-pagination', complete_pdf)

        def retry_pdf(ctx, page):
            go(page)
            section(page, 'A')
            answer(page, 'Q01', 'no')
            review(page)
            downloads = []
            page.on('download', lambda download: downloads.append(download.suggested_filename))
            page.route('**/fonts/DejaVuSans.ttf*', lambda route: route.abort('failed'))
            page.get_by_role('button', name='Download PDF report', exact=True).click()
            expect(page.get_by_role('alert')).to_contain_text('font could not be loaded')
            expect(page.get_by_role('button', name='Download PDF report', exact=True)).to_be_enabled()
            assert not downloads
            expect(page.locator('.assessment-results')).to_contain_text(questions[0]['guidance'])
            axe(page, 'export-failure')
            page.unroute('**/fonts/DejaVuSans.ttf*')
            inspect_pdf(pdf_download(page, 'retry-after-font-failure.pdf'), False)
            assert len(downloads) == 1

        run('pdf-font-failure-and-retry', retry_pdf)

        def clear_during_export(ctx, page):
            go(page)
            page.get_by_label('Project or product name').fill('Preclear export snapshot project')
            section(page, 'A')
            answer(page, 'Q01', 'no')
            page.locator('#context-Q01').fill('Preclear export snapshot context')
            review(page)
            page.get_by_role('button', name='Clear assessment', exact=True).click()
            clear = page.get_by_role('button', name='Yes, clear all answers', exact=True)
            cancel = page.get_by_role('button', name='Cancel', exact=True)
            trigger = page.get_by_role('button', name='Clear assessment', exact=True)
            expect(cancel).to_be_focused()
            held, downloads = [], []
            page.on('download', lambda download: downloads.append(download.suggested_filename))
            page.route('**/fonts/DejaVuSans.ttf*', lambda route: held.append(route))
            page.get_by_role('button', name='Download PDF report', exact=True).click()
            for _ in range(250):
                if held:
                    break
                page.wait_for_timeout(20)
            assert held, 'Export never requested its local font'
            try:
                expect(clear).to_be_disabled()
                expect(cancel).to_be_disabled()
                expect(trigger).to_be_disabled()
                expect(page.get_by_role('button', name='Preparing PDF…', exact=True)).to_be_disabled()
                expect(page.locator('.assessment-content')).to_have_attribute('aria-busy', 'true')
                assert not downloads, 'A report downloaded before the font response'
                # Native disabled buttons must not act even on scripted clicks.
                clear.evaluate('(button) => button.click()')
                cancel.evaluate('(button) => button.click()')
                expect(page.get_by_role('group', name='Confirm clearing assessment')).to_be_visible()
                expect(page.locator('progress')).to_have_attribute('value', '1')
                axe(page, 'clear-confirmation-during-export')
            finally:
                font = Path(__file__).resolve().parents[1] / 'public/fonts/DejaVuSans.ttf'
                with page.expect_download(timeout=60000) as event:
                    for route in held:
                        route.fulfill(status=200, content_type='font/ttf', body=font.read_bytes())
                path = args.output / 'preclear-export-snapshot.pdf'
                event.value.save_as(path)
                page.unroute('**/fonts/DejaVuSans.ttf*')
            text, _ = inspect_pdf(path, False)
            assert 'Preclear export snapshot project' in text
            assert 'Preclear export snapshot context' in text
            expect(clear).to_be_enabled()
            expect(cancel).to_be_enabled()
            expect(trigger).to_be_enabled()
            clear.click()
            expect(page.locator('progress')).to_have_attribute('value', '0')
            expect(page.get_by_label('Project or product name')).to_have_value('')
            assert page.evaluate('(key)=>localStorage.getItem(key)', key) is None
            assert len(downloads) == 1, 'Clearing must not initiate another download'
            page.reload()
            expect(page.locator('progress')).to_have_attribute('value', '0')
            review(page)
            expect(page.locator('.assessment-results')).not_to_contain_text('Preclear export snapshot')
            # Any subsequently requested report must use cleared data, not the
            # in-flight report captured before the confirmed clear.
            text, _ = inspect_pdf(pdf_download(page, 'after-confirmed-clear.pdf'), False)
            assert 'Preclear export snapshot' not in text
            assert '0 of 22 answered' in text
            assert len(downloads) == 2

        run('clear-confirmation-locked-during-export', clear_during_export)

        def unsupported_unicode(ctx, page):
            go(page)
            page.get_by_label('Project or product name').fill('Unsupported 😀 中文 العربية')
            review(page)
            downloads = []
            page.on('download', lambda download: downloads.append(download.suggested_filename))
            page.get_by_role('button', name='Download PDF report', exact=True).click()
            expect(page.get_by_role('alert')).to_contain_text('cannot safely render character')
            expect(page.get_by_role('alert')).to_contain_text('on-screen HTML report')
            assert not downloads
            expect(page.locator('.assessment-results')).to_contain_text('Unsupported 😀 中文 العربية')
            page.get_by_role('button', name='Edit project details', exact=True).click()
            page.get_by_label('Project or product name').fill('Corrected supported project')
            review(page)
            pdf_download(page, 'retry-after-unsupported-character.pdf')

        run('unsupported-unicode-explicit-fallback', unsupported_unicode)

        def mobile(ctx, page):
            page.set_viewport_size({'width': 320, 'height': 900})
            go(page, 'settings')
            page.get_by_role('button', name='Dark Mode', exact=True).click()
            page.get_by_role('button', name='Extra Large', exact=True).click()
            for name in ['Increased text spacing', 'Larger controls']:
                page.get_by_role('switch', name=name, exact=True).click()
            go(page)
            assert page.locator('html').get_attribute('data-font-size') == 'extra-large'
            assert 'dark' in page.locator('html').get_attribute('class')
            def reflow(state):
                assert not page.evaluate('document.documentElement.scrollWidth > innerWidth + 1'), 'Horizontal overflow: ' + state
                page.screenshot(path=str(args.output / ('mobile-' + state + '.png')), full_page=True)
                axe(page, 'mobile-dark-enlarged-' + state)
            reflow('intro')
            section(page, 'A')
            answer(page, 'Q01', 'yes')
            question(page, 'Q01').get_by_role('checkbox', name='Other — please describe', exact=True).check()
            page.locator('#other-Q01').fill('Long implementation description ' * 25)
            reflow('questions')
            review(page)
            reflow('results')
            page.get_by_role('button', name='Edit answer for Q01', exact=True).click()
            expect(page.locator('#heading-Q01')).to_be_focused()

        run('mobile-320-dark-enlarged-reflow', mobile)
        browser.close()

    failed = sum(not result['passed'] for result in results)
    violations = sum(len(audit['violations']) for audit in audits)
    print(f'{len(results) - failed}/{len(results)} scenarios passed; {violations} axe findings; {len(errors)} page errors. Artifacts: {args.output}', flush=True)
    if failed or violations or errors:
        raise SystemExit(1)


if __name__ == '__main__':
    main()