export default class ScoreBoard {
  constructor() {
  }

  display() {
    $("#scoreboard").addClass("scoreboardActive");
  }

  removeBoard() {
    $('#scoreboard').removeClass("scoreboardActive");
  }

  init() {
    let scores = [];

    if(localStorage.getItem("scores")) {
        scores = JSON.parse(localStorage.getItem("scores"));
    }
    for(let i = 0; i < scores.length; i += 1) {
      let pos = 1;
      let row = `<tr><td>${pos}</td><td>${scores[i].username}</td><td>${scores[i].pscore}</td></tr>`;
      $(".scoretable table tbody").append(row);
    }
  }

  add(score) {
    let scores = [];

    if(localStorage.getItem("scores")) {
        scores = JSON.parse(localStorage.getItem("scores"));
    }

    scores.push(score);
    let pos = 1;
    let row = `<tr><td>${pos}</td><td>${score.username}</td><td>${score.pscore}</td></tr>`;
    $(".scoretable table tbody").append(row);

    localStorage.setItem("scores", JSON.stringify(scores));

    this.display();
  }
}
