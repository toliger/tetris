import GameBoard from './GameBoard.js';

export default class Game {
  constructor() {
    this.tick();
  }

  tick() {
    (function t() {
      console.log('tick');
      setTimeout(t, 1000);
    })();
  }
}
