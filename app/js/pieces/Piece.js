export default class Piece {
  constructor(x, y) {
    this.form = [];
    this.offset = 0;
    this.x = x;
    this.y = y;
  }

  rotate() {
    if (++this.offset > 3)
      this.offset = 0;
  }

  moveLeft() {
    this.x--;
  }

  moveRight() {
    this.x++;
  }
  
}
