class Vehicle {
  constructor(x, y, maxSpeed = 3, maxForce = 0.5){
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = 6.0
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
  }

  run(){
    this.update();
    this.show();
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

  applyBehaviors(vehicles){
    let separate = this.separate(vehicles);
    let seek = this.seek(createVector(mouseX, mouseY));

    if(separate){
      separate.mult(1.5);
    }
    seek.mult(0.5);

    this.applyForce(separate);
    this.applyForce(seek);
  }

  seek(target){
    let desired = p5.Vector.sub(target, this.position);
    desired.mult(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);

    return steer;
  }

  separate(vehicles){
    let desiredSeparation = 50;
    let sum = createVector();
    let count = 0;

    for (let other of vehicles){
      let d = p5.Vector.dist(this.position, other.position);
      if (this !== other && d < desiredSeparation){
        let diff = p5.Vector.sub(this.position, other.position);
        diff.setMag(1 / d);
        sum.add(diff);
        count++;
      }
    }

    if(count > 0){
      sum.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    }
  }

  follow(path) {
    let future = this.velocity.copy();
    future.setMag(50);
    future.add(this.position);

    let target = null;
    let normal = null;
    let worldRecord = Infinity;

    for (let i = 0; i < path.points.length - 1; i++){
      let a = path.points[i];
      let b = path.points[i + 1 ];

      let normalPoint = getNormalPoint(future, a, b);

      if(normalPoint.x < a.x || normalPoint.x > b.x){
        normalPoint = b.copy();
      }

      let distance = p5.Vector.dist(future, normalPoint);

      if(distance < worldRecord){
        worldRecord = distance;
        normal = normalPoint;
        target = normalPoint.copy();

        let dir = p5.Vector.sub(b, a);
        dir.setMag(10);
        target.add(dir);
      }
    }

    if (worldRecord > path.radius && target !== null){
      this.seek(target);
    }
  }

  borders(p) {
    if(this.position.x > p.end.x + this.r){
      this.position.x = p.start.x - this.r;
      this.position.y = p.start.y + (this.position.y - p.end.y);
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
    strokeWeight(2);
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
