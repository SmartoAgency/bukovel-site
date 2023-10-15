import { gsap } from 'gsap/all';
import { EasePack } from 'gsap/EasePack';
import '../footer/footer';

gsap.registerPlugin(EasePack);

const header = document.querySelector('.header-bg');

window.addEventListener('scroll', function headerSquosh() {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 20) {
    header.classList.add('scroll-down');
  } else {
    header.classList.remove('scroll-down');
  }
});
//pop up call us
document.body.addEventListener('click', function(evt) {
  const target = evt.target.closest('[data-call-us-modal-close]');
  const form = evt.target.closest('[data-call-us-modal]');
  const btn = evt.target.closest('[data-call-us-btn]');

  if (btn) {
    if (document.querySelector('[data-call-us-modal]').classList.contains('hidden')) {
      gsap.from('.call-us__item', { scale: 0, y: 200, stagger: 0.1, duration: 0.5, autoAlpha: 0 });
      gsap.to('.arrow-rotate', { rotateZ: 90 });
      return document.querySelector('[data-call-us-modal]').classList.remove('hidden');
    }
    return;
  }
  if (target) {
    gsap.to('.arrow-rotate', { rotateZ: 0 });
    return document.querySelector('[data-call-us-modal]').classList.add('hidden');
  }
  if (!form && !target && !btn) {
    gsap.to('.arrow-rotate', { rotateZ: 0 });
    return document.querySelector('[data-call-us-modal]').classList.add('hidden');
  }
});

//menu
const openMenuBtn = document.querySelector('.menu-btn');
const menuRef = document.querySelector('.menu__container');
const headerBg = document.querySelector('.header-bg');
const tl = gsap.timeline({ paused: true });
tl.add(() => {
  window.dispatchEvent(new Event('start-scroll'));
});
tl.add(() => {
  window.dispatchEvent(new Event('stop-scroll'));
});
tl.add(() => {
  headerBg.classList.add('scroll-down');
});
tl.add(() => {
  headerBg.classList.remove('scroll-down');
});

tl.to('.language__item', { color: 'rgba(17, 17, 17, 1)' }, '<');
tl.to('.header__logo-name', { color: 'rgba(17, 17, 17, 1)' }, '<');
tl.to('.header__logo-name--mobile', { color: 'rgba(17, 17, 17, 1)' }, '<');
tl.to('.menu-btn p', { color: 'rgba(17, 17, 17, 1)' }, '<');
tl.to('.menu-btn__burger', { backgroundColor: 'rgba(17, 17, 17, 1)' }, '<');
tl.to('.menu-btn__burger', { rotate: 45, duration: 0.5 }, '<');
tl.to('.menu-btn__burger .line-under', { rotate: -90, y: -6, duration: 0.5 }, '<');
tl.to('.menu-btn__burger .line-over', { y: 20, x: 20, rotate: -45, duration: 0.5 }, '<');

tl.to(
  menuRef,
  {
    duration: 0.1,
    opacity: 1,
    ease: 'expo.inOut',
    pointerEvents: 'all',
  },
  '<',
);
tl.to('.menu__bg-svg', { opacity: 1, scale: 1, duration: 0.5 }, '<');
tl.to('.menu__bg', { backgroundColor: '#F8F8F8', duration: 0.4 }, '<+=0.1');
tl.to('.header__nav-container', { opacity: 1, duration: 0.5 }, '<+=0.3');

tl.reverse();

openMenuBtn.addEventListener('click', () => {
  tl.reversed(!tl.reversed());
});

//Footer

const titleWrapSubNav = document.querySelectorAll('.sub-nav__title-wrap');
const subNavList = document.querySelector('.sub-nav__list');

titleWrapSubNav.forEach(el =>
  el.addEventListener('click', () => {
    console.log('click');
    el.closest('.sub-nav').classList.toggle('is-visible');
  }),
);

const preloaderRef = document.querySelector('.loader-wrap');
export const preloader = {
  el: preloaderRef,
  subscribers: [],
  animate() {
    gsap
      .timeline()
      .to('.loader__gradient', {
        yPercent: -100,
        duration: 1.5,
        ease: 'power4.out',
      })
      .to('.loader__logo-container', {
        opacity: 0,
        duration: 0.7,
        ease: 'power4.out',
      })
      .to('.loader__bg', { backgroundColor: 'transparent', duration: 1, ease: 'power4.in' }, '<')
      .to('.loader__bg-svg', {
        translateZ: 1000,
        duration: 0.5,
        ease: 'sine.out',
      });
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
    preloader.remove();
  }, 2000);
});
