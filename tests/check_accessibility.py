"""Browser regression checks. Requires Python Playwright and a running Vite server.

python3 tests/check_accessibility.py --url http://localhost:3000 --axe /tmp/ihub-axe.min.js
Uses an optional local axe-core script; never sends form data to an external service.
"""
import argparse
import json
import re
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

parser = argparse.ArgumentParser()
parser.add_argument('--url', default='http://localhost:3000')
parser.add_argument('--axe', type=Path)
parser.add_argument('--settings-only', action='store_true')
parser.add_argument('--browser', default='/opt/brave.com/brave/brave')
parser.add_argument('--output', type=Path, default=Path('/tmp/ihub-accessibility-qa'))
args = parser.parse_args()
args.output.mkdir(parents=True, exist_ok=True)
routes = ['', 'about', 'resources', 'references', 'management-systems', 'online-learning', 'digital-learning', 'tutoring', 'steam', 'workforce', 'lms', 'settings', 'feedback', 'feedback/thank-you', 'visual-impairment', 'intellectual-developmental-disabilities', 'hearing-impairment', 'dual-sensory-loss']
guide_routes = {'management-systems', 'online-learning', 'digital-learning', 'tutoring', 'steam', 'workforce', 'lms', 'visual-impairment', 'intellectual-developmental-disabilities', 'hearing-impairment', 'dual-sensory-loss'}
results = []
errors = []
speech_stub = """(() => {
  const synth = new EventTarget();
  window.speechCalls = []; window.cancelCalls = 0;
  synth.getVoices = () => [{name:'Test English',lang:'en',voiceURI:'test-en'}];
  synth.speak = u => { window.lastUtterance = u; window.speechCalls.push(u.text); u.onstart?.(); };
  synth.cancel = () => { window.cancelCalls++; };
  synth.pause = () => {}; synth.resume = () => {};
  Object.defineProperty(window, 'speechSynthesis', {value:synth, configurable:true});
  window.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
})();"""

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path=args.browser)
    context = browser.new_context(viewport={'width': 1440, 'height': 1000}, color_scheme='light')
    page = context.new_page()
    page.on('pageerror', lambda error: errors.append(str(error)))
    def go(route):
        page.goto(args.url + '/#/' + route)
        page.wait_for_load_state('networkidle')
        expect(page.locator('main h1')).to_have_count(1)
    if args.settings_only:
        go('online-learning')
        expect(page.get_by_role('region', name='Guide reading tools')).to_have_count(0)
        go('settings')
        read_aloud = page.get_by_role('switch', name='Read aloud', exact=True)
        expect(read_aloud).to_have_attribute('aria-checked', 'false')
        read_aloud.click()
        go('online-learning')
        expect(page.get_by_role('region', name='Guide reading tools')).to_be_visible()
        page.reload()
        expect(page.get_by_role('region', name='Guide reading tools')).to_be_visible()
        go('settings')
        read_aloud.click()
        go('online-learning')
        expect(page.get_by_role('region', name='Guide reading tools')).to_have_count(0)
        go('settings')
        screen_reader = page.get_by_role('switch', name='Screen reader support', exact=True)
        expect(screen_reader).to_have_attribute('aria-checked', 'false')
        assert not page.locator('main h1').evaluate('(el) => el === document.activeElement')
        screen_reader.click()
        expect(screen_reader).to_be_focused()
        go('resources')
        expect(page.locator('main h1')).to_be_focused()
        page.reload()
        expect(page.locator('main h1')).to_be_focused()
        go('settings')
        expect(screen_reader).to_have_attribute('aria-checked', 'true')
        screen_reader.click()
        go('about')
        expect(page).to_have_title(re.compile('Inclusion is a design decision'))
        assert not page.locator('main h1').evaluate('(el) => el === document.activeElement')
        for width in [1440, 390, 320]:
            page.set_viewport_size({'width': width, 'height': 1000})
            go('settings')
            page.get_by_role('button', name='Reset to defaults', exact=True).click()
            page.get_by_role('button', name='Light Mode', exact=True).click()
            for name in ['Small', 'Large', 'Extra Large', 'Medium']:
                button = page.get_by_role('button', name=name, exact=True)
                button.click()
                expect(button).to_have_attribute('aria-pressed', 'true')
            page.screenshot(path=str(args.output / f'settings-restored-{width}.png'), full_page=True)
            for switch in page.get_by_role('switch').all():
                switch.focus()
                page.keyboard.press('Space')
                expect(switch).to_have_attribute('aria-checked', 'true')
            page.get_by_role('button', name='Extra Large', exact=True).click()
            for theme in ['Dark Mode', 'Light Mode']:
                page.get_by_role('button', name=theme, exact=True).click()
                assert not page.evaluate('document.documentElement.scrollWidth > innerWidth + 1'), width
                if args.axe:
                    page.add_script_tag(path=str(args.axe))
                    audit = page.evaluate("async () => await axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}})")
                    results.append({'width': width, 'theme': theme, 'violations': [v['id'] for v in audit['violations']]})
            page.get_by_role('button', name='Reset to defaults', exact=True).click()
            expect(page.get_by_role('button', name='Medium', exact=True)).to_have_attribute('aria-pressed', 'true')
            expect(page.locator('.reading-ruler')).to_have_count(0)
            for switch in page.get_by_role('switch').all(): expect(switch).to_have_attribute('aria-checked', 'false')
        assert not errors, errors
        (args.output / 'settings-results.json').write_text(json.dumps(results, indent=2))
        assert not any(result['violations'] for result in results), results
        print('Settings buttons, switches, keyboard access, reset, reflow and axe checks passed.')
        browser.close()
        raise SystemExit(0)
    go('settings')
    page.get_by_role('switch', name='Screen reader support', exact=True).click()
    page.get_by_role('switch', name='Read aloud', exact=True).click()
    for route in routes:
        go(route)
        expect(page.locator('main h1')).to_be_focused()
        assert page.locator('main h1').inner_text().strip() in page.title(), route
        expect(page.get_by_role('region', name='Guide reading tools')).to_have_count(1 if route in guide_routes else 0)
        violations = []
        if args.axe:
            page.add_script_tag(path=str(args.axe))
            audit = page.evaluate("async () => await axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}})")
            violations = [{'id': v['id'], 'impact': v['impact'], 'nodes': [n['target'] for n in v['nodes']]} for v in audit['violations']]
        results.append({'route': route or '/', 'violations': violations})
    (args.output / 'results.json').write_text(json.dumps(results, indent=2))
    # SPA navigation must wait for the actual lazy page to commit.
    go('')
    page.route('**/pages/ResourcesPage.tsx*', lambda route: route.continue_())
    page.get_by_role('navigation', name='Main navigation', exact=True).get_by_role('link', name='Resources', exact=True).click()
    expect(page).to_have_title(re.compile('Keep building your understanding'))
    expect(page.locator('main h1')).to_be_focused()
    page.go_back()
    expect(page).to_have_title(re.compile('Better learning starts'))
    expect(page.locator('main h1')).to_be_focused()
    page.locator('.skip-link').focus()
    page.keyboard.press('Enter')
    expect(page.locator('#main-content')).to_be_focused()

    # Settings, ruler input paths, persistence and reset.
    go('settings')
    page.get_by_role('button', name='Dark Mode', exact=True).click()
    page.get_by_role('button', name='Extra Large', exact=True).click()
    for label in ['High contrast', 'Increased text spacing', 'Larger controls', 'Reading ruler']:
        page.get_by_role('switch', name=label, exact=True).click()
    expect(page.locator('.reading-ruler')).to_have_count(1)
    page.mouse.move(100, 200)
    page.wait_for_timeout(50)
    assert abs(page.locator('.reading-ruler').bounding_box()['y'] - 180) < 2
    go('online-learning')
    assert page.locator('html').get_attribute('data-font-size') == 'extra-large'
    page.get_by_role('button', name='Read guide', exact=True).focus()
    page.wait_for_timeout(50)
    initial = page.locator('.reading-ruler').bounding_box()['y']
    page.keyboard.press('ArrowDown')
    page.wait_for_timeout(50)
    assert page.locator('.reading-ruler').bounding_box()['y'] != initial
    page.dispatch_event('main', 'pointerdown', {'clientY': 300, 'pointerType': 'touch'})
    page.wait_for_timeout(50)
    assert abs(page.locator('.reading-ruler').bounding_box()['y'] - 280) < 2
    page.locator('.skip-link').focus()
    page.keyboard.press('Enter')
    go('settings')
    page.get_by_role('button', name='Reset to defaults').click()
    expect(page.locator('.reading-ruler')).to_have_count(0)
    assert page.locator('html').get_attribute('data-font-size') == 'medium'
    assert not page.evaluate("document.documentElement.classList.contains('dark')")

    # Menus and section focus at mobile widths.
    page.set_viewport_size({'width': 390, 'height': 844})
    go('online-learning')
    menu = page.get_by_role('button', name='Open navigation', exact=True)
    menu.click()
    page.keyboard.press('Tab')
    page.keyboard.press('Escape')
    expect(menu).to_be_focused()
    contents = page.get_by_role('button', name='Toggle page contents', exact=True)
    contents.click()
    panel_id = contents.get_attribute('aria-controls')
    panel = page.locator('[id="' + panel_id + '"]')
    panel.get_by_role('button').first.click()
    assert page.evaluate("/^H[1-6]$/.test(document.activeElement.tagName)")
    assert contents.get_attribute('aria-expanded') == 'false'
    page.get_by_role('button', name='Click here for the checklist').click()
    checkbox = page.locator('main input[type=checkbox]').first
    checkbox.check()
    expect(checkbox).to_be_checked()

    # Form labels, invalid fields and error focus; no network submission.
    go('feedback')
    page.get_by_role('button', name='Submit feedback').click()
    expect(page.locator('#feedback-error')).to_be_focused()
    expect(page.get_by_label('What is your primary role?')).to_have_attribute('aria-invalid', 'true')
    for select in page.locator('main select').all(): select.select_option(index=1)
    page.get_by_role('button', name='Submit feedback').click()
    expect(page.locator('#feedback-error')).to_contain_text('at least one category')
    for control in page.locator('main select, main textarea').all():
        assert control.evaluate('(el) => el.labels.length > 0')

    # Reflow and combined preferences across every route.
    for enhanced in [False, True]:
        go('settings')
        page.get_by_role('button', name='Extra Large' if enhanced else 'Medium', exact=True).click()
        for label in ['High contrast', 'Increased text spacing', 'Larger controls']:
            switch = page.get_by_role('switch', name=label, exact=True)
            if (switch.get_attribute('aria-checked') == 'true') != enhanced: switch.click()
        for width in [320, 720]:  # 720 CSS px approximates 200% zoom at 1440 px.
            page.set_viewport_size({'width': width, 'height': 900})
            for route in routes:
                go(route)
                overflow = page.evaluate('document.documentElement.scrollWidth > innerWidth + 1')
                if overflow:
                    page.screenshot(path=str(args.output / 'overflow.png'), full_page=True)
                    offenders = page.evaluate("[...document.querySelectorAll('main *')].filter(el=>el.getBoundingClientRect().right>innerWidth+1).slice(0,8).map(el=>({tag:el.tagName,cls:el.className,text:el.innerText?.slice(0,80),right:el.getBoundingClientRect().right}))")
                    raise AssertionError(f'overflow: {route}, {width}, enhanced={enhanced}: {offenders}')
                if enhanced and width == 320 and args.axe and route in ['online-learning', 'settings', 'feedback']:
                    page.add_script_tag(path=str(args.axe))
                    audit = page.evaluate("async () => await axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}})")
                    results.append({'route': route + ' (large text, spacing, high contrast, large controls)', 'violations': [{'id': v['id'], 'nodes': [n['target'] for n in v['nodes']]} for v in audit['violations']]})
        page.screenshot(path=str(args.output / f'guide-enhanced-{enhanced}.png'), full_page=True)

    go('settings')
    page.get_by_role('button', name='Dark Mode', exact=True).click()
    for route in ['online-learning', 'settings', 'feedback']:
        go(route)
        if args.axe:
            page.add_script_tag(path=str(args.axe))
            audit = page.evaluate("async () => await axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}})")
            results.append({'route': route + ' (dark, high contrast, large text and controls)', 'violations': [{'id': v['id'], 'nodes': [n['target'] for n in v['nodes']]} for v in audit['violations']]})
        page.screenshot(path=str(args.output / f'{route}-dark.png'), full_page=True)

    # Deterministic speech lifecycle (real audio needs manual listening).
    speech_context = browser.new_context()
    speech_context.add_init_script(speech_stub)
    speech_context.add_init_script("localStorage.setItem('ihub-accessibility-v1', JSON.stringify({readAloudControls:true}))")
    speech = speech_context.new_page()
    speech.goto(args.url + '/#/online-learning')
    speech.wait_for_load_state('networkidle')
    assert speech.evaluate('speechCalls.length') == 0
    speech.get_by_label('Voice', exact=True).select_option('test-en')
    speech.evaluate("speechSynthesis.getVoices = () => []; speechSynthesis.dispatchEvent(new Event('voiceschanged'))")
    expect(speech.get_by_label('Voice', exact=True)).to_have_value('')
    speech.evaluate("speechSynthesis.getVoices = () => [{name:'Test English',lang:'en',voiceURI:'test-en'}]; speechSynthesis.dispatchEvent(new Event('voiceschanged'))")
    expect(speech.get_by_label('Voice', exact=True)).to_have_value('test-en')
    speech.get_by_role('button', name='Read guide', exact=True).click()
    expect(speech.get_by_role('button', name='Pause', exact=True)).to_be_enabled()
    text = speech.evaluate('speechCalls.join(" ")')
    assert text and 'Reading preferences' not in text and 'check_circle' not in text
    speech.get_by_role('button', name='Pause', exact=True).click()
    speech.get_by_role('button', name='Resume', exact=True).click()
    speech.get_by_role('button', name='Stop', exact=True).click()
    expect(speech.get_by_role('button', name='Read guide', exact=True)).to_be_enabled()
    speech.get_by_role('button', name='Read guide', exact=True).click()
    # Finish one chunk; the adapter should enqueue the next one.
    before = speech.evaluate('speechCalls.length')
    speech.evaluate('lastUtterance.onend()')
    assert speech.evaluate('speechCalls.length') == before + 1
    speech.get_by_role('link', name='Reading preferences', exact=True).click()
    cancelled = speech.evaluate('cancelCalls')
    speech.evaluate('lastUtterance.onend()')
    assert speech.evaluate('cancelCalls') == cancelled
    # Extraction must omit page furniture and fields, and preserve sentence order.
    extracted = speech.evaluate("""async () => {
      const {extractReadableText, chunkText} = await import('/accessibility/readAloud.ts');
      const fixture = document.createElement('section');
      fixture.innerHTML = '<h2>Alpha</h2><nav>Ignore navigation</nav><p>Beta.</p><p hidden>Ignore hidden</p><button>Ignore control</button><select><option>Ignore option</option></select><span class="material-icons">ignore_icon</span><p role="status">Ignore status</p>';
      document.body.append(fixture);
      const text = extractReadableText(fixture); fixture.remove();
      const long = 'word '.repeat(100) + '.';
      const chunks = chunkText(long);
      return {text, chunks, rebuilt:chunks.join(' ').replace(/\\s+/g,' ').trim(), original:long.replace(/\\s+/g,' ').trim()};
    }""")
    assert extracted['text'] == 'Alpha. Beta.'
    assert extracted['rebuilt'] == extracted['original']
    assert all(len(chunk) <= 220 for chunk in extracted['chunks'])
    speech.goto(args.url + '/#/online-learning')
    speech.wait_for_load_state('networkidle')
    speech.clock.install()
    speech.evaluate('speechSynthesis.speak = () => {}')
    speech.get_by_role('button', name='Read guide', exact=True).click()
    speech.clock.fast_forward(8001)
    expect(speech.get_by_role('status')).to_contain_text('Speech did not start')
    expect(speech.get_by_role('button', name='Read guide', exact=True)).to_be_enabled()
    speech_context.close()

    migration_context = browser.new_context(color_scheme='light')
    migration_context.add_init_script("localStorage.setItem('theme','dark'); localStorage.setItem('fontSize','large'); localStorage.setItem('highContrast','true'); localStorage.setItem('screenReader','true');")
    migration = migration_context.new_page()
    migration.goto(args.url + '/#/settings')
    migration.wait_for_load_state('networkidle')
    expect(migration.get_by_role('button', name='Dark Mode', exact=True)).to_have_attribute('aria-pressed', 'true')
    expect(migration.get_by_role('button', name='Large', exact=True)).to_have_attribute('aria-pressed', 'true')
    expect(migration.get_by_role('switch', name='High contrast', exact=True)).to_have_attribute('aria-checked', 'true')
    assert migration.evaluate("localStorage.getItem('screenReader') === null")
    migration_context.close()

    corrupt_context = browser.new_context()
    corrupt_context.add_init_script("localStorage.setItem('ihub-accessibility-v1', '{invalid-json')")
    corrupt = corrupt_context.new_page()
    corrupt.goto(args.url + '/#/settings')
    expect(corrupt.get_by_role('button', name='Medium', exact=True)).to_have_attribute('aria-pressed', 'true')
    corrupt_context.close()

    # Storage denied and speech unavailable must leave all content usable.
    fallback_context = browser.new_context(reduced_motion='reduce', color_scheme='dark')
    fallback_context.add_init_script("Object.defineProperty(window, 'localStorage', {get(){throw new Error('Storage blocked')}}); Object.defineProperty(window, 'speechSynthesis', {value:undefined, configurable:true}); delete window.speechSynthesis;")
    fallback = fallback_context.new_page()
    fallback_errors = []
    fallback.on('pageerror', lambda error: fallback_errors.append(str(error)))
    fallback.goto(args.url + '/#/settings')
    fallback.wait_for_load_state('networkidle')
    fallback.get_by_role('switch', name='Reading ruler', exact=True).click()
    fallback.get_by_role('button', name='Reset to defaults').click()
    assert fallback.evaluate("document.documentElement.classList.contains('reduced-motion') && document.documentElement.classList.contains('dark')")
    fallback.goto(args.url + '/#/feedback')
    fallback.get_by_role('button', name='Submit feedback').click()
    expect(fallback.locator('#feedback-error')).to_be_focused()
    fallback.goto(args.url + '/#/settings')
    fallback.get_by_role('switch', name='Read aloud', exact=True).click()
    fallback.goto(args.url + '/#/online-learning')
    expect(fallback.get_by_role('button', name='Read guide', exact=True)).to_be_disabled()
    assert not fallback_errors, fallback_errors
    fallback_context.close()
    assert not errors, errors
    browser.close()

(args.output / 'results.json').write_text(json.dumps(results, indent=2))
violations = sum(len(result['violations']) for result in results)
print(f'Browser behavior checks passed. Axe: {violations} route/rule findings; report: {args.output}/results.json')
if violations: raise SystemExit(1)
