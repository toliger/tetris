export default class SocketIO {
  constructor() {
    this.socket = io("https://api.wallgrind.fr");
    this.on();
    this.emit();
  }

  on() {
    this.socket.on('connection', function(status) {
      console.log('socket', status);
    });

    //================  CHAT
    this.socket.on('message', function(message) {
      console.log(' waza message');
      $('#textBox').append(`<p>${ message }</p>`)
    });
  }

  emit() {
    this.socket.emit('connection');

    //================  CHAT 
    $('#chatinput').keypress((e) => {
      if(e.key == 'Enter') {
        this.socket.emit('message', $('#chatinput').val());
        $('#chatinput').val('');
      }
    });
  }
}
