import { Renderer, Program, Color, Mesh, Triangle, Vec2 } from 'ogl';
import LoaderManager from '../managers/LoaderManager';
import { gsap } from 'gsap';
import { isTouch } from '../utils/isTouch';
import IntersectionObserver from '../managers/IntersectionObserver';

const vertex = `
attribute vec2 uv;
attribute vec2 position;

uniform vec2 uResolution;
uniform vec2 uTextureResolution;

varying vec2 vUv;

vec2 resizeUvCover(vec2 uv, vec2 size, vec2 resolution) {
    vec2 ratio = vec2(
        min((resolution.x / resolution.y) / (size.x / size.y), 1.0),
        min((resolution.y / resolution.x) / (size.y / size.x), 1.0)
    );

    return vec2(
        uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
}

void main() {
  vUv = resizeUvCover(uv, uTextureResolution, uResolution);

  gl_Position = vec4(position, 0, 1);
}
`;
const fragment = `precision highp float;

uniform float uTime;
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform vec2 uMouseIntro;

uniform float uIntro;
uniform float uRadius;
uniform float uStrength;
uniform float uBulge;


varying vec2 vUv;

vec2 bulge(vec2 uv, vec2 center) {

  uv -= center; // center to mouse

  float dist = length(uv) / uRadius; // amount of distortion based on mouse pos
  float distPow = pow(dist, 4.); // exponential as you ar far from the mouse
  float strengthAmount = uStrength / (1.0 + distPow); // strenght

  uv *= (1. - uBulge) + uBulge * strengthAmount; // use uBulge to smoothly reset/add effect

  uv += center; // reset pos

  return uv;
}

void main() {
  // Add bulge effect based on mouse
  vec2 mixMouse = mix(uMouseIntro, uMouse, uIntro);
  vec2 bulgeUV = bulge(vUv, mixMouse);

  vec4 tex = texture2D(uTexture, bulgeUV);

  gl_FragColor.rgb = tex.rgb;
  gl_FragColor.a = 1.0;
}`;

export default class Card {
  #el;
  #renderer;
  #mesh;
  #program;
  #mouse = new Vec2(0, 0);
  #mouseTarget = new Vec2(0, 0);
  #elRect;
  #canMove = true;
  #src;
  #index;
  #isTouch;
  #guiObj;
  #visible;
  constructor({ el, src, index, guiObj }) {
    this.#el = el;
    this.#src = src;
    this.#index = index;
    this.#guiObj = guiObj;
    this.setScene();
    this.#el.dataset.intersectId = index;

    this.#isTouch = isTouch();
  }

  get type() {
    return 'card';
  }

  get program() {
    return this.#program;
  }

