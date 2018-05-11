export default class AudioController {

  constructor(name = 'loose') {
    this.aud = new Audio(`musiques/${ name }.mp3`) ;

  }

  mplay(name = 'loose') {
    const aud = new Audio(`musiques/${ name }.mp3`).play();
  }

  loop() {
    this.aud.loop = true;
  }

}
