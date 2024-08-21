let handPose;
let video;
let hands = [];
let px;
let py;

function preload() {
  // Load the handPose model
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

function draw() {
  push();
  translate(width, 0);
  scale(-1, 1);
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let pointer = hand.keypoints[8]
    // fill(0, 255, 0);
    // noStroke();
    // circle(pointer.x, pointer.y, 10);
    let nx = pointer.x;
    let ny = pointer.y;
    if (px && py) {
      line(px, py, nx, ny);
    }
    px = nx;
    py = ny;
  }
  pop();
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}
