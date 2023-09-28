import gsap from 'gsap/all';
import Swiper from 'swiper';
import { Navigation } from 'swiper';
import 'swiper/css';

const swiper = new Swiper('.swiper', {
  modules: [Navigation],
  speed: 1000,
  spaceBetween: 0,
  // Navigation arrows
  slidesPerView: 1,
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
});

const currentSlideShow = [document.querySelector('[data-first-digit]')];

currentSlideShow[0].textContent = swiper.realIndex + 1;
document.querySelector('[data-total]').textContent = document.querySelectorAll(
  '.swiper .swiper-slide:not(.swiper-slide-duplicate)',
).length;
swiper.on('activeIndexChange', self => {
  const splitedIndex = self.realIndex + 1;
  const firstDigit = splitedIndex;
  gsap
    .timeline()
    .fromTo(currentSlideShow[0], { yPercent: 0 }, { yPercent: 100 })
    .add(() => {
      currentSlideShow[0].textContent = firstDigit;
    })
    .fromTo(currentSlideShow[0], { yPercent: -100 }, { yPercent: 0 });
});
