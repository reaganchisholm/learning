const { Engine, Bodies, Composite, Body, Vector, Render } = Matter;
let boxes = [];
let boundaries = [];
let engine;


function setup() {
  let canvas = createCanvas(500, 500);
  engine = Engine.create();

  Matter.Events.on(engine, 'collisionStart', handleCollisions);

  boundaries.push(new Boundary(width / 4, height - 5, width / 2 - 50, 10));
  boundaries.push(new Boundary((3 * width) / 4, height - 50, width / 2 - 50, 10));
}

function draw() {
  background(255);

  Engine.update(engine);

  if(mouseIsPressed){
    let box = new Box(mouseX, mouseY);
    boxes.push(box);
  }

  // Iterate over the boxes backwards
  for (let i = boxes.length - 1; i >= 0; i--) {
    boxes[i].show();
    // Remove the Body from the world and the array
    if (boxes[i].checkEdge()) {
      boxes[i].removeBody();
      boxes.splice(i, 1);
    }
  }

  // Display all the boundaries
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }
}

function handleCollisions(event){
  for (let pair of event.pairs){
    let bodyA = pair.bodyA;
    let bodyB = pair.bodyB;

    let boxA = bodyA.plugin.box;
    let boxB = bodyB.plugin.box;

    if(boxA instanceof Box && boxB instanceof Box){
      // boxA.removeBody();
      // boxB.removeBody();
    }
  }
  
}


class Box {
  constructor(x, y) {
    this.w = 16;
    this.body = Bodies.rectangle(x, y, this.w, this.w);
    this.body.plugin.box = this;
    Composite.add(engine.world, this.body);
  }

  show() {
    let position = this.body.position;
    let angle = this.body.angle;

    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();

    translate(position.x, position.y);
    rotate(angle);

    square(0, 0, this.w);
    pop();
  }

  checkEdge() {
    return this.body.position.y > height + this.w;
  }

  removeBody() {
    Composite.remove(engine.world, this.body);
  }
}

class Boundary {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    let options = { isStatic: true };
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options);
    Composite.add(engine.world, this.body);
  }
  
  // Drawing the box
  show() {
    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);    
    rect(this.x, this.y, this.w, this.h);
  }
}
