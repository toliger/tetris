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
      let chatbox = $("#textBox");
      let usr = $("#usrinput").val();
      usr = (usr === "") ? "Anonymous" : usr;
      $('#textBox').append(`<p><span class="username">${ usr } : </span>${ message }</p>`);
      chatbox.scrollTop(chatbox.prop('scrollHeight'));
    });
  }

  emit() {
    this.socket.emit('connection');

    //================  CHAT 
    $('#chatinput').keypress((e) => {
      if(e.key == 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.socket.emit('message', $('#chatinput').val());
        $('#chatinput').val('');
      }
    });
    $('#chatbutton').on('click', () => {
      this.socket.emit('message', $('#chatinput').val());
      $('#chatinput').val('');
    });
  }

}
