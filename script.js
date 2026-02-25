const revealItems = document.querySelectorAll('.reveal');
const pageLoader = document.getElementById('pageLoader');
const catWalker = document.getElementById('catWalker');

const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const LOADER_DURATION_MS = 800;
let loaderTimeoutId;

if (pageLoader) {
  const showLoaderForDuration = (durationMs = LOADER_DURATION_MS) => {
    pageLoader.classList.remove('is-hidden');
    document.body.classList.add('loading');

    window.clearTimeout(loaderTimeoutId);
    loaderTimeoutId = window.setTimeout(() => {
      pageLoader.classList.add('is-hidden');
      document.body.classList.remove('loading');
    }, durationMs);
  };

  showLoaderForDuration();

  if (catWalker) {
    catWalker.addEventListener('click', () => showLoaderForDuration());
  }
}

if (shouldReduceMotion) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -6% 0px'
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}
