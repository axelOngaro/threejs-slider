import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import vertex from "../shaders/vertex.glsl";
import fragment from "../shaders/fragment.glsl";

export default class Sketch {
  constructor(options) {
    this.container = options.domElement;
    this.height = this.container.offsetHeight;
    this.width = this.container.offsetWidth;
    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.001, 1000);
    this.camera.position.z = 2;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.time = 0;
    this.resize();
    this.addObjects();
    this.render();
    this.setupResize();
    this.debug();
  }

  debug() {
    this.gui = new dat.GUI();
    this.gui.add(this.mesh, "visible");
  }
  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }
  addObjects() {
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 10, 10);

    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        resolution: { type: "v4", value: new THREE.Vector4() },
        uvRate: {
          value: new THREE.Vector2(1, 1),
        },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  render() {
    this.time += 0.05;
    this.mesh.rotation.x = this.time / 2000;
    this.mesh.rotation.y = this.time / 1000;

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}
