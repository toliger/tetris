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

      case ' ': {
        if(board.current) {
          board.bigMoveDown();
          board.update();
        }
        e.preventDefault();
        break;
      }

      case 'h':
        console.log(board.map);
        e.preventDefault();
        break;

      case 'Enter':
        game.startgame();
        break;

      default:
    }
  });

  $('#diffSelect').change(() => {
    game.difficulty = $('#diffSelect').val();
  });

  $('#settings').on('click', () => {
    $('.settings').slideToggle();
    $('#settings i')
      .toggleClass('fa-angle-down')
      .toggleClass('fa-angle-up');
  });


  $('#checkBlind').change(() => {
    board.rules.blindmode = $('#checkBlind').is(':checked');
  });

  $('#checkBmode').change(() => {
    board.rules.bmode = $('#checkBmode').is(':checked');
  });

  $('#start').click(() => {
    game.startgame();
    $('.settings').slideToggle();
    $('#settings i')
      .toggleClass('fa-angle-down')
      .toggleClass('fa-angle-up');
  });

  $('#restart').click(() => {
    game.restartGame();
  });
});
