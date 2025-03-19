class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.xoff = 0;
    this.yoff = 0;
    this.ty = 0.0;
    this.tx = 1000.0;
  }

  show() {
    updatePixels();
    this.ty += random(-1, 1);
    this.tx += random(-1, 1);
  }

  step() {
    loadPixels();
    let xoff = this.tx;
    for (let x = 0; x <= width; x++) {
      let yoff = this.ty;
      for (let y = 0; y <= height; y++) {
        let bright = map(noise(xoff, yoff), 0, 1, 0, 255);

        let index = (x + y * width) * 4;
        pixels[index] = bright;
        pixels[index + 1] = bright;
        pixels[index + 2] = bright;
        pixels[index + 3] = 255;
        yoff += 0.01;
      }

      xoff += 0.01;
    }
  }
}

let walker;

function setup() {
  createCanvas(640, 640);
  walker = new Walker();
  background(255);

  saveCanvasInit();
}

function draw() {
  walker.step();
  walker.show();
}

function saveCanvasInit() {
  const btn = document.querySelector('[data-save]');

  btn.addEventListener('click', () => {
    saveCanvas();
  })
}