let position;
let velocity;
let mover;

function setup() {
    createCanvas(400, 400);
    mover = new Mover();
}

function draw() {
    background(255, 255, 255, 0.99);
    mover.update();
    mover.checkEdges();
    mover.show();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        mover.acceleration.y -= 1;
    } else if (keyCode === DOWN_ARROW) {
        mover.acceleration.y += 1;
    } else if (keyCode === LEFT_ARROW) {
        mover.acceleration.x -= 1;
    } else if (keyCode === RIGHT_ARROW) {
        mover.acceleration.x += 1;
    }

    if (keyCode === ENTER) {
        mover.acceleration.x = 0;
        mover.acceleration.y = 0;
        mover.velocity.x = 0;
        mover.velocity.y = 0;
    }

    return false;
}

class Mover {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.topSpeed = 10;
    }

    update() {
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
