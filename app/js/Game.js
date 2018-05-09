import GameBoard from './GameBoard.js';
import Music from './Music.js';
import SocketIO from './SocketIO.js';

export default class Game {
  constructor() {
    this.gameBoard = new GameBoard();

    this.multijoueur = JSON.parse(sessionStorage.settings.multiplayer);

    if (this.multijoueur) {
      this.gameBoard1 = new GameBoard('#mainBoard2');
    }
    this.drawLogo();
    this.socket = new SocketIO();
    this.difficulty = 0;
    this.current = false;
  }

  drawLogo() {
    this.gameBoard.clearBoard();
    this.gameBoard.drawWallGrind();
  }

  startgame() {
    if (!this.current) {
      this.current = true;
      if ($('#checkBlind').is(':checked')) {
        this.gameBoard.blindmode = true;
      }

      if ($('#checkBmode').is(':checked')) {
        this.gameBoard.bmode = true;
      }

      this.gameBoard.clearBoard();
      this.gameBoard.newPiece();

      // ========== Display updating
      this.gameBoard.update();
      this.tick();
      this.music = new Music();
      this.music.play();
    }
  }

  restartGame() {
    this.gameBoard.restartGame();
    this.gameBoard.current = true;
    this.startgame();
    this.tick();
  }

  pieceController() {
    this.gameBoard.mvDown();
    this.gameBoard.update();
  }

  tick() {
    const vthis = this;
    (function t() {
      if (vthis.gameBoard.current) {
        vthis.pieceController();
        setTimeout(t, 1000 / (1 + (vthis.difficulty * 2)));
      }
    }());
  }

}
