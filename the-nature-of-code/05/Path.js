class Path { 
  constructor(){
    this.radius = 20;

    this.start = createVector(0, height/3);
    this.end = createVector(width, (2 * height) / 3);
  }

  show(){
    strokeWeight(this.radius * 2);
    stroke(0, 100);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
    strokeWeight(1);
    stroke(0); 
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}
