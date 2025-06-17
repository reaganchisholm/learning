let vehicle;


function setup() {
  createCanvas(640, 360);

  vehicle = new Vehicle(width/2, height/2);
}

function draw() {
  background(0);

  vehicle.update();
  vehicle.show();
  // vehicle.seek(createVector(mouseX, mouseY));
  vehicle.arrive(createVector(mouseX, mouseY));
  // vehicle.boundaries(5);
}

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
      this.applyFrce(steer);
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
