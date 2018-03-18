import GameBoard from './GameBoard.js';
import Music from './Music.js';
import SocketIO from './SocketIO.js';
import Chat from './Chat.js';

export default class Game {
  constructor() {
    this.gameBoard = new GameBoard();
    this.tick();
    this.startMusic();
    this.socket = new SocketIO();
    new Chat(this.socket);
  }

  startMusic() {
    new Music();
  }


  pieceController() {
    this.gameBoard.mvDown();
    this.gameBoard.update();
  }

  tick() {
    let _this = this;
    (function t() {
     _this.pieceController();
      setTimeout(t, 1000);
    })();
  }


}
