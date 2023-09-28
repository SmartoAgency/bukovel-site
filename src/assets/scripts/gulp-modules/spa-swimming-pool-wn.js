import Swiper from 'swiper';
import 'swiper/css';

const swiper = new Swiper('.swiper', {
  speed: 1000,
  spaceBetween: 0,
  // Navigation arrows
  slidesPerView: 1,
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
});
