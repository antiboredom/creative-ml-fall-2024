let cam;
let poses = [];

function preload() {
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(640, 480);

  cam = createCapture(VIDEO);
  cam.hide()

  bodyPose.detectStart(cam, gotPose)
}

function gotPose(results) {
  poses = results;
}

function draw() {
  background(220);
  image(cam, 0, 0);

  for (let pose of poses) {
    for (let i = 0; i < pose.keypoints.length; i++) {
      let kp = pose.keypoints[i];
      fill(255)
      ellipse(kp.x, kp.y, 20, 20);
      fill(0)
      text(i, kp.x, kp.y)
    }

    let knee = pose.keypoints[14];
    let hip = pose.keypoints[12];

    if (knee.y > hip.y) {
      background(0);
      fill(255);
      text("RAISE YOUR KNEES UP!!!!", 100, 100)
    }
  }


}
