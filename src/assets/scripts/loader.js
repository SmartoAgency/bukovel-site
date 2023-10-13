import { gsap } from 'gsap/all';

const preloaderRef = document.querySelector('.loader-wrap');
export const preloader = {
  el: preloaderRef,
  subscribers: [],
  animate() {
    gsap
      .timeline()
      .to('.loader__gradient', { yPercent: -100, duration: 1.5, ease: 'power4.out' })
      .to('.loader__logo-container', { opacity: 0, duration: 0.7, ease: 'power4.out' })
      .to('.loader__bg', { backgroundColor: 'transparent', duration: 1, ease: 'power4.in' }, '<')
      .to('.loader__bg-svg', { translateZ: 1000, duration: 0.5, ease: 'sine.out' });
  },
  remove() {
    if (preloaderRef) {
      setTimeout(() => {
        this.el.remove();
      }, 3000);
      gsap.to(preloaderRef, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          this.subscribers.forEach(fn => fn());
          this.el.remove();
        },
      });
    }
  },
  onRemove(fn) {
    this.subscribers.push(fn);
  },
};

window.addEventListener('load', () => {
  preloader.animate();
  setTimeout(() => {
    // preloader.remove();
  }, 2000);
});
