class Vehicle {
  constructor(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = 6.0
    this.maxSpeed = 3;
    this.maxForce = 0.5;
  }

  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force){
    this.acceleration.add(force);
  }

  seek(target){
    let desired = p5.Vector.sub(target, this.position);
    desired.mult(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  // follow(flow){
  //   let desired = flow.lookup(this.position);
  //   desired.setMag(this.maxspeed);
  //   let steer = p5.Vector.sub(desired, this.velocity);
  //   steer.limit(this.maxForce);
  //   this.applyForce(steer);
  // }

  follow(path) {
    let future = this.velocity.copy();
    future.setMag(25);
    future.add(this.position);

    let normalPoint = getNormalPoint(future, path.start, path.end);
    let b = p5.Vector.sub(path.end, path.start);
    b.setMag(25);
    let target = p5.Vector.add(normalPoint, b);

    let distance = p5.Vector.dist(normalPoint, future);
    if(distance > path.radius) {
      this.seek(target);
    }
  }

  boundaries(offset){
    let desired = null;

    if(this.position.x < offset){
      desired = createVector(this.maxSpeed, this.velocity.y);
    } else if (this.position.x > width - offset) {
      desired = createVector(-this.maxSpeed, this.velocity.y);
    }

    if (this.position.y < offset){
      desired = createVector(this.velocity.x, this.maxSpeed);
    } else if(this.position.y > height - offset){
      desired = createVector(this.velocity.x, -this.maxSpeed);
    }

    if(desired !== null){
      desired.normalize();
      desired.mult(this.maxSpeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
  }

  arrive(target){
    let desired = p5.Vector.sub(target, this.position);
    let d = desired.mag();

    if(d < 100) {
      let m  = map(d, 0, 100, 0, this.maxSpeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxSpeed);
    }

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  show(){
    let angle = this.velocity.heading();
    fill(127);
    stroke(0);
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    beginShape();
    vertex(this.r * 2, 0);
    vertex(-this.r * 2, -this.r);
    vertex(-this.r * 2, this.r);
    endShape(CLOSE);
    pop();
  }
}

function getNormalPoint(position, a, b){
  let vectorA = p5.Vector.sub(position, a);
  let vectorB = p5.Vector.sub(b, a);

  vectorB.normalize();
  vectorB.mult(vectorA.dot(vectorB));

  let normalPoint = p5.Vector.add(a, vectorB);

  return normalPoint;
}
