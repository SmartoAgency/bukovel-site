import Swiper from 'swiper';
import { Navigation } from 'swiper';
import 'swiper/css';
import App from '../bulge/App';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import { getProgressList } from '../modules/progress/getProgress';
import { progressCard } from '../modules/progress/progressCard';

// import '../modules/helpers/imgParallax';

gsap.registerPlugin(ScrollTrigger, CustomEase);

new App();

const swiper = new Swiper('.progress-details__swiper', {
  autoHeight: true,
  modules: [Navigation],
  speed: 1000,
  spaceBetween: 20,
  // Navigation arrows
  slidesPerView: 1,
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
});
async function getLastProgress() {
  const progressContainerLast = document.querySelector('.progress__container--last');
  progressContainerLast.innerHTML = await getProgressList('last').then(res =>
    res.data.map(el => progressCard(el)),
  );
}
getLastProgress();
