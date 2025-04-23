let mover;

function setup() {
  createCanvas(400, 400);

  r = height * 0;
  theta = 0;
}

function draw() {
  // background(220);
  translate(width / 2, height / 2);
  let position = p5.Vector.fromAngle(theta);
  position.mult(r);
  fill(0);
  stroke(0);
  circle(position.x, position.y, 12);
  theta += 0.02;
  r += 0.1;
}
