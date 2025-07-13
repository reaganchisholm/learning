let vehicle;
let path; 

function setup() {
  createCanvas(1000, 1000);
  newPath();
  vehicle = new Vehicle(random(0, width), random(0, height));
}

function draw() {
  background(230);

  path.show();
  vehicle.follow(path);
  vehicle.run();

  vehicle.borders(path);

  //vehicle.seek(createVector(mouseX, mouseY));
  //vehicle.arrive(createVector(mouseX, mouseY));
}

function newPath(){
  path = new Path();
  path.addPoint(-20, height / 2);
  path.addPoint(random(0, width/2), random(0, height));
  path.addPoint(random(width/2, width), random(0, height));
  path.addPoint(width + 20, height / 2);
}
