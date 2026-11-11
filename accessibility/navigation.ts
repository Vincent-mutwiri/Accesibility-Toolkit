export function focusSection(element: Element | null) {
  if (!element) return;
  const heading = element.matches('h1,h2,h3,h4,h5,h6') ? element : element.querySelector('h1,h2,h3,h4,h5,h6');
  const target = (heading || element) as HTMLElement;
  target.tabIndex = -1;
  target.focus({ preventScroll: true });
  element.scrollIntoView({ behavior: document.documentElement.classList.contains('reduced-motion') || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
}
