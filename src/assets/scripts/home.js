import App from './bulge/App';
import './3DScroll/utils';
import './3DScroll/imagesloaded.pkgd.min';
import './3DScroll/index';
import { gsap, ScrollTrigger } from 'gsap/all';
import { Curtains, Plane } from 'curtainsjs';
// gsap.
gsap.registerPlugin(ScrollTrigger);
new App(gsap, ScrollTrigger);

var tl = gsap.timeline();

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

// set up our WebGL context and append the canvas to our wrapper
const curtains = new Curtains({
  container: 'card-curtains',
});

// get our plane element
const planeElement = document.getElementsByClassName('plane')[0];

// set our initial parameters (basic uniforms)
const params = {
  vertexShader: `#ifdef GL_ES
    precision mediump float;
    #endif
    
    // those are the mandatory attributes that the lib sets
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;
    
    // those are mandatory uniforms that the lib sets and that contain our model view and projection matrix
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    
    // our texture matrix that will handle image cover
    uniform mat4 uTextureMatrix0;
    
    // pass your vertex and texture coords to the fragment shader
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;
    
    void main() {       
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        
        // set the varyings
        // here we use our texture matrix to calculate the accurate texture coords
        vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
        vVertexPosition = aVertexPosition;
    }`, // our vertex shader ID
  fragmentShader: ` #ifdef GL_ES
    precision mediump float;
    #endif
    
    // get our varyings
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;
    
    // the uniform we declared inside our javascript
    uniform float uTime;
    
    // our texture sampler (default name, to use a different name please refer to the documentation)
    uniform sampler2D uSampler0;
    
    void main() {
        // get our texture coords from our varying
        vec2 textureCoord = vTextureCoord;
        
        // displace our pixels along the X axis based on our time uniform
        // textures coords are ranging from 0.0 to 1.0 on both axis
        textureCoord.x += sin(textureCoord.y * 25.0) * cos(textureCoord.x * 25.0) * (cos(uTime / 50.0)) / 25.0;
        
        // map our texture with the texture matrix coords
        gl_FragColor = texture2D(uSampler0, textureCoord);
    }`, // our fragment shader ID
  uniforms: {
    time: {
      name: 'uTime', // uniform name that will be passed to our shaders
      type: '1f', // this means our uniform is a float
      value: 0,
    },
  },
};

// create our plane using our curtains object, the bound HTML element and the parameters
const plane = new Plane(curtains, planeElement, params);
console.log(plane);
plane.onRender(() => {
  console.log('fefef');
  // use the onRender method of our plane fired at each requestAnimationFrame call
  plane.uniforms.time.value++; // update our time uniform value
});
