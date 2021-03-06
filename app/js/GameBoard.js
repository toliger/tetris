import { T, L, J, Z, S, I, O } from './Piece.js';
import Random from './utils/Random.js';
import { generateRandomHex } from './utils/ColorGeneration.js';
import ScoreBoard from './ScoreBoard.js';
import Canvas from './Canvas.js';
import Score from './Score.js';
import Rules from './Rules.js';
import AudioController from './AudioController.js';



export default class GameBoard extends Canvas {
  constructor(gameBoardName = 'mainBoard', boardNumber = 1, height = 700, width = 400) {
    super(height, width, gameBoardName);

    this.AudioController = new AudioController();

    this.gameBoardName = gameBoardName;
    this.number = boardNumber;

    this.score = new Score('Anonymous', boardNumber);

    this.scoreboard = new ScoreBoard();

    //= ========= Current piece
    this.piece = {};
    this.size = {
      real: { height, width },
      abstract: {
        height:22,
        width: 10,
      },
    };

    //= ========= Shapes Array
    let initpos = this.size.abstract.width / 2;
    this.pieces = [
      new L(initpos, 0),
      new S(initpos, 0),
      new Z(initpos, 0),
      new T(initpos, 0),
      new I(initpos, 0),
      new O(initpos, 0),
      new J(initpos, 0),
    ];
    this.map = this.generateMapArray();

    this.next_piece = {};
    this.next_piece = this.pieces[Random(0, 6)];
    this.next_piece.color = generateRandomHex();

    //= ========= Canvas creation
    this.position = {
      x: $(`#map${ this.gameBoardName }`).position().top,
      y: $(`#map${ this.gameBoardName }`).position().left,
    };

    this.rules = new Rules();
    this.rules.ingame = true;
    if(boardNumber == 1) {
      this.np_ctx = document.getElementById('nextPieceCnv').getContext('2d');
    } else {
      this.np_ctx = document.getElementById('nextPieceCnv2').getContext('2d');
    }
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
    let auxTab = [];
    for(let i = 0; i < this.size.abstract.width + 2; i += 1) {
      auxTab.push(1);
    }
    res.push(auxTab);
    for (let i = 0; i < this.size.abstract.height; i += 1) {
      let auxTab2 = [];
      for(let i = 0; i < this.size.abstract.width + 2; i += 1) {
        auxTab2.push((i == 0 || i == this.size.abstract.width + 1) ? 1 : 0);
      }
      res.push(auxTab2);
    }
    res.push(auxTab);
    return res;
  }

  modeb() {
    for (let i = Math.floor(this.size.abstract.height * 0.95); i < this.size.abstract.height + 1; i += 1) {
      for (let j = 1; j < this.size.abstract.width + 1; j += 1) {
        if(Random(1, 3) == 2) {
          this.map[i][j] = '#d4f442';
        }
      }
    }
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
    if (!this.rules.multiplayer) {
      this.scoreboard.add(this.score);
    }
  }

  drawGameWin() {
    this.clearBoard();
    this.ctx.fillStyle = '#42bf20';
    this.ctx.fillRect(0, 0, this.size.real.width, this.size.real.height);

    this.ctx.fillStyle = '#0fffe3';
    this.ctx.font = '80px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Game Win', this.size.real.width / 2, this.size.real.height / 2);
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
      const marginLeft = (p.shape[f][i][0] + 2) * CaseX;
      const marginTop = (p.shape[f][i][1] + 1) * CaseY;
      this.np_ctx.fillRect(marginLeft, marginTop, CaseX, CaseY);
    }
  }




  // Update display
  update() {
    if(this.rules.ingame) {
      this.clearBoard();
      this.drawWall();
      this.drawPiece();
    }
  }


  //= ========= Piece ==========


  // Generate new Piece
  newPiece() {
    this.AudioController.mplay('frou');
    this.piece.x = this.size.abstract.width / 2;
    this.piece.y = 0;
    this.piece = this.next_piece;
    this.next_piece = this.pieces[Random(0, 6)];
    if (!this.checkBehind()) {
      this.rules.ingame = false;
      this.drawGameOver();
      $('#start').toggleClass('active');
      $('#restartMulti').toggleClass('active');
      sessionStorage.whowin = this.number;
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
    this.AudioController.mplay('ptzzz');
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
    if(this.score.lines%2 == 0 && this.rules.difficulty < 9) {
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
