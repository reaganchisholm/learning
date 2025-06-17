class FlowField {
  constructor(){
    this.resolution = 10;
    this.cols = floor(width / this.resolution);
    this.rows = floor(height / this.resolution);

    this.field = new Array(this.cols);
    for (let i = 0; i < this.cols; i++){
      this.field[i] = new Array(this.rows);
    }

    for (let i = 0; i < this.cols; i++){
      for (let j = 0; j < this.rows; j++){
        this.field[i][j] = createVector(1, 0);
      }
    }
  }
}
