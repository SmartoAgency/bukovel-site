import App from '../bulge/App';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import '../modules/helpers/imgParallax';

gsap.registerPlugin(ScrollTrigger, CustomEase);

new App();

gsap
  .timeline({
    scrollTrigger: {
      trigger: '.projects',
      start: 'top center',
    },
  })
  .from('.projects__bottom-tree-wrap', { yPercent: -100, autoAlpha: 0, duration: 0.4 })
  .from('.svg-title__leave--project', {
    scale: 0,
    y: 40,
    x: 50,
    stagger: 0.1,
    delay: 0.2,
    duration: 0.4,
  });
