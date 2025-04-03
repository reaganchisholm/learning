let position;
let velocity;
let mover;
let moverB;
let isDragging = false;
let liquid;

function setup() {
  createCanvas(400, 400);
  mover = new Mover(100, 30, 40);
  liquid = new Liquid(0, height / 2, width, height / 2, 1);
}

function draw() {
  background(220);

  liquid.show();

  let gravity = createVector(0, 0.1);
  let gravityA = p5.Vector.mult(gravity, mover.mass);

  if (!isDragging) {
    mover.applyForce(gravityA);
  }

  if (mouseIsPressed) {
    let d = dist(mouseX, mouseY, mover.position.x, mover.position.y);
    if (d < mover.radius / 2) {
      isDragging = true;
    }
  } else {
    isDragging = false;
  }

  if (isDragging) {
    let mousePos = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mousePos, mover.position);
    dir.mult(0.2);
    mover.velocity = dir;
  }

  if (liquid.contains(mover)) {
    let dragForce = liquid.calculateDrag(mover);
    mover.applyForce(dragForce);
  }

  // if (mouseIsPressed) {
  //   let wind = createVector(0.5, 0);
  //   mover.applyForce(wind);
  // }

  if (mover.contactEdge()) {
    let c = 0.1;
    let friction = mover.velocity.copy();
    friction.mult(-1);
    friction.setMag(c);
    mover.applyForce(friction);
  }

  mover.bounceEdges();
  mover.update();
  mover.show();

}

class Mover {
  constructor(x, y, mass) {
    this.mass = mass;
    this.radius = mass;
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

  setPosition(posVec) {
    this.acceleration.mult(0);
    this.velocity.mult(0);
    this.position.set(posVec);
  }

  getPosition() {
    return [this.position.x, this.position.y];
  }

  show() {
    stroke(0);
    fill(175);
    circle(this.position.x, this.position.y, this.radius);
  }

  contactEdge() {
    return (this.position.y > height - this.radius - 1) || (this.position.x > width - this.radius - 1) || (this.position.x < 0 + this.radius) || (this.position.y < 0 + this.radius);
  }

  bounceEdges() {
    let bounce = -0.75;

    if (this.position.y > (height - this.radius / 2)) {
      // Bottom edge
      this.position.y = height - this.radius / 2;
      this.velocity.y *= bounce;
    } else if (this.position.y < (this.radius / 2)) {
      // Top edge
      this.position.y = this.radius / 2;
      this.velocity.y *= bounce;
    }

    if (this.position.x > (width - this.radius / 2)) {
      // Right edge
      this.position.x = width - this.radius / 2;
      this.velocity.x *= bounce;
    } else if (this.position.x < (this.radius / 2)) {
      // Left edge
      this.position.x = this.radius / 2;
      this.velocity.x *= bounce;
    }
  }
}

class Liquid {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  show() {
    noStroke();
    fill(175);
    rect(this.x, this.y, this.w, this.h);
  }

  contains(mover) {
    let pos = mover.position;
    return (pos.x > this.x && pos.x < this.x + this.w && pos.y > this.y && pos.y < this.y + this.h);
  }

  calculateDrag(mover) {
    let speed = mover.velocity.mag();
    let dragMagnitude = this.c * speed * speed;

    let dragForce = mover.velocity.copy();
    dragForce.mult(-1);
    dragForce.setMag(dragMagnitude);

    return dragForce;
  }
}

