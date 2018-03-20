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

  moveDown() {
    this.y += 1;
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

  getCollideVectors(d) {
    switch (this.offset) {
      case 0:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0],this.form[2]]);
            case 'D':
              resolve([this.form[3], this.form[2]]);
            case 'B':
              resolve([this.form[0],this.form[2],this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 1:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0],this.form[2],this.form[3]]);
            case 'D':
              resolve([this.form[1], this.form[2],this.form[3]]);
            case 'B':
              resolve([this.form[0],this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 2:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0],this.form[2]]);
            case 'D':
              resolve([this.form[3], this.form[2]]);
            case 'B':
              resolve([this.form[0],this.form[1],this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 3:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[1], this.form[2]]);
            case 'D':
              resolve([this.form[0], this.form[2], this.form[3]]);
            case 'B':
              resolve([this.form[2],this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
    }
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

  getCollideVectors(d) {
    switch (this.offset) {
      case 0:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0],this.form[1]]);
            case 'D':
              resolve([this.form[0], this.form[3]]);
            case 'B':
              resolve([this.form[0],this.form[2],this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 1:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0],this.form[2],this.form[3]]);
            case 'D':
              resolve([this.form[1], this.form[2],this.form[3]]);
            case 'B':
              resolve([this.form[0],this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 2:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0],this.form[3]]);
            case 'D':
              resolve([this.form[3], this.form[2]]);
            case 'B':
              resolve([this.form[0],this.form[1],this.form[2]]);
            default:
              reject('Echec critique');
          }
        });
      case 3:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[1], this.form[2]]);
            case 'D':
              resolve([this.form[0], this.form[1], this.form[3]]);
            case 'B':
              resolve([this.form[2],this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
    }
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

  getCollideVectors(d) {
    switch (this.offset) {
      case 0:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[3]]);
            case 'D':
              resolve([this.form[2], this.form[3]]);
            case 'B':
              resolve([this.form[0], this.form[1], this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 1:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[1], this.form[2]]);
            case 'D':
              resolve([this.form[1], this.form[2], this.form[3]]);
            case 'B':
              resolve([this.form[0], this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 2:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[1]]);
            case 'D':
              resolve([this.form[0], this.form[3]]);
            case 'B':
              resolve([this.form[1], this.form[2], this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 3:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[1], this.form[2]]);
            case 'D':
              resolve([this.form[1], this.form[2], this.form[3]]);
            case 'B':
              resolve([this.form[2],this.form[3]]);
            default:
              resolve('Echec critique');
          }
        });
    }
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

  getCollideVectors(d) {
    switch (this.offset) {
      case 0:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[2]]);
            case 'D':
              resolve([this.form[1], this.form[3]]);
            case 'B':
              resolve([this.form[0], this.form[2], this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 1:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[1], this.form[2]]);
            case 'D':
              resolve([this.form[1], this.form[2], this.form[3]]);
            case 'B':
              resolve([this.form[1], this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 2:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[2]]);
            case 'D':
              resolve([this.form[1], this.form[3]]);
            case 'B':
              resolve([this.form[0], this.form[2], this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 3:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[1], this.form[2]]);
            case 'D':
              resolve([this.form[1], this.form[2], this.form[3]]);
            case 'B':
              resolve([this.form[1],this.form[3]]);
            default:
              resolve('Echec critique');
          }
        });
    }
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

  getCollideVectors(d) {
    switch (this.offset) {
      case 0:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[2]]);
            case 'D':
              resolve([this.form[1], this.form[3]]);
            case 'B':
              resolve([this.form[0], this.form[1], this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 1:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[1], this.form[3]]);
            case 'D':
              resolve([this.form[0], this.form[2], this.form[3]]);
            case 'B':
              resolve([this.form[1], this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 2:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[2]]);
            case 'D':
              resolve([this.form[1], this.form[3]]);
            case 'B':
              resolve([this.form[0], this.form[1], this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 3:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[1], this.form[3]]);
            case 'D':
              resolve([this.form[0], this.form[2], this.form[3]]);
            case 'B':
              resolve([this.form[1],this.form[3]]);
            default:
              resolve('Echec critique');
          }
        });
    }
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

  getCollideVectors(d) {
    switch (this.offset) {
      case 0:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0]]);
            case 'D':
              resolve([this.form[3]]);
            case 'B':
              resolve([this.form[0], this.form[1], this.form[2], this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 1:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[1], this.form[2], this.form[3]]);
            case 'D':
              resolve([this.form[0], this.form[1], this.form[2], this.form[3]]);
            case 'B':
              resolve([this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 2:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[1], this.form[2]]);
            case 'D':
              resolve([this.form[1], this.form[2], this.form[3]]);
            case 'B':
              resolve([this.form[0], this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 3:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[1], this.form[2], this.form[3]]);
            case 'D':
              resolve([this.form[0], this.form[1], this.form[2], this.form[3]]);
            case 'B':
              resolve([this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
    }
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

  getCollideVectors(d) {
    switch (this.offset) {
      case 0:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[1]]);
            case 'D':
              resolve([this.form[2], this.form[3]]);
            case 'B':
              resolve([this.form[1], this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 1:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[1]]);
            case 'D':
              resolve([this.form[2], this.form[3]]);
            case 'B':
              resolve([this.form[1], this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 2:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[1]]);
            case 'D':
              resolve([this.form[2], this.form[3]]);
            case 'B':
              resolve([this.form[1], this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
      case 3:
        return new Promise((resolve, reject) => {
          switch (d) {
            case 'G':
              resolve([this.form[0], this.form[1]]);
            case 'D':
              resolve([this.form[2], this.form[3]]);
            case 'B':
              resolve([this.form[1], this.form[3]]);
            default:
              reject('Echec critique');
          }
        });
    }
  }
}

export { T, L, J, Z, S, I, O }
