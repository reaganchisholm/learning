let position;
let velocity;
let mover;

function setup() {
    createCanvas(400, 400);
    mover = new Mover();
}

function draw() {
    background(255, 255, 255, 0);
    mover.update();
    mover.checkEdges();
    mover.show();
}

class Mover {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.topSpeed = 3;
    }

    update() {
        let mouse = createVector(mouseX, mouseY);
        let dir = p5.Vector.sub(mouse, this.position);
        let distance = dir.mag(); // get distance before normalizing

        dir.normalize();

        let str = 1 / distance;
        dir.mult(str * 5);

        this.acceleration = dir;
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topSpeed);
        this.position.add(this.velocity);
    }

    show() {
        stroke(0);
        strokeWeight(2);
        fill(127);
        circle(this.position.x, this.position.y, 48);
    }

    checkEdges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }
}
