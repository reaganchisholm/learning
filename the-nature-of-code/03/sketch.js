let pendulum;

function setup() {
  createCanvas(640, 240);
  pendulum = new Pendulum(width / 2, 0, 175);
}

function draw() {
  background(255);

  pendulum.update();
  pendulum.show();
}

class Pendulum {
  constructor(x, y, r) {
    this.pivot = createVector(x, y);
    this.bob = createVector();
    this.r = r;
    this.angle = PI / 2;
    this.angleVelocity = 0;
    this.angleAcceleration = 0;
    this.damping = 0.99;
    this.ballr = 24;
  }

  update() {
    let gravity = 0.4;

    this.angleAcceleration = (-1 * gravity / this.r) * sin(this.angle);
    this.angleVelocity += this.angleAcceleration;
    this.angle += this.angleVelocity;
    this.angleVelocity *= this.damping;
  }

  show() {
    this.bob.set(this.r * sin(this.angle), this.r * cos(this.angle));
    this.bob.add(this.pivot);
    stroke(0);
    line(this.pivot.x, this.pivot.y, this.bob.x, this.bob.y);
    fill(127);
    circle(this.bob.x, this.bob.y, this.ballr * 2);
  }
}