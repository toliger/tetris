import { T, L, J, Z, S, I, O } from './Piece.js';
import Random from './utils/Random.js';
import { generateRandomHex, generateRandomRgba, rgbaToHex, decreaseOpacity } from './utils/ColorGeneration.js';
import Canvas from './Canvas.js';
import Score from './Score.js';


export default class GameBoard extends Canvas {
  constructor(height = 700, width = 400) {
    super(height, width);

    this.score = new Score();
    //= ========= Current piece
    this.piece = {};
    this.size = {
      real: { height, width },
      abstract: {
        height: 33,
        width: 20,
      },
    };

    //= ========= Shapes Array
    this.pieces = [
      new L(8, 0),
      new S(8, 0),
      new Z(8, 0),
      new T(8, 0),
      new I(8, 0),
      new O(8, 0),
      new J(8, 0),
    ];
    this.map = this.generateMapArrayDebug();

    //= ========= Canvas creation
    this.position = {
      x: $('#map').position().top,
      y: $('#map').position().left,
    };

    //= ========= Game options
    this.blindmode = false; // blind mode
    this.bmode = false; // B mode
    this.level = 0; // difficulty
  }


  //= ========= Initialisation ==========


  // Generate map array
  generateMapArray() {
    // width + 2 -> Border of GameBoard
    const res = [];
    res.push([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    for (let i = 0; i < this.size.abstract.height; i += 1) {
      res.push([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
    }
    res.push([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    return res;
  }

  // Debug function : create an almost completed line
  generateMapArrayDebug() {
    // width + 2 -> Border of GameBoard
    const res = [];
    res.push([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    for (let i = 0; i < this.size.abstract.height - 1; i += 1) {
      res.push([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
    }
    res.push([1, [1, '#000000'], 0, 0, 0, [1, '#000000'], [1, '#000000'], [1, '#000000'], [1, '#000000'], [1, '#000000'], [1, '#000000'], [1, '#000000'], [1, '#000000'], [1, '#000000'], [1, '#000000'], [1, '#000000'], [1, '#000000'], [1, '#000000'], [1, '#000000'], [1, '#000000'], [1, '#000000'], 1]);
    res.push([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    return res;
  }


  //= ========= Canvas painting ==========


  // Clear the GameBoard
  clearBoard() {
    this.ctx.clearRect(
      0,
      0,
      this.size.real.width,
      this.size.real.height,
    );
  }

  // Draw Wallgrind
  drawWallGrind() {
    this.ctx.fillStyle = '#f4c842';
    this.ctx.fillRect(0, 0, this.size.real.width, this.size.real.height);

    this.ctx.fillStyle = '#8c701c';
    this.ctx.font = '80px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Wall Grind', this.size.real.width / 2, this.size.real.height / 2);
  }


  // Draw the wall
  drawWall() {
    this.ctx.globalAlpha = 1;
    for (let i = 1; i < this.size.abstract.height + 1; i += 1) {
      for (let j = 1; j < this.size.abstract.width + 1; j += 1) {
        const pixel = this.map[i][j];
        if (pixel !== 0) {
          this.ctx.fillStyle = pixel[1];
          const CaseX = this.size.real.width / this.size.abstract.width;
          const CaseY = this.size.real.height / this.size.abstract.height;
          this.ctx.fillRect((j - 1) * CaseX, (i - 1) * CaseY, CaseX, CaseY);
        }
      }
    }
  }


  // Draw the Piece
  drawPiece() {
    const p = this.piece;
    this.ctx.fillStyle = this.piece.color;
    this.ctx.globalAlpha = this.piece.alpha;

    const f = p.offset;
    const CaseX = this.size.real.width / this.size.abstract.width;
    const CaseY = this.size.real.height / this.size.abstract.height;

    for (const i in p.shape[f]) {
      this.ctx.fillRect((p.shape[f][i][0] + this.piece.x) * CaseX, (p.shape[f][i][1] + this.piece.y) * CaseY, CaseX, CaseY);
    }
  }


  // Update display
  update() {
    this.clearBoard();
    this.drawWall();
    this.drawPiece();
  }


  //= ========= Piece ==========


  // Generate new Piece
  newPiece() {
    this.piece.x = 8;
    this.piece.y = 0;
    this.piece = this.pieces[Random(0, 6)];
    this.piece.color = generateRandomHex();
    this.piece.alpha = 1;
  }


  // Get the coords of the piece from the GameBoard root
  getPos(a) {
    const res = [];
    for (let i = 0; i < a.length; i += 1) {
      res.push([this.piece.x + a[i][0], this.piece.y + a[i][1]]);
    }
    return res;
  }


  // Add the piece to the Wall Array
  addPieceToMap(blocks) {
    for (const i in blocks) {
      this.map[blocks[i][1] + 1][blocks[i][0] + 1] = [1, this.piece.color];
    }
  }


  //= ========= Moves ==========


  // Check if the piece can move to the left
  checkLeftSide() {
    const blocks = this.getPos(this.piece.getCollisionBlocks('L'));
    for (const i in blocks) {
      if (this.map[blocks[i][1] + 1][blocks[i][0]] !== 0) {
        return false;
      }
    }
    return true;
  }


  // Check if the piece can move to the right
  checkRightSide() {
    const blocks = this.getPos(this.piece.getCollisionBlocks('R'));
    for (const i in blocks) {
      if (this.map[blocks[i][1] + 1][blocks[i][0] + 2] !== 0) {
        return false;
      }
    }
    return true;
  }


  // Check rotation
  checkRotate() {
    const next = this.getPos(this.piece.getRotated());

    for (const i in next) {
      if (this.map[next[i][1] + 1][next[i][0] + 1] !== 0) {
        return false;
      }
    }
    return true;
  }


  // Remove a line
  removeLine(l) {
    // remove the line l
    this.map.splice(l, 1);
    // add a new "empty" line to the array
    this.map.splice(1, 0, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
  }


  // Check if the line is full
  checkLines(i) {
    for (const j in this.map[i]) {
      if (this.map[i][j] === 0) {
        return;
      }
    }

    this.removeLine(i);
    this.score.lines += 1;
  }


  // Check if the piece can move to the bottom
  checkBottomSide() {
    const blocks = this.getPos(this.piece.getCollisionBlocks('D'));

    for (const i in blocks) {
      if (this.map[blocks[i][1] + 2][blocks[i][0] + 1] !== 0) {
        this.addPieceToMap(this.getPos(this.piece.shape[this.piece.offset]));
        this.checkLines(blocks[i][1] + 1);
        this.score.score = (this.blindmode) ? 2 : 1;
        this.newPiece();
        return false;
      }
    }
    return true;
  }


  // Move the piece to the Left
  mvLeft() {
    if (this.checkLeftSide()) {
      this.piece.moveLeft();
    }
  }


  // Move the piece to the Right
  mvRight() {
    if (this.checkRightSide()) {
      this.piece.moveRight();
    }
  }


  // Move the piece to the Down
  mvDown() {
    if (this.checkBottomSide()) {
      this.piece.moveDown();
      this.piece.decreaseAlpha(this.blindmode);

    }
  }

  // Rotate the piece
  rotate() {
    if (this.checkRotate()) {
      this.piece.rotate();
    }
  }
}
