class Boid {
  constructor(x, y, maxSpeed = 3, maxForce = 0.05){
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.position = createVector(x, y);
    this.r = 3.0
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
  }

  run(boids){
    let column = floor(this.position.x / resolution);
    let row = floor(this.position.y / resolution);

    column = constrain(column, 0, cols - 1);
    row = constrain(row, 0, rows - 1);
    let neighbors = grid[column][row];

    this.flock(neighbors);
    this.update();
    this.borders();
    this.show();
  }

  flock(boids){
    let separation = this.separate(boids);
    let alignment = this.align(boids);
    let cohesion = this.cohere(boids)

    separation.mult(1.5);
    alignment.mult(1.0);
    cohesion.mult(1.0);

    this.applyForce(separation);
    this.applyForce(alignment);
    this.applyForce(cohesion);
  }

  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  align(boids){
    let neighborDistance = 50;
    let sum = createVector(0,0);
    let count = 0;


    for (let other of boids){
      let d = p5.Vector.dist(this.position, other.position);
      if((this !== other) && (d < neighborDistance)){
        sum.add(other.velocity);
        count++;
      }
      sum.add(other.velocity);
    }

    if(count > 0){
      sum.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0,0);
    }
  }

  cohere(boids){
    let neighborDistance = 50;
    let sum = createVector(0,0);
    let count = 0;

    for(let other of boids){
      let d = p5.Vector.dist(this.position, other.position);
      if((this !== other) && (d < neighborDistance)){
        sum.add(other.position);
        count++;
      }
    }

    if(count > 0){
      sum.div(count);
      return this.seek(sum);
    } else {
      return createVector(0,0);
    }
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
    } else {
      return createVector(0,0);
    }
  }

  seek(target){
    let desired = p5.Vector.sub(target, this.position);
    desired.normalize();
    desired.mult(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);

    return steer;
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

  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force){
    this.acceleration.add(force);
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
