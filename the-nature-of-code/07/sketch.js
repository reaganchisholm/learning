let cells;
let generation = 0;
let w = 10;

let ruleset = [0, 1, 0, 1, 1, 0 , 1, 0];

function setup() {
  createCanvas(500, 500);
  background(255);

  // Set up cells
  cells = new Array(floor(width / w));
  for (let i = 0; i < cells.length; i++){ cells[i] = 0 }
  cells[floor(cells.length/2)] = 1;
}

function draw() {
  let nextgen = cells.slice();
  
  for (let i = 1; i < cells.length - 1; i++){
    if(cells[i] === 1){
      fill(0);
      square(i * w, generation * w, w);
    }

    let a = cells[i - 1];
    let b = cells[i];
    let c = cells[i + 1];

    nextgen[i] = rules(a, b, c);
  }

  cells = nextgen;
  generation++;
}

function rules(a, b, c){
  let s = "" + a + b + c;
  let index = parseInt(s, 2);
  return ruleset[7 - index];
}
