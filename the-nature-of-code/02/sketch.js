let position;
let velocity;
let moverA;
let moverB;

function setup() {
  createCanvas(400, 400);
  moverA = new Mover(100, 30, 10);
  moverB = new Mover(300, 30, 2);
}

function draw() {
  background(220);

  let gravity = createVector(0, 0.1);
  moverA.applyForce(gravity);
  moverB.applyForce(gravity)

  if (mouseIsPressed) {
    let wind = createVector(1, 0);
    moverA.applyForce(wind);
    moverB.applyForce(wind)
  }

  moverA.update();
  moverA.show();
  moverA.checkEdges();

  moverB.update();
  moverB.show();
  moverB.checkEdges();
}

class Mover {
  constructor(x, y, mass) {
    this.mass = mass;
    this.size = mass * 16;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  show() {
    stroke(0);
    fill(175);
    circle(this.position.x, this.position.y, this.size);
  }

  checkEdges() {
    if ((this.position.x + (this.size / 2)) > width) {
      this.position.x = (height - this.size / 2);
      this.velocity.x *= -1;
    } else if ((this.position.x - (this.size / 2)) < 0) {
      this.position.x = this.size / 2;
      this.velocity.x *= -1;
    }
    if ((this.position.y + (this.size / 2)) > height) {
      this.position.y = (height - this.size / 2);
      this.velocity.y *= -1;
    } else if ((this.position.y - (this.size / 2)) < 0) {
      this.position.y = this.size / 2;
      this.velocity.y *= -1;
    }
  }
}

