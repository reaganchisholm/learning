let vehicle;
let path; 

function setup() {
  createCanvas(1000, 1000);

  path = new Path(10);
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
