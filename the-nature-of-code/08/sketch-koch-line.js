let segments = [];

function setup() {
  createCanvas(500, 500);
  background(255);

  let start = createVector(0, height/2);
  let end = createVector(width, height/2)
  segments.push(new KochLine(start, end));

  for (let i = 0; i < 5; i++){
    generate();
  }
}

function draw() {
  for(let segment of segments){
    segment.show()
  }
}

function generate(){
  let next = [];

  for(let segment of segments){
    const [a, b, c, d, e] = segment.kochPoints();
    next.push(new KochLine(a, b));
    next.push(new KochLine(b, c));
    next.push(new KochLine(c, d));
    next.push(new KochLine(d, e));
  }

  segments = next;
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

  kochPoints(){
    let a = this.start.copy();
    let e = this.end.copy();
    let v = p5.Vector.sub(this.end, this.start);
    v.div(3);
    let b = p5.Vector.add(a, v);
    let d = p5.Vector.add(b, v);
    v.rotate(-PI / 3);
    let c = p5.Vector.add(b, v);
    return [a, b, c, d, e];
  }
}
