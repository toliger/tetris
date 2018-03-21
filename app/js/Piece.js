class Piece {
  constructor(x, y) {
    this.form = [];
    this.offset = 0;
    this.lcol = [];
    this.rcol = [];
    this.dcol = [];
    this.x = x;
    this.y = y;
  }

  rotate() {
    if (++this.offset > 3)
      this.offset = 0;
  }

  undoRotate() {
    if (--this.offset < 0)
      this.offset = 3;
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

  getMaxXFromArray(a) {
    let m = 0;
    for(let i  =0; i < a.length; i++) {
      if (a[i][0] > m)
        m = a[i][0];
    }
    return m;
  }

  getMaxYFromArray(a) {
    let m = 0;
    for(let i = 0; i < a.length; i++) {
      if (a[i][1] > m)
        m = a[i][1];
    }
    return m;
  }

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

  getCollideElements() {
    for(let i = 0; i < 4; i++) {
      let rarr = [], larr = [], darr = [];
      let mX = this.getMaxXFromArray(this.form[i]);
      let mY = this.getMaxYFromArray(this.form[i]);
      //Gauche - Droite
      for(let j = 0; j <= mY; j++) {
        let tmp = this.form[i].filter((elt) => {
          return elt[1] == j;
        });
        larr.push(this.getMinXPos(tmp));
        rarr.push(this.getMaxXPos(tmp)); 

      }
      this.lcol.push(larr);
      this.rcol.push(rarr);

      //Bas
      for(let j = 0; j <= mX; j++) {
        let tmp = this.form[i].filter((elt) => {
          return elt[0] == j;
        });
        darr.push(this.getMaxYPos(tmp)); 
      }
      this.dcol.push(darr);
    }
  }

  getCollisionBlocks(d) {
    return new Promise((resolve, reject) => {
      switch(d) {
        case 'L': resolve(this.lcol[this.offset]);
        case 'R': resolve(this.rcol[this.offset]);
        case 'D': resolve(this.dcol[this.offset]);
        default: reject("BUGGG");
      }
    });
  }  

}

class T extends Piece {
  constructor(x,y) {
    super(x,y);
    this.addform();
    this.getCollideElements();
  }

  /*
   * x le + bas en premier
   * x le + haut en dernier
   * pour les tests de coordonnées
   */
  addform() {
    this.form.push([[0, 0], [1, 0], [1, 1], [2, 0]]); //haut
    this.form.push([[0, 1], [1, 0], [1, 1], [1, 2]]); //droite
    this.form.push([[0, 1], [1, 1], [1, 0], [2, 1]]); //bas
    this.form.push([[1, 0], [1, 1], [1, 2], [2, 1]]); //gauche
  }

  
}

class L extends Piece {
  constructor(x,y) {
    super(x,y);
    this.addform();
    this.getCollideElements();
  }

  addform() {
    this.form.push([[0, 1], [0, 0], [1, 0], [2, 0]]); //haut
    this.form.push([[0, 0], [1, 0], [1, 1], [1, 2]]); //droite
    this.form.push([[0, 1], [1, 1], [2, 1], [2, 0]]); //bas
    this.form.push([[0, 0], [0, 1], [0, 2], [1, 2]]); //gauche
  }

  
}

class J extends Piece {
  constructor(x,y) {
    super(x,y);
    this.addform();
    this.getCollideElements();
  }

  addform() {
    this.form.push([[0, 0], [1, 0], [2, 0], [2, 1]]); //haut
    this.form.push([[0, 2], [1, 0], [1, 1], [1, 2]]); //droite
    this.form.push([[0, 0], [0, 1], [1, 1], [2, 1]]); //bas
    this.form.push([[0, 0], [0, 1], [0, 2], [1, 0]]); //gauche
  }

  
}

class Z extends Piece {
  constructor(x,y) {
    super(x,y);
    this.addform();
    this.getCollideElements();
  }

  addform() {
    this.form.push([[0, 0], [1, 0], [1, 1], [2, 1]]); //haut
    this.form.push([[0, 1], [0, 2], [1, 0], [1, 1]]); //droite
    this.form.push([[0, 0], [1, 0], [1, 1], [2, 1]]); //bas
    this.form.push([[0, 1], [0, 2], [1, 0], [1, 1]]); //gauche
  }

  
}

class S extends Piece {
  constructor(x,y) {
    super(x,y);
    this.addform();
    this.getCollideElements();
  }

  addform() {
    this.form.push([[0, 1], [1, 1], [1, 0], [2, 0]]); //haut
    this.form.push([[0, 0], [0, 1], [1, 1], [1, 2]]); //droite
    this.form.push([[0, 1], [1, 1], [1, 0], [2, 0]]); //bas
    this.form.push([[0, 0], [0, 1], [1, 1], [1, 2]]); //gauche
  }

  
}

class I extends Piece {
  constructor(x,y) {
    super(x,y);
    this.addform();
    this.getCollideElements();
  }

  addform() {
    this.form.push([[0, 0], [1, 0], [2, 0], [3, 0]]); //haut
    this.form.push([[0, 0], [0, 1], [0, 2], [0, 3]]); //droite
    this.form.push([[0, 0], [1, 0], [2, 0], [3, 0]]); //bas
    this.form.push([[0, 0], [0, 1], [0, 2], [0, 3]]); //gauche
  }

  
}

class O extends Piece {
  constructor(x,y) {
    super(x,y);
    this.addform();
    this.getCollideElements();
  }

  addform() {
    this.form.push([[0, 0], [0, 1], [1, 0], [1, 1]]); //haut
    this.form.push([[0, 0], [0, 1], [1, 0], [1, 1]]); //droite
    this.form.push([[0, 0], [0, 1], [1, 0], [1, 1]]); //bas
    this.form.push([[0, 0], [0, 1], [1, 0], [1, 1]]); //gauche
  }

  
}

export { T, L, J, Z, S, I, O }
