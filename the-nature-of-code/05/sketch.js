let vehicle;
let flow;


function setup() {
  createCanvas(1000, 1000);

  flow = new FlowField(10);
  vehicle = new Vehicle(width/2, height/2);
}

function draw() {
  background(0);

  vehicle.update();
  vehicle.show();

  vehicle.follow(flow);
  vehicle.boundaries(5);

  // vehicle.seek(createVector(mouseX, mouseY));
  //vehicle.arrive(createVector(mouseX, mouseY));
}
