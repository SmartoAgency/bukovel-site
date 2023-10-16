import App from '../bulge/App';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import '../modules/helpers/imgParallax';
import { chaletInvestBtnAnim } from '../modules/section-anim/chalet';

gsap.registerPlugin(ScrollTrigger, CustomEase);

new App();
chaletInvestBtnAnim();
