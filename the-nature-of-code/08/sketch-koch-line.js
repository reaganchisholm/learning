let segments = [];

function setup() {
  createCanvas(500, 500);
  background(255);

  let start = createVector(0, height/2);
  let end = createVector(width, height/2)
  segments.push(new KochLine(start, end));
}

function draw() {
  for(let segment of segments){
    segment.show()
  }
}

function generate(){
}

class KochLine {
  constructor(a, b){
    this.start = a.copy();
    this.end = b.copy();
  }

  show(){
    stroke(0);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}
