let population = [];

function setup() {
  createCanvas(500, 500);
  background(255);

  for (let i = 0; i < 100; i++){
    population[i] = new DNA(18);
  }
}

function draw() {
  let matingPool = [];

  for (let phrase of population){
    phrase.calculateFitness(target);

    let n = floor(phrase.fitness * 100);

    for (let j = 0; j < n; j++){
      matingPool.push(phrase);
    }
  }

  let parentA = random(matingPool);
  let parentB = random(matingPool);

}

class DNA {
  constructor(length){
    this.genes = [];
    this.fitness = 0;

    for(let i = 0; i < length; i++){
      this.genes[i] = randomCharacters();
    }
  }

  calculateFitness(target){
    let score = 0;
    for (let i = 0; i < this.genes.length; i++){
      if(this.genes[i] === target.charAt(i)) {
        score++;
    }
    this.fitness = score / target.length
  }
}

function randomCharacter(){
  let c = floor(random(32, 127));
  return String.fromCharCode(c);
}
