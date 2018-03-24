import { T, L, J, Z, S, I, O } from './Piece.js';
import Random from './utils/Random.js';
import ColorGeneration from './utils/ColorGeneration.js';
import Canvas from './Canvas.js';


export default class GameBoard extends Canvas {
  constructor(height = 700, width = 400) {
    super(height, width);

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
    this.pieces = [];
    this.map = this.generateMapArray();

    this.pieces.push(new L(8, 0));
    this.pieces.push(new S(8, 0));
    this.pieces.push(new Z(8, 0));
    this.pieces.push(new T(8, 0));
    this.pieces.push(new I(8, 0));
    this.pieces.push(new O(8, 0));
    this.pieces.push(new J(8, 0));

    //= ========= Canvas creation
    this.position = {
      x: $('#map').position().top,
      y: $('#map').position().left,
    };

    //= ========= New piece
    this.NewPiece();

    //= ========= Display updating
    this.update();
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


  // Draw the wall
  drawWall() {
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
  NewPiece() {
    this.piece.x = 8;
    this.piece.y = 0;
    this.piece = this.pieces[Random(0, 6)];
    this.piece.color = ColorGeneration();
  }


  // Get the coords of the piece from the GameBoard root
  getPos(a) {
    const res = [];
    for (let i = 0; i < a.length; i += 1) {
      res.push([this.piece.x + a[i][0], this.piece.y + a[i][1]]);
    }
    return res;
  }


  // Add the piece in the Wall Array
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
      if (this.map[blocks[i][1] + 1][blocks[i][0]][0] !==0) {
        return false;
      }
    }
    return true;
  }


  // Check if the piece can move to the right
  checkRightSide() {
    const blocks = this.getPos(this.piece.getCollisionBlocks('R'));
    for (const i in blocks) {
      if (this.map[blocks[i][1] + 1][blocks[i][0] + 2][0] !==0) {
        return false;
      }
    }
    return true;
  }


  // Check rotation
  checkRotate() {
    for (const i in next) {
      if (this.map[next[i][1] + 2][next[i][0] + 2] !==0) {
        return false;
      }
    }
    return true;
  }


  // Check if the piece can move to the bottom
  checkBottomSide() {
    const blocks = this.getPos(this.piece.getCollisionBlocks('D'));

    for (const i in blocks) {
      if (this.map[blocks[i][1] + 2][blocks[i][0] + 1] !==0) {
        this.addPieceToMap(this.getPos(this.piece.shape[this.piece.offset]));
        this.NewPiece();
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
    }
  }

  // Rotate the piece
  rotate() {
    if (this.checkRotate()) {
      this.piece.rotate();
    }
  }
}
