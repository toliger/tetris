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
    this.alpha = (this.alpha - 0.1 >= 0 && blindmode) ? this.alpha - 0.1 : this.alpha;
  }
  // Return the maximal value of x from an array of coordinates
  static getMaxXFromArray(a) {
    let m = 0;
    for (let i = 0; i < a.length; i += 1) {
      if (a[i][0] > m) { m = a[i][0]; }
    }
    return m;
  }

  // Return the minimal value of x from an array of coordinates
  static getMinXFromArray(a) {
    let m = a[0][0];
    for (let i = 0; i < a.length; i += 1) {
      if (a[i][0] < m) { m = a[i][0]; }
    }
    return m;
  }

  // Return the maximal value of y from an array of coordinates
  static getMaxYFromArray(a) {
    let m = 0;
    for (let i = 0; i < a.length; i += 1) {
      if (a[i][1] > m) { m = a[i][1]; }
    }
    return m;
  }

  // Return the minimal value of y from an array of coordinates
  static getMinYFromArray(a) {
    let m = a[0][1];
    for (let i = 0; i < a.length; i += 1) {
      if (a[i][1] < m) { m = a[i][1]; }
    }
    return m;
  }

  // Return the couple of coordinates where x is maximal
  static getMaxXPos(a) {
    let m = 0;
    let ind = 0;
    for (let i = 0; i < a.length; i += 1) {
      if (a[i][0] > m) {
        m = a[i][0];
        ind = i;
      }
    }
    return a[ind];
  }

  // Return the couple of coordinates where x is minimal
  static getMinXPos(a) {
    let m = a[0][0];
    let ind = 0;
    for (let i = 0; i < a.length; i += 1) {
      if (a[i][0] < m) {
        m = a[i][0];
        ind = i;
      }
    }
    return a[ind];
  }

  // Return the couple of coordinates where y is maximal
  static getMaxYPos(a) {
    let m = 0;
    let ind = 0;
    for (let i = 0; i < a.length; i += 1) {
      if (a[i][1] > m) {
        m = a[i][1];
        ind = i;
      }
    }
    return a[ind];
  }

  // Return the couple of coordinates where y is minimal
  static getMinYPos(a) {
    let m = a[0][1];
    let ind = 0;
    for (let i = 0; i < a.length; i += 1) {
      if (a[i][1] < m) {
        m = a[i][1];
        ind = i;
      }
    }
    return a[ind];
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
      const mX = this.getMaxXFromArray(this.shape[i]);
      const mY = this.getMaxYFromArray(this.shape[i]);
      const minX = this.getMinXFromArray(this.shape[i]);
      const minY = this.getMinYFromArray(this.shape[i]);

      // Left - Right
      for (let j = minY; j <= mY; j += 1) {
        const tmp = this.shape[i].filter(elt => elt[1] === j);
        larr.push(this.getMinXPos(tmp));
        rarr.push(this.getMaxXPos(tmp));
      }
      this.lcol.push(larr);
      this.rcol.push(rarr);

      // Down
      for (let j = minX; j <= mX; j += 1) {
        const tmp = this.shape[i].filter(elt => elt[0] === j);

        darr.push(this.getMaxYPos(tmp));
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
