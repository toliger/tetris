

export default class AudioController {

  mplay(name = 'loose') {
    const aud = new Audio(`musiques/${ name }.mp3`).play();
  }
}
