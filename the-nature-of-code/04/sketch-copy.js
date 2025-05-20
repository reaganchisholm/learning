let emitter;

function setup() {
  createCanvas(640, 360);
  emitter = new Emitter();
}

function draw() {
  background(255);
  emitter.updateOrigin(mouseX, mouseY);
  emitter.run();
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

  run(){
    this.update();
    this.show(); 

    let gravity = createVector(0, 0.1);
    this.applyForce(gravity);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  isDead(){
    return (this.lifespan < 0.0);
  }
}

class Emitter {
  constructor(x = width/2, y = height/2){
    this.origin = createVector(x, y);
    this.particles = [];
  }

  updateOrigin(x, y){
    this.origin = createVector(x, y);
  }

  addParticle(){
    this.particles.push(new Particle(this.origin.x, this.origin.y));
  }

  run(){
    this.addParticle();
    let length = this.particles.length - 1;
    for  (let i = length; i >= 0; i--){
      let particle = this.particles[i];
      particle.run();

      if(particle.isDead()){
        this.particles.splice(i, 1);
      }
    }
  }
}
