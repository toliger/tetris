import p1 from './js/pieces/p1.js';

export default class Map {
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
    this.new_piece();
    this.draw_piece();
  }

  new_piece() {
    this._piece = {
      form: new p1(),
      position: {
        x: 8,
        y: 0,
      },
    };
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

  move_piece() {

  }

  draw_piece() {
    let p = this._piece.form;
    console.log(p.form);
    this.ctx.fillStyle = "#FF0000";
    // this.ctx.fillRect(0,0,50,50);
    const f = 0;
    const Case = this.size.real.width / this.size.abstract.width;
    for (let i in p.form[f]) {
      console.log(p.form[f][i])
      this.ctx.fillRect((p.form[f][i][0] + this._piece.position.x) * Case,(p.form[f][i][1] + this._piece.position.y) * Case, Case, Case);
    }
  }
}
