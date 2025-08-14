let grid, cols, rows;
let w = 10;

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

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      if (grid[i][j] === 1) {
        fill(0);
        square(j * w, height - (i * w), w);
      }
    }
  }

}

function rulesOfLife() {
  // Death: If a cell is alive (state = 1), it will die (state becomes 0) under the following circumstances:
  // --- Overpopulation: If the cell has four or more living neighbors, it dies.
  // --- Loneliness: If the cell has one or fewer living neighbors, it dies.

  // Birth: If a cell is dead (state = 0), it will come to life (state becomes 1) when it has exactly three living neighbors (no more, no less).

  // Stasis: In all other cases, the cell’s state doesn’t change. Two scenarios are possible:
  // --- Staying alive: If a cell is alive and has exactly two or three live neighbors, it stays alive.
  // --- Staying dead: If a cell is dead and has anything other than three live neighbors, it stays dead.
}
