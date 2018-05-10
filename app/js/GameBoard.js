import { T, L, J, Z, S, I, O } from './Piece.js';
import Random from './utils/Random.js';
import { generateRandomHex } from './utils/ColorGeneration.js';
import ScoreBoard from './ScoreBoard.js';
import Canvas from './Canvas.js';
import Score from './Score.js';
import Rules from './Rules.js';



export default class GameBoard extends Canvas {
  constructor(gameBoardName = 'mainBoard', boardNumber = 1, height = 700, width = 400) {
    super(height, width, gameBoardName);

    this.gameBoardName = gameBoardName;

    this.score = new Score('mouloud',boardNumber);

    this.scoreboard = new ScoreBoard();

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
    this.map = this.generateMapArray();
    this.next_piece = {};
    this.next_piece = this.pieces[Random(0, 6)];
    this.next_piece.color = generateRandomHex();

    //= ========= Canvas creation
    console.log(`#map${ this.gameBoardName }`);
    this.position = {
      x: $(`#map${ this.gameBoardName }`).position().top,
      y: $(`#map${ this.gameBoardName }`).position().left,
    };

    this.rules = new Rules();
    this.np_ctx = document.getElementById('nextPieceCnv').getContext('2d');
    this.np_size = {
      width: $('#nextPieceCnv').width(),
      height: $('#nextPieceCnv').height()
    }

    this.scoreboard.init();

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

  // Draw Wallgrind
  drawWallGrind() {
    this.ctx.fillStyle = '#f4c842';
    this.ctx.fillRect(0, 0, this.size.real.width, this.size.real.height);

    this.ctx.fillStyle = '#8c701c';
    this.ctx.font = '80px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Wall Grind', this.size.real.width / 2, this.size.real.height / 2);
  }

  drawGameOver() {
    this.clearBoard();
    this.ctx.fillStyle = '#f4c842';
    this.ctx.fillRect(0, 0, this.size.real.width, this.size.real.height);

    this.ctx.fillStyle = '#8c701c';
    this.ctx.font = '80px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Game Over', this.size.real.width / 2, this.size.real.height / 2);
    if(!this.rules.multiplayer) {
      this.scoreboard.add(this.score);
    }

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

    for (let i = 0; i < p.shape[f].length; i += 1) {
      const marginLeft = (p.shape[f][i][0] + this.piece.x) * CaseX;
      const marginTop = (p.shape[f][i][1] + this.piece.y) * CaseY;
      this.ctx.fillRect(marginLeft, marginTop, CaseX, CaseY);
    }
  }

  drawNextPiece() {
    const p = this.next_piece;
    this.np_ctx.fillStyle = this.next_piece.color;
    this.np_ctx.globalAlpha = 1;

    const f = 0;
    const CaseX = this.size.real.width / this.size.abstract.width;
    const CaseY = this.size.real.height / this.size.abstract.height;

    for (let i = 0; i < p.shape[f].length; i += 1) {
      const marginLeft = (p.shape[f][i][0] + 6) * CaseX;
      const marginTop = (p.shape[f][i][1] + 3) * CaseY;
      this.np_ctx.fillRect(marginLeft, marginTop, CaseX, CaseY);
    }
  }




  // Update display
  update() {
    if(sessionStorage.getItem('ingame')) {
      this.clearBoard();
      this.drawWall();
      this.drawPiece();
    }
  }


  //= ========= Piece ==========


  // Generate new Piece
  newPiece() {
    this.piece.x = 8;
    this.piece.y = 0;
    this.piece = this.next_piece;
    this.next_piece = this.pieces[Random(0, 6)];
    if (!this.checkBehind()) {
      sessionStorage.setItem('ingame', false);
      this.drawGameOver();
    } else {
      if (this.rules.randomColor) {
        this.piece.color = this.next_piece.color;
        this.next_piece.color = generateRandomHex();
      }

      this.piece.alpha = 1;
      this.np_ctx.clearRect(0, 0, this.np_size.width, this.np_size.height);
      this.drawNextPiece();
    }

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
    for (let i = 0; i < blocks.length; i += 1) {
      this.map[blocks[i][1] + 1][blocks[i][0] + 1] = [1, this.piece.color];
      this.checkLines(blocks[i][1] + 1);
    }
  }


  //= ========= Moves ==========


  checkBehind() {
    const blocks = this.getPos(this.piece.shape[this.piece.offset]);
    for (let i = 0; i < blocks.length; i += 1) {
      if (this.map[blocks[i][1] + 1][blocks[i][0] + 2] !== 0) {
        return false;
      }
    }
    return true;
  }

  // Check if the piece can move to the left
  checkLeftSide() {
    const blocks = this.getPos(this.piece.getCollisionBlocks('L'));
    for (let i = 0; i < blocks.length; i += 1) {
      if (this.map[blocks[i][1] + 1][blocks[i][0]] !== 0) {
        return false;
      }
    }
    return true;
  }


  // Check if the piece can move to the right
  checkRightSide() {
    const blocks = this.getPos(this.piece.getCollisionBlocks('R'));
    for (let i = 0; i < blocks.length; i += 1) {
      if (this.map[blocks[i][1] + 1][blocks[i][0] + 2] !== 0) {
        return false;
      }
    }
    return true;
  }


  // Check rotation
  checkRotate() {
    const next = this.getPos(this.piece.getRotated());

    for (let i = 0; i < next.length; i += 1) {
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
    for (let j = 0; j < this.map[i].length; j += 1) {
      if (this.map[i][j] === 0) {
        return;
      }
    }

    this.removeLine(i);
    this.score.lines += 1;

    if(this.score.lines%10 == 0) {
      this.rules.difficulty += 1;
      $("#diffspan").html(this.rules.difficulty);
    }
  }


  // Check if the piece can move to the bottom
  checkBottomSide() {
    const blocks = this.getPos(this.piece.getCollisionBlocks('D'));

    for (let i = 0; i < blocks.length; i += 1) {
      if (this.map[blocks[i][1] + 2][blocks[i][0] + 1] !== 0) {
        this.addPieceToMap(this.getPos(this.piece.shape[this.piece.offset]));
        this.score.score = (this.rules.blindmode) ? 2 : 1;
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
      this.piece.decreaseAlpha(this.rules.blindmode);
    }
  }

  bigMoveDown() {
    while (this.checkBottomSide()) {
      this.piece.moveDown();
      this.piece.decreaseAlpha(this.rules.blindmode);
    }
  }

  // Rotate the piece
  rotate() {
    if (this.checkRotate()) {
      this.piece.rotate();
    }
  }

  restartGame() {
    this.score.resetScore();
    this.map = this.generateMapArray();
    this.scoreboard.removeBoard();
  }

}
