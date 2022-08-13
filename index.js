import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  MOUSE,
  Vector2,
  Vector3,
  Vector4,
  Quaternion,
  Matrix4,
  Spherical,
  Box3,
  Sphere,
  Raycaster,
  MathUtils,
  Clock,
  Camera,
  MeshStandardMaterial,
  DirectionalLight,
  MeshLambertMaterial,
  TextureLoader,
  AmbientLight,
  HemisphereLight,
  SphereGeometry,
  AxesHelper,
  GridHelper,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CameraControls from "camera-controls";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import gsap from "gsap";

// 1 The Scene
const scene = new Scene();
const canvas = document.getElementById("three-canvas");

const axes = new AxesHelper();
axes.material.depthTest = false;
axes.renderOrder = 2;
scene.add(axes);

const grid = new GridHelper();
grid.material.depthTest = false;
grid.renderOrder = 0;
scene.add(grid);

// 2 The Objects

const Loader = new TextureLoader();

const geometry = new BoxGeometry(1);

const materialYellow = new MeshLambertMaterial({ color: "yellow" });
const materialBlue = new MeshStandardMaterial({ color: "blue" });
const materialRed = new MeshStandardMaterial({ color: "red" });
const materialGray = new MeshStandardMaterial({ color: "gray" });

const sun = new Mesh(geometry, materialYellow);
sun.position.x = 1.5;
sun.position.y = 0.5;
sun.position.z = 1.5;
scene.add(sun);

// const earth = new Mesh(geometry, materialBlue);
// earth.position.x += 2;
// earth.scale.set(0.2, 0.2, 0.2);

// const mars = new Mesh(geometry, materialRed);
// mars.position.x += 3;
// mars.scale.set(0.2, 0.2, 0.2);

// sun.add(earth, mars);

// const moon = new Mesh(geometry, materialGray);
// moon.position.x += 1;
// moon.scale.set(0.5, 0.5, 0.5);

// earth.add(moon);

// 3 The Camera
const sizes = {
  width: 800,
  height: 600,
};

const camera = new PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight
);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;

camera.lookAt(axes.position);
scene.add(camera);

// 4 The Renderer
const renderer = new WebGLRenderer({ canvas, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizes.width, sizes.height, false);

// 5 The Lights
const light1 = new DirectionalLight();
light1.position.set(3, 2, 1).normalize();
scene.add(light1);

const ambientLight = new HemisphereLight(0xffffff, 0xff0000, 0.5);
scene.add(ambientLight);

// 6 Responsivness
window.addEventListener("resize", () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
});

// 7 Controls
const subsetOfTHREE = {
  MOUSE,
  Vector2,
  Vector3,
  Vector4,
  Quaternion,
  Matrix4,
  Spherical,
  Box3,
  Sphere,
  Raycaster,
  MathUtils: {
    DEG2RAD: MathUtils.DEG2RAD,
    clamp: MathUtils.clamp,
  },
};

CameraControls.install({ THREE: subsetOfTHREE });

const clock = new Clock();
const cameraControls = new CameraControls(camera, canvas);
cameraControls.dollyToCursor = true;

// 8 Animate
function animate() {
  const delta = clock.getDelta();
  cameraControls.update(delta);

  // sun.rotation.y += 0.01;
  // earth.rotation.y += 0.02;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// 9 Debugging? => GUI Graphical User Interface

const gui = new GUI();
const min = -3;
const max = 3;
const step = 0.1;

const transformationFolder = gui.addFolder("Transform");

transformationFolder.add(sun.position, "x", min, max, step).name("Position X");
transformationFolder.add(sun.position, "y", min, max, step).name("Position Y");
transformationFolder.add(sun.position, "z", min, max, step).name("Position Z");

gui.addFolder("visiblity").add(sun, "visible");

const colorParam = {
  value: 0xff0000,
};

gui
  .addColor(colorParam, "value")
  .name("Color")
  .onChange(() => {
    sun.material.color.set(colorParam.value);
  });

const functionParam = {
  spin: () => {
    gsap.to(sun.rotation, { y: sun.rotation.y + 10, duration: 1 });
  },
};

gui.add(functionParam, "spin");
