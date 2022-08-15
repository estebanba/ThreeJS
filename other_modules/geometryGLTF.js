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
