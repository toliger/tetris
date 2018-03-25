export default class Score {
  constructor() {
    // lines
    this.lscore = 0;
    // points
    this.pscore = 0;
  }

  updateDisplay() {
    $('#score').html(this.pscore);
    console.log(this.lscore, this.pscore);
    $('#lines').html(this.lscore);
  }

  set score(value) {
    this.pscore += value * 20;
    this.updateDisplay();
  }

  get score() {
    return this.pscore;
  }

  set lines(value) {
    this.lscore = value;
    this.pscore += 100;
    this.updateDisplay();
  }

  get lines() {
    return this.lscore;
  }
}
