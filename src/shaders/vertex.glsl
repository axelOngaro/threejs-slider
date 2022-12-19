uniform float time;

varying vec2 vUv;
varying vec2 vPosition;

 float PI = 3.1415926535897932328;

void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}