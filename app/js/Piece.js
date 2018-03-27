import * as aTools from './utils/ArrayUtils.js';

class Piece {
  constructor(x, y, color = '#d4f442') {
    this.shape = [];
    this.offset = 0;
    this.lcol = [];
    this.rcol = [];
    this.dcol = [];
    this.x = x;
    this.y = y;
    this.color = color;
    this.alpha = 1;
  }

  rotate() {
    this.offset = (this.offset + 1 > 3) ? 0 : this.offset + 1;
  }

  getRotated() {
    if (this.offset === 3) {
      return this.shape[0];
    }
    return this.shape[this.offset + 1];
  }

  moveLeft() {
    this.x -= 1;
  }

  moveRight() {
    this.x += 1;
  }

  moveDown() {
    this.y += 1;
  }

  decreaseAlpha(blindmode) {
    this.alpha = (blindmode && this.alpha - 0.07 >= 0) ? this.alpha - 0.07 : 0;
  }

  /*
   * Set the arrays lcol, rcol and dcol with the coordinates
   * of the blocks that need to be checked when moving
   * for each position (offset)
   */
  getCollideElements() {
    // iterate on each offset
    for (let i = 0; i < 4; i += 1) {
      const rarr = [];
      const larr = [];
      const darr = [];
      const mX = aTools.getMaxXFromArray(this.shape[i]);
      const mY = aTools.getMaxYFromArray(this.shape[i]);
      const minX = aTools.getMinXFromArray(this.shape[i]);
      const minY = aTools.getMinYFromArray(this.shape[i]);

      // Left - Right
      for (let j = minY; j <= mY; j += 1) {
        const tmp = this.shape[i].filter(elt => elt[1] === j);
        larr.push(aTools.getMinXPos(tmp));
        rarr.push(aTools.getMaxXPos(tmp));
      }
      this.lcol.push(larr);
      this.rcol.push(rarr);

      // Down
      for (let j = minX; j <= mX; j += 1) {
        const tmp = this.shape[i].filter(elt => elt[0] === j);

        darr.push(aTools.getMaxYPos(tmp));
      }
      this.dcol.push(darr);
    }
  }


  getCollisionBlocks(d) {
    switch (d) {
      case 'L': return (this.lcol[this.offset]);
      case 'R': return (this.rcol[this.offset]);
      case 'D': return (this.dcol[this.offset]);
      default: return ('BUGGG');
    }
  }
}

class T extends Piece {
  constructor(x, y) {
    super(x, y);
    this.initShapes();
    this.getCollideElements();
  }

  /*
   * x le + bas en premier
   * x le + haut en dernier
   * pour les tests de coordonnées
   */
  initShapes() {
    this.shape.push([[0, 1], [1, 1], [1, 0], [2, 1]]);
    this.shape.push([[1, 0], [1, 1], [1, 2], [2, 1]]);
    this.shape.push([[0, 1], [1, 1], [1, 2], [2, 1]]);
    this.shape.push([[0, 1], [1, 0], [1, 1], [1, 2]]);
  }
}

class L extends Piece {
  constructor(x, y) {
    super(x, y);
    this.initShapes();
    this.getCollideElements();
  }

  initShapes() {
    this.shape.push([[0, 1], [1, 1], [2, 1], [2, 0]]);
    this.shape.push([[1, 0], [1, 1], [1, 2], [2, 0]]);
    this.shape.push([[0, 1], [1, 1], [2, 1], [0, 2]]);
    this.shape.push([[0, 0], [1, 0], [1, 1], [1, 2]]);
  }
}

class J extends Piece {
  constructor(x, y) {
    super(x, y);
    this.initShapes();
    this.getCollideElements();
  }

  initShapes() {
    this.shape.push([[0, 0], [0, 1], [1, 1], [2, 1]]);
    this.shape.push([[1, 0], [1, 1], [1, 2], [2, 0]]);
    this.shape.push([[0, 1], [1, 1], [2, 1], [2, 2]]);
    this.shape.push([[1, 0], [1, 1], [1, 2], [0, 2]]);
  }
}

class Z extends Piece {
  constructor(x, y) {
    super(x, y);
    this.initShapes();
    this.getCollideElements();
  }

  initShapes() {
    this.shape.push([[0, 0], [1, 0], [1, 1], [2, 1]]);
    this.shape.push([[1, 1], [1, 2], [2, 0], [2, 1]]);
    this.shape.push([[0, 1], [1, 1], [1, 2], [2, 2]]);
    this.shape.push([[0, 1], [0, 2], [1, 0], [1, 1]]);
  }
}

class S extends Piece {
  constructor(x, y) {
    super(x, y);
    this.initShapes();
    this.getCollideElements();
  }

  initShapes() {
    this.shape.push([[0, 1], [1, 1], [1, 0], [2, 0]]);
    this.shape.push([[1, 0], [1, 1], [2, 1], [2, 2]]);
    this.shape.push([[0, 2], [1, 2], [1, 1], [2, 1]]);
    this.shape.push([[0, 0], [0, 1], [1, 1], [1, 2]]);
  }
}

class I extends Piece {
  constructor(x, y) {
    super(x, y);
    this.initShapes();
    this.getCollideElements();
  }

  initShapes() {
    this.shape.push([[0, 1], [1, 1], [2, 1], [3, 1]]);
    this.shape.push([[2, 0], [2, 1], [2, 2], [2, 3]]);
    this.shape.push([[0, 2], [1, 2], [2, 2], [3, 2]]);
    this.shape.push([[1, 0], [1, 1], [1, 2], [1, 3]]);
  }
}

class O extends Piece {
  constructor(x, y) {
    super(x, y);
    this.initShapes();
    this.getCollideElements();
  }

  initShapes() {
    this.shape.push([[0, 0], [0, 1], [1, 0], [1, 1]]); // haut
    this.shape.push([[0, 0], [0, 1], [1, 0], [1, 1]]); // droite
    this.shape.push([[0, 0], [0, 1], [1, 0], [1, 1]]); // bas
    this.shape.push([[0, 0], [0, 1], [1, 0], [1, 1]]); // gauche
  }
}

export { T, L, J, Z, S, I, O };
