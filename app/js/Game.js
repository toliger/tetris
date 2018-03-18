import GameBoard from './GameBoard.js';

export default class Game {
  constructor() {
    this.gameBoard = new GameBoard();
    this.tick();
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
