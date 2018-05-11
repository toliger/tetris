import GameBoard from './GameBoard.js';
import AudioController from './AudioController.js';

export default class Game {
  constructor() {
    this.gameBoard = new GameBoard('mainBoard', 1);

    this.AudioController = new AudioController();

    this.parseSettings();
    if (this.gameBoard.rules.multiplayer) {
      this.gameBoard1 = new GameBoard('mainBoard2', 2);
      this.gameBoard1.rules = this.gameBoard.rules;
    } else {
      $("#sideBoard2").hide();
    }

    if (this.gameBoard.rules.bmode) {
      this.gameBoard.modeb();

      if (this.gameBoard.rules.multiplayer) {
        this.gameBoard1.modeb();
      }
    }
    this.drawLogo();
    this.gameBoard.rules.ingame = false;
    this.pause = false;
    this.music = new AudioController('flamingo_8-bit');
    this.music.loop();

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
      this.music.aud.play();
    }

    if(this.pause) {
      this.tick();
      this.pause = false;
    }
  }

  restartGame() {
    this.gameBoard.restartGame();
    if(this.gameBoard.rules.multiplayer) {
      this.gameBoard1.restartGame();
    }
    this.music.aud.currentTime = 0;
    this.startgame();
    clearTimeout(this.timeout);
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
        vthis.timeout = setTimeout(t, 1000 / (1 + (((vthis.gameBoard.rules.difficulty)))));
      } else {
        vthis.music.aud.pause();
        vthis.AudioController.mplay('loose');
        if (vthis.gameBoard.rules.multiplayer) {
          if (JSON.parse(sessionStorage.whowin) == 2) {
            vthis.gameBoard.drawGameWin();
          } else {
            vthis.gameBoard1.drawGameWin();
          }
        }
      }
    }());
  }

  pausehandler() {
    clearTimeout(this.timeout);
    this.pause = true;
  }

  restartMulti() {
    $('#start').toggleClass('active');
    $('#restartMulti').toggleClass('active');
    this.gameBoard.restartGame();
    this.gameBoard.rules.ingame = true;
    if (this.gameBoard.rules.multiplayer) {
      this.gameBoard1.restartGame();
    }
    this.startgame();
    clearTimeout(this.timeout);
    this.tick();
  }

  parseSettings() {
    let settings = JSON.parse(sessionStorage.settings);
    this.gameBoard.rules.user = settings.user;
    this.gameBoard.rules.user2 = settings.user2;
    this.gameBoard.rules.blindmode = settings.blind;
    this.gameBoard.rules.bmode = settings.bmode;
    this.gameBoard.rules.difficulty = parseInt(settings.difficulty, 10);
    this.gameBoard.score.username = settings.user;
    this.gameBoard.rules.multiplayer = settings.multiplayer;
    if(settings.multiplayer) {
      $("#namespan2").html(settings.user2);
    }
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
