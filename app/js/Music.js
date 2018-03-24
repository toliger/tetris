export default class Music {
  constructor() {
    this.music = new Audio('../ressources/flamingo_8-bit.mp3');

  }

  play() {
    this.music.play();
  }
}
