import Game from './Game.js';
$(document).ready(() => {
  const game = new Game();
  const board = game.gameBoard;


  $(document).keydown((e) => {

    switch(e.key) {

      case "z":
      case "ArrowUp" : {
        board.rotate();
        board.update();
        e.preventDefault();
        break;
      }


      case "q":
      case "ArrowLeft" : {
        board.mvLeft();
        board.update();
        e.preventDefault();
        break;
      }


      case "d":
      case "ArrowRight" : {
        console.log('droite');
        board.mvRight();
        board.update();
        e.preventDefault();
        break;
      }


      case "ArrowDown" : {
        board.mvDown();
        board.update();
        e.preventDefault();
        break;
      }


      case "h":
        board.printInfo();
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
