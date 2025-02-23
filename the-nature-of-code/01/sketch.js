class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.color = [0, 0, 0];
  }

  show() {
    stroke(...this.color);
    strokeWeight(3);
    point(this.x, this.y);
  }

  step() {
    let x = randomGaussian();
    let y = randomGaussian();

    this.color = [random() * 255, random() * 255, random() * 255];
    this.x = this.x + x;
    this.y = this.y + y;
  }
}

let walker;

function setup() {
  createCanvas(640, 240);
  walker = new Walker();
  background(255);
}

function draw() {
  walker.step();
  walker.show();
}