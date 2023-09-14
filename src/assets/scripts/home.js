import App from './bulge/App';
import './3DScroll/utils';
import './3DScroll/imagesloaded.pkgd.min';
import './3DScroll/index';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import { newsCardArray } from './modules/news/newsCard';

gsap.registerPlugin(ScrollTrigger, CustomEase);
new App();

var tl = gsap.timeline();

// document.querySelectorAll('.section').forEach(el => {
//   gsap
//     .timeline({
//       scrollTrigger: {
//         trigger: el,
//         start: 'center+=10% center',
//         end: '+=40%',

//         scrub: 1,
//       },
//     })
//     .to(el, { yPercent: -20, scale: 1.25 });
// });

tl.fromTo(
  '.spa',
  { yPercent: 100, opacity: 0.2 },
  {
    scrollTrigger: {
      trigger: '.spa-section',
      start: 'top center',
      end: '+=0%',
      markers: true,
      scrub: 2,
    },
    yPercent: 0,
    opacity: 1,
  },
);

gsap
  .timeline({
    scrollTrigger: {
      trigger: '.chalet',
      start: '10% center',
      end: '+=40%',

      scrub: 1,
    },
  })
  .to('.logo-part__svg path', { strokeDashoffset: 0, strokeWidth: 2, duration: 3 })
  .to('.logo-part__svg path', {
    fill: 'black',
    delay: 1,
    x: 20,
    duration: 3,
  });

document.querySelectorAll('.card--without-bulge').forEach(el => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        end: '0',
        markers: true,
        scrub: 1,
      },
    })
    .fromTo(
      el,
      {
        autoAlpha: 0,
        scale: 0.3,
      },
      {
        autoAlpha: 1,
        scale: 1,

        ease: CustomEase.create(
          'custom',
          'M0,0 C0,0 0.06,0.126 0.102,0.22 0.156,0.318 0.175,0.376 0.22,0.456 0.264,0.534 0.282,0.564 0.322,0.634 0.356,0.694 0.425,0.797 0.474,0.86 0.508,0.904 0.617,1.034 0.664,1.078 0.704,1.116 0.746,1.134 0.798,1.148 0.844,1.16 0.892,1.14 0.928,1.108 0.954,1.084 1,1 1,1 ',
        ),
        duration: 3,
      },
    )
    .fromTo(
      el.querySelector('.text'),
      {
        yPercent: 100,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        ease: CustomEase.create(
          'custom',
          'M0,0 C0,0 0.06,0.126 0.102,0.22 0.156,0.318 0.175,0.376 0.22,0.456 0.264,0.534 0.282,0.564 0.322,0.634 0.356,0.694 0.425,0.797 0.474,0.86 0.508,0.904 0.617,1.034 0.664,1.078 0.704,1.116 0.746,1.134 0.798,1.148 0.844,1.16 0.892,1.14 0.928,1.108 0.954,1.084 1,1 1,1 ',
        ),
      },
      '<-0.2',
    )
    .fromTo(
      el.querySelector('.card__logo'),
      {
        autoAlpha: 0,
        scale: 0,
      },
      {
        autoAlpha: 1,
        scale: 1,

        ease: CustomEase.create(
          'custom',
          'M0,0 C0,0 0.06,0.126 0.102,0.22 0.156,0.318 0.175,0.376 0.22,0.456 0.264,0.534 0.282,0.564 0.322,0.634 0.356,0.694 0.425,0.797 0.474,0.86 0.508,0.904 0.617,1.034 0.664,1.078 0.704,1.116 0.746,1.134 0.798,1.148 0.844,1.16 0.892,1.14 0.928,1.108 0.954,1.084 1,1 1,1 ',
        ),
      },
    );
});

function hoverParalax(params = {}) {
  const { degree = 3, selector } = params;
  const img = typeof selector === 'string' ? document.querySelector(selector) : selector;
  const parent = img.parentElement;
  gsap.set(parent, { perspective: '500px' });
  gsap.set(img, {
    scale: 1.25,
  });
  img.addEventListener('mousemove', ({ clientX, clientY }) => {
    const { left, right, top, bottom } = img.getBoundingClientRect();
    var mapper = gsap.utils.mapRange(left, right, degree * -1, degree);
    var mapperH = gsap.utils.mapRange(top, bottom, degree, degree * -1);
    gsap.set(img, { rotateY: mapper(clientX), rotateX: mapperH(clientY) });
  });
  img.addEventListener('mouseleave', function(evt) {
    gsap.to(img, { rotateY: 0, rotateX: 0 });
  });
}

gsap.utils.toArray('.card--without-bulge img').forEach(el => {
  hoverParalax({
    degree: 15,
    selector: el,
  });
});

//animation to section building

gsap
  .timeline({
    scrollTrigger: {
      trigger: '.svg-title__wrap',
      start: 'top center',

      markers: true,
    },
  })
  .from('.svg-title__tree', { yPercent: 50, autoAlpha: 0, duration: 1.2 })
  .from('.svg-title__leave', { scale: 0, y: 40, x: 50, stagger: 0.3, delay: 0.2, duration: 1 });

const newsArray = [
  {
    newsType: 'Акція',
    title: 'Gро воаліи оваівоа воа ів валіво ваі ілвоар ',
    date: '12.10.20',
    href: 'asdas',
    image: 'https://tympanus.net/Development/Scroll3DGrid/img/40.jpg',
  },
  {
    newsType: 'Акція',
    title: 'Gро воаліи оваівоа воа ів валіво ваі ілвоар ',
    date: '12.10.20',
    href: 'asdas',
    image: 'https://tympanus.net/Development/Scroll3DGrid/img/40.jpg',
  },
  {
    newsType: 'Акція',
    title: 'Gро воаліи оваівоа воа ів валіво ваі ілвоар ',
    date: '12.10.20',
    href: 'asdas',
    image: 'https://tympanus.net/Development/Scroll3DGrid/img/40.jpg',
  },
];
newsCardArray(newsArray);
