
function setup() {
  createCanvas(640, 640);
  background(255);
}

function draw() {
  let x = randomGaussian(320, 100);
  noStroke();
  fill(0, 10);
  circle(x, 120, 16);
}