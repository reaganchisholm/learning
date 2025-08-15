let grid, cols, rows;
let w = 5;

function setup() {
  createCanvas(500, 500);
  background(255);

  cols = floor(width / w);
  rows = floor(height / w);

  grid = new Array(cols);
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(255);

  let nextGen = create2DArray(cols, rows);

  for (let col = 1; col < grid.length - 1; col++) {
    for (let row = 1; row < grid[col].length - 1; row++) {
      if (grid[col][row] === 1) {
        fill(0);
        square(row * w, height - (col * w), w);
      }


      let aliveNeighbors = 0;

      for(let k = -1; k <= 1; k++){
        for(let l = -1; l <= 1; l++){
          aliveNeighbors += grid[col + k][row + l]
        }
      }

      let cell = grid[col][row];
      aliveNeighbors -= cell;
      nextGen[col][row] = rulesOfLife(cell, aliveNeighbors);
    }
  }

  grid = nextGen;

}

function rulesOfLife(cell, aliveNeighbors) {
  // Death: If a cell is alive (state = 1), it will die (state becomes 0) under the following circumstances:
  // --- Overpopulation: If the cell has four or more living neighbors, it dies.
  // --- Loneliness: If the cell has one or fewer living neighbors, it dies.
  if(cell === 1 && (aliveNeighbors <= 1 || aliveNeighbors >= 4)){
    return 0;
  }
   

  // Birth: If a cell is dead (state = 0), it will come to life (state becomes 1) when it has exactly three living neighbors (no more, no less).
  if(cell === 0 && aliveNeighbors === 3){
    return 1;
  }

  // Stasis: In all other cases, the cell’s state doesn’t change. Two scenarios are possible:
  // --- Staying alive: If a cell is alive and has exactly two or three live neighbors, it stays alive.
  // --- Staying dead: If a cell is dead and has anything other than three live neighbors, it stays dead.
  return cell;
}

function create2DArray(columns, rows){
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < rows; j++){
      arr[i][j] = 0;
    }
  }
  return arr;
}
