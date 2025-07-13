let vehicles;
let path; 

function setup() {
  createCanvas(1000, 1000);
  newPath();

  vehicles = [];
  for(let i = 0; i < 20; i++){
    vehicles.push(new Vehicle(random(width), random(height)));
  }
}

function draw() {
  background(230);

  path.show();

  for (let vehicle of vehicles){
    vehicle.separate(vehicles);

    vehicle.follow(path);
    vehicle.run();
    vehicle.borders(path);
  }
}

function newPath(){
  path = new Path();
  path.addPoint(-20, height / 2);
  path.addPoint(random(0, width/2), random(0, height));
  path.addPoint(random(width/2, width), random(0, height));
  path.addPoint(width + 20, height / 2);
}
