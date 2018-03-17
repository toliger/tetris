export default class Piece {
  constructor() {
    this.form = [];
    this.offset = 0;
    
  }

  rotate() {
    if (++this.offset > 3)
      this.offset = 0;
  }
}
