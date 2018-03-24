export default class Score {
  constructor() {
    this.plignes = 0;
  }

  updateDisplay() {
    $('#score').val(this.value);
  }

  set lignes(value) {
    this.plignes = value;
    this.updateDisplay();
  }

  get lignes() {
    return this.plignes;
  }

  get value() {
    return this.lignes * 2;
  }

  set value(value) {

  }
}
