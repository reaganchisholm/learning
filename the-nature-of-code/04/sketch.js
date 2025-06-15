let emitters = [];
let repeller;
let img;

function preload() {
  img = loadImage("texture.png");
}

function setup() {
  createCanvas(640, 360);

  repeller = new Repeller(width/2 - 20, height / 2);
}

function draw() {
  blendMode(ADD);
  clear();
  background(0);
  let gravity = createVector(0, 0.1);


  for (let i = emitters.length - 1; i >= 0; i--){
    emitters[i].applyForce(gravity);
    emitters[i].applyRepeller(repeller);
    emitters[i].run();
    emitters[i].addParticle(3);

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
    let vx = randomGaussian(0, 0.3);
    let vy = randomGaussian(-1, 0.3);
    this.velocity = createVector(vx, vy);
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
    imageMode(CENTER);
    tint(255, this.lifespan);
    image(img, this.position.x, this.position.y);
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

  addParticle(numOfParticles){
    for (let i = numOfParticles; i > 0; i--){
      this.particles.push(new Particle(this.origin.x, this.origin.y));
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
