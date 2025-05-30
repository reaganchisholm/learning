let emitters = [];
let repeller;

function setup() {
  createCanvas(640, 360);

  repeller = new Repeller(width/2 - 20, height / 2);
}

function draw() {
  background(255);
  let gravity = createVector(0, 0.1);


  for (let i = emitters.length - 1; i >= 0; i--){
    emitters[i].applyForce(gravity);
    emitters[i].applyRepeller(repeller);
    emitters[i].run();

    if(emitters[i].isDead()){
        emitters.splice(i, 1);
    }
  }

  repeller.show();

}

function mouseClicked(){
  emitters.push(new Emitter(mouseX, mouseY));
}

class Particle {
  constructor(x,y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 5), random(-1, -5));
    this.position = createVector(x, y);
    this.lifespan = 255.0;
    this.mass = 0.5;
  }

  run(){
    this.update();
    this.show(); 
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2.0;
    this.acceleration.mult(0);
  }

  applyForce(force){
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  isDead(){
    return (this.lifespan < 0);
  }

  show(){
    fill(0, this.lifespan);
    circle(this.position.x, this.position.y, 8);
  }
}

class Confetti extends Particle {
  constructor(x,y){
    super(x,y);
  }

  show(){
    let angle = map(this.position.x, 0, width, 0, TWO_PI * 2);

    rectMode(CENTER);
    fill(0, this.lifespan);
    stroke(0, this.lifespan);
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    rectMode(CENTER);
    square(0, 0, 12);
    pop();
  }
}

class Emitter {
  constructor(x, y){
    this.origin = createVector(x, y);
    this.particles = [];
  }

  updateOrigin(x, y){
    this.origin = createVector(x, y);
  }

  addParticle(){
    let r = random(1);

    if(r < 0.5){
      this.particles.push(new Particle(this.origin.x, this.origin.y));
    } else {
      this.particles.push(new Confetti(this.origin.x, this.origin.y));
    }
  }

  isDead(){
    return this.lifespan < 0.0 && this.particles.length === 0;
  }

  applyForce(force){
    for (let particle of this.particles) {
      particle.applyForce(force);
    }
  }

  applyRepeller(repeller){
    for (let particle of this.particles) {
      let force = repeller.repel(particle);
      particle.applyForce(force);
    }
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

    this.lifespan -= 1.0;
  }
}

class Repeller {
  constructor(x, y){
    this.position = createVector(x, y);
    this.power = 250;
  }

  show(){
    stroke(0);
    fill(127);
    circle(this.position.x, this.position.y, 32);
  }

  repel(particle){
    let force = p5.Vector.sub(this.position, particle.position);
    let distance = force.mag();
    distance = constrain(distance, 5, 50);
    let strength = -1 * this.power / (distance * distance);
    force.setMag(strength);
    return force;
  }
}
