import { T, L, J, Z, S, I, O } from './Piece.js';
import Random from './Random.js';
import DecToHex from './DecToHex.js';

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

    this.pieces = [];
    this.map = this.generateMapArray();
    this.generate();
    this.position = {
      x: $("#map").position().top,
      y: $("#map").position().left,
    };

    this.pieces.push(new L(8,0));
    this.pieces.push(new S(8,0));
    this.pieces.push(new Z(8,0));
    this.pieces.push(new T(8,0));
    this.pieces.push(new I(8,0));
    this.pieces.push(new O(8,0));
    this.pieces.push(new J(8,0));

    this.new_piece();
    this.update();
  }


  drawWall() {
    for (let i = 1; i < this.size.abstract.height + 1; i++) {
      for (let j = 1; j < this.size.abstract.width + 1; j++) {
        let pixel = this.map[i][j];
        if (pixel != 0) {
          this.ctx.fillStyle = pixel[1];
          const CaseX = this.size.real.width / this.size.abstract.width;
          const CaseY = this.size.real.height / this.size.abstract.height;
          this.ctx.fillRect((j-1) * CaseX, (i-1) * CaseY, CaseX, CaseY);
        }
      }
    }
  }

  update() {
    this.clearBoard();
    this.drawWall();
    this.drawPiece();
  }

  color_generator(){
    let color = "";
    for (let i = 0; i < 6; i += 1) {
      color += DecToHex(Random(1, 16));
    }
    return color;
  }
  new_piece() {
    this._piece.x = 8;
    this._piece.y = 0;
    this._piece = this.pieces[Random(0,6)];
    this._piece.color = `#${this.color_generator()}`;
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
      if (this.map[blocks[i][1]+1][blocks[i][0]] == 1) {
        return false;
      }
    }
    return true;
  }


  checkRightSide() {
    const blocks = this.getPos(this._piece.getCollisionBlocks('R'));
    for (let i in blocks) {
      if (this.map[blocks[i][1]+1][blocks[i][0] + 2] == 1) {
        return false;
      }
    }
    return true;
  }

  checkRotate() {
    for (let i in next) {
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
      if (this.map[blocks[i][1] + 2][blocks[i][0] + 1] != 0) {
        this.addPieceToMap(this.getPos(this._piece.shape[this._piece.offset]));
        this.new_piece();
        return false;
      }
    }
    return true;
  }

  addPieceToMap(blocks) {
    for (let i in blocks) {
      this.map[blocks[i][1]+1][blocks[i][0]+1] = [1, this._piece.color];
    }
  }


  clearBoard() {
    this.ctx.clearRect(
      0,
      0,
      this.size.real.width,
      this.size.real.height
    );
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
    console.log(this.map);
  }


  drawPiece() {
    let p = this._piece;

    this.ctx.fillStyle = this._piece.color;

    const f = p.offset;
    const CaseX = this.size.real.width / this.size.abstract.width;
    const CaseY = this.size.real.height / this.size.abstract.height;
    for (let i in p.shape[f]) {
      this.ctx.fillRect((p.shape[f][i][0] + this._piece.x) * CaseX,(p.shape[f][i][1] + this._piece.y) * CaseY, CaseX, CaseY);
    }
  }
}
