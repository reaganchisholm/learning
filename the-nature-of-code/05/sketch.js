let flock;

function setup() {
  createCanvas(500, 500);
  flock = new Flock();

  for(let i = 0; i < 100; i++){
    let boid = new Boid(width/2, height/2);
    flock.addBoid(boid);
  }
}

function draw() {
  background(230);
  flock.run();
}
