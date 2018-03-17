import GameBoard from './GameBoard.js';
import Game from './js/Game.js';
$(() => {
  const board = new GameBoard();
  //new Game();

  $(document).on('click', () => {
    board._piece.form.rotate();
    board.update()
  });
});
