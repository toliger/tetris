export default class Canvas {
  constructor(height, width) {
    $('#mainBoard').css({
      width: `${width}px`,
      height: `${height}px`,
    });

    $('<canvas>').attr({
      id: 'map',
    }).css({
      width: `${width}px`,
      height: `${height}px`,
    }).appendTo('#mainBoard');

    const c = document.getElementById('map');
    c.width = width;
    c.height = height;
    this.ctx = c.getContext('2d');
  }
}