  async setScene() {
    this.#renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      canvas: this.#el,
      width: this.#el.offsetWidth,
      height: this.#el.offsetHeight,
    });

    const { gl } = this.#renderer;

    // Preloading
    await LoaderManager.load(
      [
        {
          name: `${this.#index}`,
          texture: `./assets/images/scroll3Dimg/${this.#src}`,
        },
      ],
      gl,
    );

    gl.clearColor(1, 1, 1, 1);

    this.resize();

    // Rather than using a plane (two triangles) to cover the viewport here is a
    // triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
    // Excess will be out of the viewport.

    //         position                uv
    //      (-1, 3)                  (0, 2)
    //         |\                      |\
    //         |__\(1, 1)              |__\(1, 1)
    //         |__|_\                  |__|_\
    //   (-1, -1)   (3, -1)        (0, 0)   (2, 0)

    const geometry = new Triangle(gl);

    const texture = LoaderManager.get(`${this.#index}`);
   
    this.#program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: texture },
        uTextureResolution: { value: new Vec2(texture.image.width, texture.image.height) },
        uResolution: { value: new Vec2(gl.canvas.offsetWidth, gl.canvas.offsetHeight) },
        uMouse: { value: this.#mouse },
        uMouseIntro: { value: new Vec2(0.5, 0) },
        uIntro: { value: 0 },
        uBulge: { value: 0 },
        uRadius: { value: this.#guiObj.radius },
        uStrength: { value: this.#guiObj.strength },
      },
    });
    
    this.#mesh = new Mesh(gl, { geometry, program: this.#program });
    

    this.events();

    IntersectionObserver.observe(this.#index, this.#el, this.show, this.hide);
  }

  show = () => {
    let delay = 0;

    this.tlHide?.kill();
    this.tlShow = gsap.timeline();

    gsap.delayedCall(delay, () => {
      this.#el.parentNode.parentNode.classList.add('is-visible');
    });

    this.tlShow.fromTo(
      this.#program.uniforms.uBulge,
      { value: 1 },
      {
        value: 0,
        duration: 1,
        ease: 'power3.out',
        delay,
      },
    );

    this.tlShow.to(this.#program.uniforms.uIntro, { value: 1, duration: 5, delay }, 0);

    this.#visible = true;
  };

  hide = () => {
    let delay = 0;

    this.tlShow?.kill();
    this.tlHide = gsap.timeline();

    gsap.delayedCall(delay, () => {
      this.#el.parentNode.parentNode.classList.remove('is-visible');
    });

    this.tlHide.to(this.#program.uniforms.uBulge, {
      value: 1,
      duration: 1.8,
      ease: 'power3.out',
      delay,
    });

    this.tlHide.to(this.#program.uniforms.uIntro, { value: 0, duration: 1, delay }, 0);

    this.#visible = false;
  };

  events() {
    this.#el.addEventListener('mouseenter', this.handleMouseEnter, false);
    this.#el.addEventListener('mouseleave', this.handleMouseLeave, false);
  }

  render = t => {
    if (!this.#program) return;
    // this.#program.uniforms.uTime.value = t * 0.001

    this.#mouseTarget.x = gsap.utils.interpolate(this.#mouseTarget.x, this.#mouse.x, 0.1);
    this.#mouseTarget.y = gsap.utils.interpolate(this.#mouseTarget.y, this.#mouse.y, 0.1);

    this.#program.uniforms.uMouse.value = this.#mouseTarget;

    // Don't need a camera if camera uniforms aren't required
    this.#renderer.render({ scene: this.#mesh });
  };

  mouseMove = e => {
    if (!this.#canMove || !this.#program || !this.#visible) return;

    this.#elRect = this.#el.getBoundingClientRect();

    let eventX = this.#isTouch ? e.touches[0].pageX : e.clientX;
    let eventY = this.#isTouch ? e.touches[0].pageY : e.clientY;
    const x = (eventX - this.#elRect.left) / this.#el.offsetWidth;
    const y = 1 - (eventY - this.#elRect.top) / this.#el.offsetHeight;

    this.#mouse.x = gsap.utils.clamp(0, 1, x);
    this.#mouse.y = gsap.utils.clamp(0, 1, y);
  };

  handleMouseEnter = () => {
    if (!this.#canMove) return;
    this.tlHide?.kill();
    this.tlShow?.kill();
    // this.tlLeave?.kill()
    this.tlForceIntro = new gsap.timeline();
    this.tlForceIntro.to(this.#program.uniforms.uIntro, {
      value: 1,
      duration: 5,
      ease: 'expo.out',
    });
    gsap.to(this.#program.uniforms.uBulge, { value: 1, duration: 1, ease: 'expo.out' });
  };

  handleMouseLeave = () => {
    if (!this.#canMove) return;
    this.tlForceIntro?.kill();
    this.tlLeave = new gsap.timeline();
    this.tlLeave.to(this.#program.uniforms.uBulge, { value: 0, duration: 1, ease: 'expo.out' });
  };

  resize = () => {
    const w = this.#el.parentNode.offsetWidth;
    const h = this.#el.parentNode.offsetHeight;
    this.#renderer.setSize(w, h);

    this.#elRect = this.#el.getBoundingClientRect();

    if (this.#program) {
      this.#program.uniforms.uResolution.value = new Vec2(w, h);
    }

    this.#isTouch = isTouch();
  };
}
