let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 3, refineLandmarks: false, flipHorizontal: true };
let noseImage;

function preload() {
  // Load the faceMesh model
  faceMesh = ml5.faceMesh(options);
  noseImage = loadImage("nose.png")
}

function setup() {
  createCanvas(1280, 720);
  // Create the webcam video, flipped, at 1280x720
  video = createCapture({ video: { width: 1280, height: 720 }, audio: false }, { flipped: true });
  // hide the webcam
  video.hide();
  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  image(video, 0, 0)

  // iterate over all the faces
  for (let face of faces) {
    // get the center of the nose. it's the 4th keypoint
    let nosePoint = face.keypoints[4];

    // set the image mode to CENTER so that it draws from the center coords of the image
    push()
    imageMode(CENTER)
    // draw the image at our nose, with size 100x100
    image(noseImage, nosePoint.x, nosePoint.y, 100, 100)
    pop()
  }
}
// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}
