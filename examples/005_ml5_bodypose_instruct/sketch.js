let bodyPose;
let video;
let poses = [];
let connections;

function preload() {
  // Load the bodyPose model

  // try putting "BlazePose" inside the bodyPose() function
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(640, 480);
  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  bodyPose.detectStart(video, gotPoses);

  // connections show how each keypoint is connected to each other
  // it never changes!
  connections = bodyPose.getSkeleton();
}

function draw() {
  background(255);

  // draw the video
  tint(255, 100)
  image(video, 0, 0, width, height);


  instructions = "";

  // iterate through all the poses
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];

    let leftKnee = pose.keypoints[13]
    let rightKnee = pose.keypoints[14]

    let leftHip = pose.keypoints[11]
    let rightHip = pose.keypoints[12]

    if (leftKnee.y > leftHip.y && rightKnee.y > rightHip.y) {
      instructions = "LIFT UP YOUR KNEES"
    }

    // for (let j = 0; j < pose.keypoints.length; j++) {
    //   let keypoint = pose.keypoints[j];
    //   if (keypoint.confidence > 0.1) {
    //     // draw the keypoint if the confidence is high enough
    //     fill(0, 255, 0);
    //     noStroke();
    //     circle(keypoint.x, keypoint.y, 10);
    //     fill(255, 255, 255);

    //     // display the keypoint number/index
    //     textSize(12);
    //     text(j, keypoint.x, keypoint.y);
    //   }
    // }
  }

  textAlign(CENTER)
  textSize(30)
  text(instructions, width / 2, height / 2)
}

// Callback function for when the model returns pose data
function gotPoses(results) {
  // Store the model's results in a global variable
  poses = results;
}