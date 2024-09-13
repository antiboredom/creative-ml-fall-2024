let cam;

function setup() {
  createCanvas(1280, 720);
  let camOptions = {
    video: {
      width: 1280,
      height: 720
    },
    audio: false,
  };
  cam = createCapture(camOptions, { flipped: true });
  cam.hide();
}

function draw() {
  background(255, 0, 0);

  // tint(255, 100)
  image(cam, 100, 150, 300, 300, 500, 500, 200, 200, 500, 500);
  filter(BLUR, 20)
  filter(INVERT)

}
