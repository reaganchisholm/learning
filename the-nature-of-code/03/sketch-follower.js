let mover;

function setup() {
  createCanvas(400, 400);

  mover = new Mover();
}

function draw() {
  background(220);

  mover.update();
  mover.show();

  // Follow mouse
  let mouse = createVector(mouseX, mouseY);
  mover.follow(mouse);
}

class Mover {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.radius = 30;
    this.mass = 1.0;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  follow(target) {
    let force = p5.Vector.sub(target, this.position);
    force.normalize();
    force.mult(0.01);
    this.applyForce(force);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    f.limit(1);
    this.acceleration.add(f);
  }

  show() {
    let angle = atan2(this.velocity.y, this.velocity.x);
    stroke(0);
    fill(175, 200);
    push();
    rectMode(CENTER);
    translate(this.position.x, this.position.y);
    rotate(angle);
    rect(0, 0, 30, 10);
    pop();
  }

  contactEdge() {
    return (this.position.y > height - this.radius - 1) || (this.position.x > width - this.radius - 1) || (this.position.x < 0 + this.radius) || (this.position.y < 0 + this.radius);
  }

  bounceEdges() {
    let bounce = -1;

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