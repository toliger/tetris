import GameBoard from './GameBoard.js';
import Music from './Music.js';
import SocketIO from './SocketIO.js';

export default class Game {
  constructor() {
    this.gameBoard = new GameBoard();

    this.multijoueur = JSON.parse(sessionStorage.getItem('settings')).multiplayer;

    if (this.multijoueur) {
      this.gameBoard1 = new GameBoard('#mainBoard2');
    }
    this.drawLogo();
    this.socket = new SocketIO();
    this.difficulty = 0;
    this.current = false;
    this.parseSettings();
  }

  drawLogo() {
    this.gameBoard.clearBoard();
    this.gameBoard.drawWallGrind();
  }

  startgame() {
    if (!this.current) {
      this.current = true;

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
        console.log(vthis.gameBoard.rules.difficulty);
        setTimeout(t, 1000 / (1 + (((vthis.gameBoard.rules.difficulty - 1) * 2))));
      }
    }());
  }

  parseSettings() {
    let settings = JSON.parse(sessionStorage.settings);
    this.gameBoard.rules.user = settings.user;
    this.gameBoard.rules.blindmode = settings.blind;
    this.gameBoard.rules.bmode = settings.blind;
    this.gameBoard.rules.difficulty = settings.difficulty;
    this.gameBoard.score.username = settings.user;
    $("#namespan").html(settings.user);
    $("#diffspan").html(settings.difficulty);
    $("#blindspan").html(() => {
      return settings.blind ? 'Activé' : 'Désactivé';
    });
    $("#bmodespan").html(() => {
      return settings.bmode ? 'Activé' : 'Désactivé';
    });
  }

}
