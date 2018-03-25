import GameBoard from './GameBoard.js';
import Music from './Music.js';
import SocketIO from './SocketIO.js';

export default class Game {
  constructor() {
    this.gameBoard = new GameBoard();
    this.tick();
    this.startMusic();
    this.socket = new SocketIO();
    this.difficulty = 0;
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
