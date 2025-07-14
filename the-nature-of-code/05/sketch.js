let flock;
let grid;
let cols;
let rows;
let resolution = 40;

function setup() {
  createCanvas(500, 500);

  cols = floor(width/resolution);
  rows = floor(height/resolution);

  grid = new Array(cols);
  for( let i = 0; i < grid.length; i++){
    grid[i] = new Array(rows);
  }

  flock = new Flock();

  for(let i = 0; i < 500; i++){
    let boid = new Boid(width/2, height/2);
    flock.addBoid(boid);
  }
}

function draw() {
  background(230);


  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      grid[i][j] = [];
    }
  }

  for (let boid of flock.boids){
    let column = floor(boid.position.x / resolution);
    let row = floor(boid.position.y / resolution);
    column = constrain(column, 0, cols - 1);
    row = constrain(row, 0, rows - 1);
    grid[column][row].push(boid);
  }

  flock.run();
}
