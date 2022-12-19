uniform float time;

varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.1415926535897932328;

void main() {
  gl_FragColor = vec4(vUv*0.5,0.,1.);
}