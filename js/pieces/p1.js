import Piece from './Piece.js';
/*
 * +++
 *  +
 */

export default class p1 extends Piece {
  constructor() {
    super();
    this.form = [];
    this.addform();
  }

  addform() {
    this.form.push([[0, 0], [1, 0], [2, 0], [1, 1]]);
    this.form.push([[0, 1], [1, 0], [1, 1], [2, 1]]);
    this.form.push([[2, 0], [1, 0], [1, 1], [3, 1]]);
    this.form.push([[0, 0], [1, 0], [1, 1], [2, 0]]);
  }
}
