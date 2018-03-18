class Piece {
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
  
}

class T extends Piece {
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
  }

  addform() {
    this.form.push([[0, 0], [0, 1], [1, 0], [1, 1]]); //haut
    this.form.push([[0, 0], [0, 1], [1, 0], [1, 1]]); //droite
    this.form.push([[0, 0], [0, 1], [1, 0], [1, 1]]); //bas
    this.form.push([[0, 0], [0, 1], [1, 0], [1, 1]]); //gauche
  }
}

export { T, L, J, Z, S, I, O }
