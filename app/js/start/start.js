import WallPaper from './WallPaper.js';

const wp = new WallPaper();
let p2input = false;
setInterval(() => {
  wp.refresh();
}, 50);

$(document).ready(() => {
  $("#title").animate({
    top: "20vh",
    fontSize:"4em"
  }, 1000, () => {
    $("#settings").fadeIn("slow", () => {
      $("#linkstart").animate({
        bottom: "20vh"
      });
    });
  });

  $("#linkstart").click(() => {
    sessionStorage.settings = JSON.stringify({
      user: $('#userinput').val(),
      difficulty: $('#diffselector').val(),
      blind: $('#checkBlind').is(':checked') ? true : false,
      bmode: $('#checkBmode').is(':checked') ? true : false,
      multiplayer: $('#checkMulti').is(':checked') ? true : false
    })
  });

  $("#checkMulti").click(() => {
    $("#userinput2").prop('disabled', p2input);
    p2input = !p2input;
  })
});
