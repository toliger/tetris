import GameBoard from './GameBoard.js';
import Game from './js/Game.js';
$(document).ready(() => {
  const board = new GameBoard();
  //new Game();


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

  $("#settings").on('click', () => {
    $(".settings").slideToggle();
    $("#settings i")
      .toggleClass("fa-angle-down")
      .toggleClass("fa-angle-up");
    
  });

});
