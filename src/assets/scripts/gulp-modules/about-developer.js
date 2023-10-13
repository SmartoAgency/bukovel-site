import App from '../bulge/App';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import '../modules/helpers/imgParallax';
import '../loader';
gsap.registerPlugin(ScrollTrigger, CustomEase);

new App();
