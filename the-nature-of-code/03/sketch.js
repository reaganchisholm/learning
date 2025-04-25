let osc = [];
let startAngle = 0;
let deltaAngle = 0.2;
let amplitude = 100;

function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(255);
  let angle = startAngle;
  for (let x = 0; x < width; x += 3) {
    let y = map(tan(angle), -1, 1, 0, height);
    stroke(0);
    fill(255);
    circle(x, y, 48);
    angle += deltaAngle;
  }
  for (let x = 0; x < width; x += 5) {
    let y = map(sin(angle), -1, 1, 0, height);
    stroke(0);
    fill(0);
    circle(x, y, 48);
    angle += deltaAngle;
  }
  startAngle += 0.02;
}

class Oscillator {
  constructor() {
    this.angle = createVector();
    this.angleVelocity = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
    this.amplitude = createVector(random(20, width / 2), random(20, height / 2));
  }

  update() {
    this.angle.add(this.angleVelocity);
  }

  show() {
    let x = sin(this.angle.x) * this.amplitude.x;
    let y = sin(this.angle.y) * this.amplitude.y;

    push();
    translate(width / 2, height / 2);
    stroke(0);
    fill(127);
    line(0, 0, x, y);
    circle(x, y, 32);
    pop();
  }
}