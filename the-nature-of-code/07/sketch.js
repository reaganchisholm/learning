let cells;
let generation = 0;
let w = 10;
let generations = [];

let ruleset = [0, 1, 0, 1, 1, 0, 1, 0];

function setup() {
  createCanvas(500, 500);
  background(255);

  // Set up cells
  cells = new Array(floor(width / w));
  for (let i = 0; i < cells.length; i++) { cells[i] = 0; }
  cells[floor(cells.length / 2)] = 1;
}

function draw() {
  background(255);

  if (generations.length > (height / w)) {
    generations.shift();
  }

  generations.push(cells);

  for (let i = 0; i < generations.length - 1; i++) {
    for (let j = 1; j < generations[i].length - 1; j++) {
      if (generations[i][j] === 1) {
        fill(0);
        square(j * w, height - (i * w), w);
      }
    }
  }

  let nextgen = cells.slice();

  for (let i = 1; i < cells.length - 1; i++) {
    let a = cells[i - 1];
    let b = cells[i];
    let c = cells[i + 1];

    nextgen[i] = rulesOfLife(a, b, c);
  }

  cells = nextgen;
  generation++;

  // if(generation === height/w){
  // generation = 0;
  // ruleset = randomRuleset();
  // background(255);
  // } else {
  // generation++;
  // }
}

function rulesOfLife(a, b, c) {
  let s = "" + a + b + c;
  let index = parseInt(s, 2);
  return ruleset[7 - index];
}

function randomRuleset() {
  return Array.from({ length: 8 }, () => Math.round(Math.random()));
}
