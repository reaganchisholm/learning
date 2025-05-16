let particle;

function setup() {
  createCanvas(640, 360);
  particle = new Particle(width / 2, 20);
}

function draw() {
  background(255);

  particle.update();
  particle.show();

  let gravity = createVector(0, 0.1);
  particle.applyForce(gravity);
  if(particle.isDead()){
    particle = new Particle(width/2, 20);
    console.log("Particle is dead!");
  }
}

class Particle {
  constructor(x,y) {
    this.position = createVector(x, y);
    this.acceleration = createVector(random(-1, 1), random(-2, 0));
    this.velocity = createVector();
    this.lifespan = 255;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 2.0;
  }

  show(){
    stroke(0, this.lifespan);
    fill(175, this.lifespan);
    circle(this.position.x, this.position.y, 8);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  isDead(){
    return (this.lifespan < 0.0);
  }
}
