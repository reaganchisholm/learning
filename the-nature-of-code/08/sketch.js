function setup() {
  createCanvas(500, 500);
  background(255);
}

function draw() {
  // drawCircles(width / 2, height / 2, width / 2)
  // squares(width / 2, height / 2, width / 2)
  // cantor(10, 20, width - 20);
  createLine(100, height / 2, width - 100, height / 2);
}

function drawCircles(x, y, radius) {
  stroke(0);
  noFill();
  circle(x, y, radius * 2);

  if (radius > 16) {
    drawCircles(x + radius / 2, y, radius / 2);
    drawCircles(x - radius / 2, y, radius / 2);
    drawCircles(x, y + radius / 2, radius / 2);
    drawCircles(x, y - radius / 2, radius / 2);
  }
}

function cantor(x, y, length) {
  if (length > 1) {
    line(x, y, x + length, y);
    cantor(x, y + 20, length / 3);
    cantor(x + (2 * length / 3), y + 20, length / 3);
  }
}

function createLine(x, y, x2, y2) {
  line(x, y, x2, y2);

  let dx = x2 - x;
  let dy = y2 - y;

  if (dx == 0 && dy > 4) {
    createLine(x - dy / 3, y, x + dy / 3, y);
    createLine(x - dy / 3, y2, x + dy / 3, y);
  } else if (dy == 0 && dx > 4) {
    createLine(x, y - dx / 3, x, y + dx / 3);
    createLine(x2, y - dx / 3, x2, y + dx / 3);
  }
}
