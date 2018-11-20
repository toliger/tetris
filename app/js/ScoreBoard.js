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
    $(".scoretable table tbody").empty();

    let scores = [];

    if(localStorage.getItem("scores")) {
        scores = JSON.parse(localStorage.getItem("scores"));
    }
    scores.sort(this.orderByScore);
    this.addRows(scores);
  }

  add(score) {
    let scores = [];

    if(localStorage.getItem("scores")) {
        scores = JSON.parse(localStorage.getItem("scores"));
    }

    scores.push(score);
    scores.sort(this.orderByScore);

    $(".scoretable table tbody").empty();

    this.addRows(scores);
    localStorage.setItem("scores", JSON.stringify(scores));

    this.display();
  }

  addRows(scores) {
    let cpt = 1;
    for(let i = scores.length - 1; i >= 0; i -= 1) {
      let row = `<tr><td>${cpt}</td><td>${scores[i].username}</td><td>${scores[i].pscore}</td></tr>`;
      $(".scoretable table tbody").append(row);
      cpt += 1;
    }
  }

  orderByScore(a, b) {
    return a.pscore - b.pscore;
  }

  removeStorage() {
    if(localStorage.getItem("scores")) {
      localStorage.removeItem("scores");
    }
    $(".scoretable table tbody").empty();
  }
}
