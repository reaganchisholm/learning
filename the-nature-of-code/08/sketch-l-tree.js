function setup() {
  createCanvas(640, 240);

  let rules = {
    F: "FF+[+F-F-F]-[-F+F+F]",
    P: "F[F]-F+F[--F]+F-F",
    L: "F--F--F--G"
  }
  lsystem = new LSystem("F", rules);
  turtle = new Turtle(4, radians(25));

  for (let i = 0; i < 4; i++){
    lsystem.generate();
  }
}

function draw() {
  background(255);
  translate(width / 2, height);
  turtle.render(lsystem.sentence);
  noLoop();
}

class Turtle {
  constructor(length, angle){
    this.length = length;
    this.angle = angle;
  }

  render(sentence){
    stroke(0);
    for(let i = 0; i < sentence.length; i++){
      let c = sentence.charAt(i);
      if(c === "F"){
        line(0,0,0, -this.length);
        translate(0, -this.length);
      } else if(c === "G"){
        translate(0, -this.length);
      } else if(c === "+"){
        rotate(this.angle);
      } else if(c === "-"){
        rotate(-this.angle);
      } else if(c === "["){
        push();
      } else if(c === "]"){
        pop();
      }
    }
  }
}

class LSystem {
  constructor(axiom, rules){
    this.sentence = axiom;
    this.ruleset = rules;
  }

  generate(){
    let nextgen = "";

    for (let i = 0; i < this.sentence.length; i++){
      let c = this.sentence.charAt(i);

      if(this.ruleset[c]){
        nextgen += this.ruleset[c];
      } else {
        nextgen += c;
      }
    }

    this.sentence = nextgen;
  }
}

