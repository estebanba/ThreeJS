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
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CameraControls from "camera-controls";

// 1 The Scene
const scene = new Scene();
const canvas = document.getElementById("three-canvas");

// 2 The Objects

const Loader = new TextureLoader();

const geometry = new BoxGeometry(1, 1, 1);
const materialYellow = new MeshLambertMaterial({ color: "yellow" });
const materialBlue = new MeshStandardMaterial({ color: "blue" });
const materialRed = new MeshStandardMaterial({ color: "red" });

const yellowCube = new Mesh(geometry, materialYellow);
const redCube = new Mesh(geometry, materialRed);
redCube.position.y += 1;
scene.add(redCube, yellowCube);

const blueCube = new Mesh(geometry, materialBlue);
blueCube.position.x += 1;
blueCube.scale.set(1, 1, 1);
scene.add(blueCube);

// 3 The Camera
const sizes = {
  width: 800,
  height: 600,
};

const camera = new PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight
);
camera.position.z = 3;
scene.add(camera);

// 4 The Renderer
const renderer = new WebGLRenderer({ canvas, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
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

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
