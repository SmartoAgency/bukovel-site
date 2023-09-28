import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, CustomEase);

export function chaletInvestBtnAnim() {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '.chalet',
        start: '10% center',
        end: '+=40%',
        scrub: 1,
      },
    })
    .to('.invest-link__text-wrap .logo-part__svg path', {
      fill: 'black',
      delay: 1,
      x: 20,
      duration: 1,
    });
}
