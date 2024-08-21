let handPose;
let video;
let hands = [];

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
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // the top of the middle finger is keypoint 12
  let isRude = false;

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    if (hand.keypoints[6].x < hand.keypoints[10].x && hand.keypoints[10].x < hand.keypoints[14].x) {
      if (hand.keypoints[12].y < hand.keypoints[11].y) {
        isRude = true;
      }
    }
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
      fill(255)
      text(j, keypoint.x, keypoint.y)
    }
  }

  if (isRude) {
    background(0)
  }
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}
