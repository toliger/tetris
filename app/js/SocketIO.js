/* eslint-disable no-undef, no-console */

export default class SocketIO {
  constructor() {
    this.socket = io('https://api.wallgrind.fr');
    this.on();
    this.emit();
  }

  on() {
    this.socket.on('connection', (status) => {
      console.log('socket', status);
    });

    //= ===============  CHAT
    this.socket.on('message', (message) => {
      console.log(' waza message');
      const chatbox = $('#textBox');
      let usr = $('#usrinput').val();
      usr = (usr === '') ? 'Anonymous' : usr;
      $('#textBox').append(`<p><span class="username">${usr} : </span>${message}</p>`);
      chatbox.scrollTop(chatbox.prop('scrollHeight'));
    });
  }

  emit() {
    this.socket.emit('connection');

    //= ===============  CHAT
    $('#chatinput').keypress((e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.socket.emit('message', $('#chatinput').val());
        $('#chatinput').val('');
      }
    });
    $('#chatbutton').on('click', () => {
      this.socket.emit('message', $('#chatinput').val());
      $('#chatinput').val('');
    });
  }
}
