import GameBoard from './GameBoard.js';
import Game from './js/Game.js';
$(() => {
  const board = new GameBoard();
  //new Game();

  $(document).on('click', () => {
    board._piece.rotate();
    board.update()
  });

  $(document).keydown((e) => {
    switch(e.key) {

      case "ArrowUp" :
        board._piece.rotate();
        board.update();
        e.preventDefault();
        break;
      
      case "ArrowLeft" :
        board.mvLeft();
        board.update();
        e.preventDefault();
        break;
      
      case "ArrowRight" :
        board.mvRight();
        board.update();
        e.preventDefault();
        break;

      case "ArrowDown" :
        console.log(board._piece.form[board._piece.offset][0]);
        e.preventDefault();
        break;
      
    }
  });

});
