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

    localStorage.setItem("scores", JSON.stringify(scores));

    this.display();
  }
}
