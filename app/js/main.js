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


      case 'h':
        console.log(board.map);
        e.preventDefault();
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


  $('#start').on('click', () => {
    game.startgame();
  });
});
