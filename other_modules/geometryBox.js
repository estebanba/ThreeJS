const geometry = new BoxGeometry(1);

const material = new MeshBasicMaterial({
  color: "white",
  polygonOffset: true,
  polygonOffsetFactor: 1,
  polygonOffsetUnits: 1,
});

const materialYellow = new MeshLambertMaterial({ color: "yellow" });
const materialBlue = new MeshStandardMaterial({ color: "blue" });
const materialRed = new MeshStandardMaterial({ color: "red" });
const materialGray = new MeshStandardMaterial({ color: "gray" });

const sun = new Mesh(geometry, material);
sun.position.x = 1.5;
sun.position.y = 0.5;
sun.position.z = 1.5;
scene.add(sun);

const edgesGeo = new EdgesGeometry(geometry);
const edgesMaterial = new LineBasicMaterial({ color: 0x000000 });
const wireframe = new LineSegments(edgesGeo, edgesMaterial);

sun.add(wireframe);

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
