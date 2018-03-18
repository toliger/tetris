import { T, L, J, Z, S, I, O } from './Piece.js';

export default class GameBoard {
  constructor(height = 700, width = 400) {
    this._piece = {};
    this.size = {
      real: { height, width },
      abstract: {
        height: 60,
        width: 20,
      },
    };
    console.log('plop', this.size);
    this.generate();
    this.position = {
      x: $("#map").position().top,
      y: $("#map").position().left,
    };
    console.log('pos', this.position);
    this.new_piece();
    this.draw_piece();
    //this.clearBoard();
  }

  new_piece() {
    this._piece = new T(8,0);
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

  checkLeftSide() {
    return (this._piece.x > (0 - this._piece.form[this._piece.offset][0][0]));
  }

  checkRightSide() {
    return (this._piece.x < (this.size.abstract.width - this._piece.form[this._piece.offset][3][0] - 1));
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

  rotate() {
      this._piece.rotate();
    if(this._piece.x < 0 || (this._piece.x + this._piece.form[this._piece.offset][3][0] >= this.size.abstract.width)) //temporaire
      this._piece.undoRotate();
  }

  draw_piece() {
    let p = this._piece;
    //console.log(p.form);
    this.ctx.fillStyle = "#FF0000";
    // this.ctx.fillRect(0,0,50,50);
    const f = p.offset;
    const Case = this.size.real.width / this.size.abstract.width;
    for (let i in p.form[f]) {
      //console.log(p.form[f][i])
      //console.log(this._piece.x);
      this.ctx.fillRect((p.form[f][i][0] + this._piece.x) * Case,(p.form[f][i][1] + this._piece.y) * Case, Case, Case);
    }
  }
}
