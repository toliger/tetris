import p1 from './js/pieces/p1.js';

export default class Map {
  constructor(height = 700, width = 400) {
    this.size = { height, width };
    console.log('plop', this.size);
    this.generate();
    this.drawPiece();
  }

  generate() {
    $('#mainBoard').css({
      width: this.size.width + 'px',
      height: this.size.height + 'px',
    })

    $('<canvas>').attr({
      id: 'map'
    }).css({
      width: this.size.width + 'px',
      height: this.size.height + 'px',
      border: `1px gray double`,
    }).appendTo('#mainBoard');

    let c = document.getElementById("map");
    c.width  = this.size.width;
    c.height = this.size.height;
    this.ctx = c.getContext("2d");

  }

  drawPiece() {
    let p = new p1();
    console.log(p.form);
    this.ctx.fillStyle = "#FF0000";
    // this.ctx.fillRect(0,0,50,50);
    const f = 0;
    for (let i in p.form[f]) {
      console.log(p.form[f][i])
      this.ctx.fillRect(p.form[f][i][0] * 50,p.form[f][i][1] * 50, 50, 50);
    }
  }
}
