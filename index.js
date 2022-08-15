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
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  PointLight,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CameraControls from "camera-controls";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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

const Loader = new GLTFLoader();
Loader.load(
  "./police_station.glb",
  (gltf) => {
    scene.add(gltf.scene);
  },
  (progress) => {
    console.log(progress);
  },
  (error) => {
    console.log(error);
  }
);

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

const ambientLight = new AmbientLight(0xffffff, 0x000000, 0.5);
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
cameraControls.setLookAt(3, 4, 2, 0, 0, 0);

// 8 Picking

// const raycaster = new Raycaster();
// const mouse = new Vector2();
// let previousSelection = {
//   geometry: null,
//   material: null,
// };

// const highlightMaterial = new MeshBasicMaterial({ color: "red" });

// window.addEventListener("mousemove", (event) => {
//   mouse.x = (event.clientX / canvas.clientWidth) * 2 - 1;
//   mouse.y = -(event.clientY / canvas.clientHeight) * 2 + 1;

//   raycaster.setFromCamera(mouse, camera);
//   const intersection = raycaster.intersectObjects(cubes);

//   const hasCollided = intersection.length !== 0;

//   if (!hasCollided) {
//     if (previousSelection.mesh) {
//       previousSelection.mesh.material = previousSelection.material;
//       previousSelection.mesh = null;
//       previousSelection.material = null;
//     }
//     return;
//   }
//   const first = intersection[0];

//   const isPreviousSelection = previousSelection.mesh === first.object;

//   if (isPreviousSelection) return;

//   if (previousSelection.mesh) {
//     previousSelection.mesh.material = previousSelection.material;
//     previousSelection.mesh = null;
//     previousSelection.material = null;
//   }

//   previousSelection.mesh = first.object;
//   previousSelection.material = first.object.material;

//   first.object.material = highlightMaterial;
// });

// 9 Animate
function animate() {
  const delta = clock.getDelta();
  cameraControls.update(delta);

  // cubeMesh.rotation.y += 0.01;
  // earth.rotation.y += 0.02;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// 10 Debugging? => GUI Graphical User Interface

const gui = new GUI();
const min = -3;
const max = 3;
const step = 0.1;

const transformationFolder = gui.addFolder("Transform");

transformationFolder
  .add(cubeMesh.position, "x", min, max, step)
  .name("Position X");
transformationFolder
  .add(cubeMesh.position, "y", min, max, step)
  .name("Position Y");
transformationFolder
  .add(cubeMesh.position, "z", min, max, step)
  .name("Position Z");

gui.addFolder("visiblity").add(cubeMesh, "visible");

const colorParam = {
  value: 0xff0000,
};

gui
  .addColor(colorParam, "value")
  .name("Color")
  .onChange(() => {
    cubeMesh.material.color.set(colorParam.value);
  });

const functionParam = {
  spin: () => {
    gsap.to(cubeMesh.rotation, { y: cubeMesh.rotation.y + 10, duration: 1 });
  },
};

gui.add(functionParam, "spin");
