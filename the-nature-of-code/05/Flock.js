class Flock {
  constructor(){
    this.boids = [];
  }

  run(){
    for (let boid of this.boids){
      boid.run(this.boids);
    }
  }

  addBoid(boid){
    this.boids.push(boid);
  }
}
