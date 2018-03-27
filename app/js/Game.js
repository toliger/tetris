import GameBoard from './GameBoard.js';
import Music from './Music.js';
import SocketIO from './SocketIO.js';

export default class Game {
  constructor() {
    this.gameBoard = new GameBoard();
    this.drawLogo();
    this.socket = new SocketIO();
    this.difficulty = 0;
  }

  drawLogo() {
    this.gameBoard.clearBoard();
    this.gameBoard.drawWallGrind();
  }

  startgame() {
    if ($('#checkBlind').is(':checked')) { this.gameBoard.blindmode = true; }
    if ($('#checkBmode').is(':checked')) { this.gameBoard.bmode = true; }
    this.gameBoard.clearBoard();
    this.gameBoard.newPiece();

    // ========== Display updating
    this.gameBoard.update();
    this.tick();
    this.musique = new Musique();
    this.musique.play();
  }

  pieceController() {
    this.gameBoard.mvDown();
    this.gameBoard.update();
  }

  tick() {
    const vthis = this;
    (function t() {
      vthis.pieceController();
      setTimeout(t, 1000 / (1 + (vthis.difficulty * 2)));
    }());
  }
}
