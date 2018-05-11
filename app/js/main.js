/* eslint-disable no-console */
import Game from './Game.js';

$(document).ready(() => {
  const game = new Game();
  const board = game.gameBoard;


  $(document).keydown((e) => {
    switch (e.key) {
      case 'z':
      case 'ArrowUp': {
        board.rotate();
        board.update();
        e.preventDefault();
        break;
      }


      case 'q':
      case 'ArrowLeft': {
        board.mvLeft();
        board.update();
        e.preventDefault();
        break;
      }


      case 'd':
      case 'ArrowRight': {
        board.mvRight();
        board.update();
        e.preventDefault();
        break;
      }

      case 's':
      case 'ArrowDown': {
        board.mvDown();
        board.update();
        e.preventDefault();
        break;
      }

      case 'i': {
        if (game.gameBoard.rules.multiplayer) {
          game.gameBoard1.rotate();
          game.gameBoard1.update();
        }
        e.preventDefault();
        break;
      }

      case 'j': {
        if (game.gameBoard.rules.multiplayer) {
          game.gameBoard1.mvLeft();
          game.gameBoard1.update();
        }
        e.preventDefault();
        break;
      }

      case 'k': {
        if (game.gameBoard.rules.multiplayer) {
          game.gameBoard1.mvDown();
          game.gameBoard1.update();
        }
        e.preventDefault();
        break;
      }

      case 'l': {
        if (game.gameBoard.rules.multiplayer) {
          game.gameBoard1.mvRight();
          game.gameBoard1.update();
        }
        e.preventDefault();
        break;
      }

      case 'Enter': {
        if (game.gameBoard.rules.multiplayer) {
          game.gameBoard1.bigMoveDown();
          game.gameBoard1.update();
        }
        e.preventDefault();
        break;
      }


      case ' ': {
        if(game.gameBoard.rules.ingame) {
          board.bigMoveDown();
          board.update();
        }
        e.preventDefault();
        break;
      }

      default:
    }
  });

  $('#diffSelect').change(() => {
    game.difficulty = $('#diffSelect').val();
  });


  $('#checkBlind').change(() => {
    board.rules.blindmode = $('#checkBlind').is(':checked');
  });

  $('#checkBmode').change(() => {
    board.rules.bmode = $('#checkBmode').is(':checked');
  });

  $('#start').click(() => {
    game.startgame();
  });

  $('#pause').click(() => {
    game.pausehandler();
  });

  $('#restart').click(() => {
    game.restartGame();
  });

  $('#resetScoreBoard').click(() => {
    game.gameBoard.scoreboard.removeStorage();
  });

  $("#buttonsArea img").click(() => {
    $("#audioButton").toggleClass('active');
    $("#muteButton").toggleClass('active');
  });

  $("#audioButton").click(() => {
    game.music.aud.pause();
  });

  $("#muteButton").click(() => {
    game.music.aud.play();
  });
});
