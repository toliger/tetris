import Piece from './Piece.js';
/*
 * +++
 *  +
 */

export default class p1 extends Piece {
  constructor(x,y) {
    super(x,y);
    this.addform();
  }

  /*
   * x le + bas en premier
   * x le + haut en dernier
   * pour les tests de coordonnées
   */
  addform() {
    this.form.push([[0, 0], [1, 0], [1, 1], [2, 0]]);
    this.form.push([[0, 1], [1, 0], [1, 1], [1, 2]]);
    this.form.push([[0, 1], [1, 1], [1, 0], [2, 1]]);
    this.form.push([[1, 0], [1, 1], [1, 2], [2, 1]]);
  }
}
