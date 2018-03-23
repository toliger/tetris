class Piece {
  constructor(x, y, color = "#d4f442") {
    this.shape = [];
    this.offset = 0;
    this.lcol = [];
    this.rcol = [];
    this.dcol = [];
    this.x = x;
    this.y = y;
    this.color = color;
  }

  rotate() {
    if (++this.offset > 3)
      this.offset = 0;
  }

  undoRotate() {
    if (--this.offset < 0)
      this.offset = 3;
  }

  getRotated() {
    if (this.offset == 3) {
      return this.shape[0];
    } else {
      return this.shape[this.offset + 1];
    }
  }

  moveLeft() {
    this.x--;
  }

  moveRight() {
    this.x++;
  }

  moveDown() {
    this.y += 1;
  }

  //Return the maximal value of x from an array of coordinates
  getMaxXFromArray(a) {
    let m = 0;
    for(let i  =0; i < a.length; i++) {
      if (a[i][0] > m)
        m = a[i][0];
    }
    return m;
  }

  //Return the maximal value of y from an array of coordinates
  getMaxYFromArray(a) {
    let m = 0;
    for(let i = 0; i < a.length; i++) {
      if (a[i][1] > m)
        m = a[i][1];
    }
    return m;
  }

  //Return the couple of coordinates where x is maximal
  getMaxXPos(a) {
    let m = 0;
    let ind = 0;
    for(var i = 0; i < a.length; i++) {
      if (a[i][0] > m) {
        m = a[i][0];
        ind = i;
      }
    }
    return a[ind];
  }

  //Return the couple of coordinates where x is minimal
  getMinXPos(a) {
    let m = a[0][0];
    let ind = 0;
    for(var i = 0; i < a.length; i++) {
      if (a[i][0] < m) {
        m = a[i][0];
        ind = i;
      }
    }
    return a[ind];
  }

  //Return the couple of coordinates where y is maximal
  getMaxYPos(a) {
    let m = 0;
    let ind = 0;
    for(let i = 0; i < a.length; i++) {
      if (a[i][1] > m) {
        m = a[i][1];
        ind = i;
      }
    }
    return a[ind];
  }

  //Return the couple of coordinates where y is minimal
  getMinYPos(a) {
    let m = a[0][0];
    let ind = 0;
    for(let i = 0; i < a.length; i++) {
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
    //iterate on each offset
    for(let i = 0; i < 4; i++) {
      let rarr = [], larr = [], darr = [];
      let mX = this.getMaxXFromArray(this.shape[i]);
      let mY = this.getMaxYFromArray(this.shape[i]);

      //Left - Right
      for(let j = 0; j <= mY; j++) {
        let tmp = this.shape[i].filter((elt) => {
          return elt[1] == j;
        });
        larr.push(this.getMinXPos(tmp));
        rarr.push(this.getMaxXPos(tmp));

      }
      this.lcol.push(larr);
      this.rcol.push(rarr);

      //Down
      for(let j = 0; j <= mX; j++) {
        let tmp = this.shape[i].filter((elt) => {
          return elt[0] == j;
        });
        darr.push(this.getMaxYPos(tmp));
      }
      this.dcol.push(darr);
    }
  }

  /*
   * Return a promise with the array of coordinates of blocks
   * that need to be checked for the corresponding direction
   * and based on the current offset of the piece
   */
  getCollisionBlocks(d) {
    switch(d) {
      case 'L': return(this.lcol[this.offset]);
      case 'R': return(this.rcol[this.offset]);
      case 'D': return(this.dcol[this.offset]);
      default: return("BUGGG");
    }
  }

}

class T extends Piece {
  constructor(x,y) {
    super(x,y);
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
  constructor(x,y) {
    super(x,y);
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
  constructor(x,y) {
    super(x,y);
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
  constructor(x,y) {
    super(x,y);
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
  constructor(x,y) {
    super(x,y);
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
  constructor(x,y) {
    super(x,y);
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
  constructor(x,y) {
    super(x,y);
    this.initShapes();
    this.getCollideElements();
  }

  initShapes() {
    this.shape.push([[0, 0], [0, 1], [1, 0], [1, 1]]); //haut
    this.shape.push([[0, 0], [0, 1], [1, 0], [1, 1]]); //droite
    this.shape.push([[0, 0], [0, 1], [1, 0], [1, 1]]); //bas
    this.shape.push([[0, 0], [0, 1], [1, 0], [1, 1]]); //gauche
  }


}

export { T, L, J, Z, S, I, O }
