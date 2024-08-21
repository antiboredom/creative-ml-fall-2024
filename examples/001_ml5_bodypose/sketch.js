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
  image(video, 0, 0, width, height);

  // iterate through all the poses
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];

    // iterate through this poses connections
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];

      // draw the line if the confidence is high enough
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }

    // Iterate through all the keypoints for each pose
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.confidence > 0.1) {
        // draw the keypoint if the confidence is high enough
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
        fill(255, 255, 255);

        // display the keypoint number/index
        textSize(12);
        text(j, keypoint.x, keypoint.y);
      }
    }
  }
}

// Callback function for when the model returns pose data
function gotPoses(results) {
  // Store the model's results in a global variable
  poses = results;
}