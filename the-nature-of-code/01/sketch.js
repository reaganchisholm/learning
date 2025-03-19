let position;
let velocity;

function setup() {
    createCanvas(400, 400);

    position = createVector(100, 100);
    velocity = createVector(1, 3.3);
}

function draw() {
    background(255);

    let mouse = createVector(mouseX, mouseY);
    let center = createVector(width / 2, height / 2);
    mouse.sub(center);

    translate(width / 2, height / 2);
    stroke(200);
    strokeWeight(2);
    line(0, 0, mouse.x, mouse.y);

    mouse.normalize();
    mouse.mult(50);
    stroke(0);
    strokeWeight(8);
    line(0, 0, mouse.x, mouse.y);
}
