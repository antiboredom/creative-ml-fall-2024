let faceMesh;
let cam;
let faces = [];

function preload() {
  faceMesh = ml5.faceMesh();
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
    // go through all keypoints
    for (let i = 0; i < face.keypoints.length; i++) {
      let kp = face.keypoints[i];
      fill(255, 0, 0);
      ellipse(kp.x, kp.y, 5, 5)
    }

    // just draw the lips
    if (face.lips) {
      image(cam, 0, 0, width, height, face.lips.x, face.lips.y, face.lips.width, face.lips.height);
    }
  }



}
