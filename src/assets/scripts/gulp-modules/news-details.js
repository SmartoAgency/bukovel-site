import App from '../bulge/App';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import '../loader';

gsap.registerPlugin(ScrollTrigger, CustomEase);

new App();
