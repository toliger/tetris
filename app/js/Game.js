import GameBoard from './GameBoard.js';
import Music from './Music.js';
import SocketIO from './SocketIO.js';

export default class Game {
  constructor() {
    this.gameBoard = new GameBoard();

    this.parseSettings();
    if (this.gameBoard.rules.multiplayer) {
      console.log("multi");
      this.gameBoard1 = new GameBoard('mainBoard2', 2);
      this.gameBoard1.rules = this.gameBoard.rules;
    }
    this.drawLogo();
    this.difficulty = 0;
    sessionStorage.setItem('ingame', false);
    this.pause = false;

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
    console.log(sessionStorage.getItem('ingame'), 'plop');
    if (!JSON.parse(sessionStorage.getItem('ingame'))) {
      sessionStorage.setItem('ingame', true);

      this.gameBoard.clearBoard();
      this.gameBoard.newPiece();
      this.gameBoard.update();

      if (this.gameBoard.rules.multiplayer) {
        this.gameBoard1.clearBoard();
        this.gameBoard1.newPiece();
        this.gameBoard1.update();
      }
      this.tick();
      this.music = new Music();
      this.music.play();
    }

    if(this.pause) {
      this.tick();
      this.pause = false;
    }
  }

  restartGame() {
    this.gameBoard.restartGame();
    this.gameBoard.current = true;

    if (this.gameBoard.rules.multiplayer) {
      this.gameBoard1.restartGame();
      this.gameBoard1.current = true;
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
      if (JSON.parse(sessionStorage.getItem('ingame'))) {
        vthis.pieceController();
        vthis.timeout = setTimeout(t, 1000 / (1 + (((vthis.gameBoard.rules.difficulty - 1) * 2))));
      } else {
        vthis.gameBoard.drawGameOver();
        vthis.gameBoard1.drawGameOver();
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
    this.gameBoard.rules.bmode = settings.blind;
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

}
