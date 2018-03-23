import { T, L, J, Z, S, I, O } from './Piece.js';

export default class GameBoard {
  constructor(height = 700, width = 400) {
    this._piece = {};
    this.size = {
      real: { height, width },
      abstract: {
        height: 33,
        width: 20,
      },
    };

    this.map = this.generateMapArray();
    //console.log('plop', this.size);
    this.generate();
    this.position = {
      x: $("#map").position().top,
      y: $("#map").position().left,
    };
    //console.log('pos', this.position);
    this.new_piece();
    this.update();
  }

  update() {
    this.clearBoard();
    this.draw_piece();
  }

  new_piece() {
    this._piece = new L(8,0);
  }

  set Piece(value) {
    this.__piece = value;
  }

  get Piece() {
    return this.__piece;
  }


  generate() {
    $('#mainBoard').css({
      width: this.size.real.width + 'px',
      height: this.size.real.height + 'px',
    })

    $('<canvas>').attr({
      id: 'map'
    }).css({
      width: this.size.real.width + 'px',
      height: this.size.real.height + 'px',
      border: `1px gray double`,
    }).appendTo('#mainBoard');

    let c = document.getElementById("map");
    c.width  = this.size.real.width;
    c.height = this.size.real.height;
    this.ctx = c.getContext("2d");

  }

  
  generateMapArray() {
    let res = [];
      res.push([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
    for(let i = 0; i < this.size.abstract.height; i++) {
      // size = abstract.width + 2
      res.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]);
    }
    res.push([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
    return res;
  }
  


  checkLeftSide() {
    const blocks = this.getPos(this._piece.getCollisionBlocks('L'));
    for (let i in blocks) {
      if (this.map[blocks[i][1]][blocks[i][0]] == 1) {
        return false;
      }
    }
    return true;
  }


  checkRightSide() {
    const blocks = this.getPos(this._piece.getCollisionBlocks('R'));
    for (let i in blocks) {
      if (this.map[blocks[i][1]][blocks[i][0] + 2] == 1) {
        return false;
      }
    }
    return true;
  }

  checkRotate() {
    const next = this.getPos(this._piece.getRotated());
    //console.log(next);
    for (let i in next) {
      //console.log(this.map[next[i][1]+2][next[i][0]]);
      if (this.map[next[i][1]+2][next[i][0] +2] == 1) {
        return false;
      }
    }
    return true;
  }

  getPos(a) {
    let res = [];
    for (let i = 0; i < a.length; i++) {
      res.push([this._piece.x + a[i][0], this._piece.y + a[i][1]])
    }
    return res;
  }

  checkBottomSide() {
    const blocks = this.getPos(this._piece.getCollisionBlocks('D'));
    //console.log(blocks);
    for (let i in blocks) {
      //console.log(this.map[blocks[i][1] +1]);
      if (this.map[blocks[i][1]+2][blocks[i][0]] == 1) {
        return false;
      }
    }
    return true;
  }


  clearBoard() {
    this.ctx.clearRect(
      0,
      0,
      this.size.real.width,
      this.size.real.height
    );
  }

  update() {
    this.clearBoard();
    this.draw_piece();
  }

  mvLeft() {
    if (this.checkLeftSide())
      this._piece.moveLeft();
  }

  mvRight() {
    if (this.checkRightSide())
      this._piece.moveRight();
  }

  mvDown() {
    if (this.checkBottomSide())
      this._piece.moveDown();
  }

  rotate() {
      if(this.checkRotate()) {
        this._piece.rotate();
      }
  }

  /*
   * Debug function tied to the 'h' key
   */
  printInfo() {
    console.log('test');
  }

  draw_piece() {
    let p = this._piece;
    //console.log(p.shape);
    this.ctx.fillStyle = "#FF0000";
    // this.ctx.fillRect(0,0,50,50);
    const f = p.offset;
    const CaseX = this.size.real.width / this.size.abstract.width;
    const CaseY = this.size.real.height / this.size.abstract.height;
    for (let i in p.shape[f]) {
      //console.log(p.shape[f][i])
      //console.log(this._piece.x);
      this.ctx.fillRect((p.shape[f][i][0] + this._piece.x) * CaseX,(p.shape[f][i][1] + this._piece.y) * CaseY, CaseX, CaseY);
    }
  }
}
