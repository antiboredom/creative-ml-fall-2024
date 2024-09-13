let faceMesh;
let cam;
let faces = [];
let noseImage;

function preload() {
  faceMesh = ml5.faceMesh();
  noseImage = loadImage("nose.png");
}

function setup() {
  createCanvas(640, 480);
  cam = createCapture(VIDEO);
  cam.hide();
  faceMesh.detectStart(cam, gotFaces)
}

function gotFaces(results) {
  faces = results;
}

function draw() {
  background(220);
  image(cam, 0, 0)
  // all faces
  for (let face of faces) {
    let nosePoint = face.keypoints[4];
    image(noseImage, nosePoint.x - 25, nosePoint.y - 25, 50, 50)
  }
}
