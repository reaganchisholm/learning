
let bodies = [];

function setup() {
  createCanvas(640, 640);

  for (let i = 0; i < 10; i++) {
    bodies.push(new Body(random(width), random(height)));
  }
}

function draw() {
  background(220);

  for (let i = 0; i < bodies.length; i++) {
    bodies[i].update();
    bodies[i].show();
  }

  for (let i = 0; i < bodies.length; i++) {
    for (let j = 0; j < bodies.length; j++) {
      if (i !== j) {
        let force = bodies[j].attract(bodies[i]);
        bodies[i].applyForce(force);
      }
      bodies[i].bounceEdges();
      bodies[i].update();
      bodies[i].show();
    }
  }
}

class Body {
  constructor(x, y, mass = 10) {
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
    f.limit(1);
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
    fill(255, 0, 0);
    circle(this.position.x, this.position.y, this.radius);
  }

  contactEdge() {
    return (this.position.y > height - this.radius - 1) || (this.position.x > width - this.radius - 1) || (this.position.x < 0 + this.radius) || (this.position.y < 0 + this.radius);
  }

  attract(body) {
    let G = 10;
    let force = p5.Vector.sub(this.position, body.position);
    let d = constrain(force.mag(), 5, 25);
    let str = (G * this.mass * body.mass) / (d * d);
    force.setMag(str);
    return force;
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