class Path { 
  constructor(radius = 20){
    this.radius = radius;
    this.points = [];

    this.start = createVector(0, height/3);
    this.end = createVector(width, (2 * height) / 3);
  }

  addPoint(x, y){
    let pathPoint = createVector(x, y);
    this.points.push(pathPoint);
  }

  show(){
    stroke(200);
    strokeWeight(this.radius * 2);
    noFill();
    beginShape();
    for (let pathPoint of this.points){
      vertex(pathPoint.x, pathPoint.y);
    }
    endShape();
    stroke(0);
    strokeWeight(1);
    beginShape();
    for (let pathPoint of this.points){
      vertex(pathPoint.x, pathPoint.y);
    }
    endShape();
  }
}
