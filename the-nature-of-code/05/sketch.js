let vehicle;
let path; 

function setup() {
  createCanvas(1000, 1000);

  path = new Path();
  vehicle = new Vehicle(width/2, height/2);
}

function draw() {
  background(230);
  path.show();

  vehicle.update();
  vehicle.show();
  vehicle.follow(path);

  //vehicle.seek(createVector(mouseX, mouseY));
  //vehicle.arrive(createVector(mouseX, mouseY));
}
