import GameBoard from './GameBoard.js';
import Music from './Music.js';
import SocketIO from './SocketIO.js';
import AudioController from './AudioController.js';

export default class Game {
  constructor() {
    this.gameBoard = new GameBoard('mainBoard', 1, this);

    this.AudioController = new AudioController();

    this.parseSettings();
    if (this.gameBoard.rules.multiplayer) {
      this.gameBoard1 = new GameBoard('mainBoard2', 2, this);
      this.gameBoard1.rules = this.gameBoard.rules;
    }

    console.log(this.gameBoard.rules.bmode);
    if (this.gameBoard.rules.bmode) {
      this.gameBoard.modeb();
    }
    this.drawLogo();
    this.difficulty = 0;
    this.gameBoard.rules.ingame = false;
    this.pause = false;
    this.ingame = false;

  }

  drawLogo() {
    this.gameBoard.clearBoard();
    this.gameBoard.drawWallGrind();

    if (this.gameBoard.rules.multiplayer) {
      this.gameBoard1.clearBoard();
      this.gameBoard1.drawWallGrind();
    }
  }

  startgame() {
    if (!this.gameBoard.rules.ingame) {
      this.gameBoard.rules.ingame = true;

      this.gameBoard.clearBoard();
      this.gameBoard.newPiece();
      this.gameBoard.update();

      if (this.gameBoard.rules.multiplayer) {
        this.gameBoard1.clearBoard();
        this.gameBoard1.newPiece();
        this.gameBoard1.update();
      }
      this.tick();
      this.AudioController.mplay('flamingo_8-bit');
    }

    if(this.pause) {
      this.tick();
      this.pause = false;
    }
  }

  restartGame() {
    this.gameBoard.restartGame();
    this.gameBoard.current = true;
    if(this.gameBoard.rules.multiplayer) {
      this.gameBoard1.restartGame();
    }
    this.startgame();
    this.tick();
  }

  pieceController() {
    this.gameBoard.mvDown();
    this.gameBoard.update();

    if (this.gameBoard.rules.multiplayer) {
      this.gameBoard1.mvDown();
      this.gameBoard1.update();
    }
  }

  tick() {
    const vthis = this;
    (function t() {
      if (vthis.gameBoard.rules.ingame) {
        vthis.pieceController();
        vthis.timeout = setTimeout(t, 1000 / (1 + (((vthis.gameBoard.rules.difficulty - 1) * 2))));
      } else {
        vthis.AudioController.mplay('loose');
        vthis.gameBoard.drawGameOver();
        if(vthis.gameBoard.rules.multiplayer) {
          vthis.gameBoard1.drawGameOver();
        }
      }
    }());
  }

  pausehandler() {
    clearTimeout(this.timeout);
    this.pause = true;
  }

  parseSettings() {
    let settings = JSON.parse(sessionStorage.settings);
    this.gameBoard.rules.user = settings.user;
    this.gameBoard.rules.blindmode = settings.blind;
    this.gameBoard.rules.bmode = settings.bmode;
    this.gameBoard.rules.difficulty = settings.difficulty;
    this.gameBoard.score.username = settings.user;
    this.gameBoard.rules.multiplayer = settings.multiplayer;
    $("#namespan").html(settings.user);
    $("#diffspan").html(settings.difficulty);
    $("#blindspan").html(() => {
      return settings.blind ? 'Activé' : 'Désactivé';
    });
    $("#bmodespan").html(() => {
      return settings.bmode ? 'Activé' : 'Désactivé';
    });
  }

  setIngame(state) {
    this.ingame = state;
  }


}
