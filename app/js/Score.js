export default class Score {
  constructor(username = 'Anonymous', player = 1) {
    this.username = username;
    // lines
    this.lscore = 0;
    // points
    this.pscore = 0;

    this.player = player;
  }

  updateDisplay() {
    if(this.player == 1) {
      $('#score').html(this.pscore);
      $('#lines').html(this.lscore);
    } else {
      $('#score2').html(this.pscore);
      $('#lines2').html(this.lscore);
    }
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

  resetScore() {
    this.pscore = 0;
    this.lscore = 0;
  }
}
