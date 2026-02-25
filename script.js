const revealItems = document.querySelectorAll('.reveal');

const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
