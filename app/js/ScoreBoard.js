export default class ScoreBoard {
  constructor() {
  }

  display() {
    $("#scoreboard").addClass("scoreboardActive")
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
