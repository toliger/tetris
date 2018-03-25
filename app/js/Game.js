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
    this.gameBoard.clearBoard();
    this.gameBoard.newPiece();

    //========== Display updating
    this.gameBoard.update();
    this.tick();
    this.startMusic();
  }

  startMusic() {
    const music = new Music();
    music.play();
  }


  pieceController() {
    this.gameBoard.mvDown();
    this.gameBoard.update();
  }

  tick() {
    const vthis = this;
    (function t() {
      vthis.pieceController();
      setTimeout(t, 1000 / (1 + vthis.difficulty * 2));
    }());
  }
}
