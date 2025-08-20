function setup() { // Built in loop function for p5.js, runs at start
  createCanvas(500, 500); // Creates canvas
  background(255); // Sets background as white
  translate(width/2, height); // Set our translation point to the bottom of our tree, aka middle bottom. This makes it easier for us to rotate for our branches
  branch(height*0.3, 20) // Start tree trunk at 30% of height
}

function branch(len, sw){
  let angle = random(0, PI/3);
  strokeWeight(sw);
  line(0, 0, 0, -len); // Create line at origin
  translate(0, -len); // moving the translation point
  len *= 0.67; // scaling our length
  sw *= 0.67;

  if(len > 2){
    push();
    rotate(angle);
    branch(len, sw);
    pop();
    push();
    rotate(-angle);
    branch(len, sw);
    pop();
  }
}
