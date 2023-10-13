import App from '../bulge/App';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import '../loader';
// import '../modules/helpers/imgParallax';
gsap.registerPlugin(ScrollTrigger, CustomEase);

new App();
