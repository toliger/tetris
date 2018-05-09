export default class Canvas {
  constructor(height, width, canvasid) {
    console.log(canvasid, 'le bon id');
    $(`#${ canvasid }`).css({
      width: `${width}px`,
      height: `${height}px`,
    });

    $('<canvas>').attr({
      id: `map${canvasid}`,
    }).css({
      width: `${width}px`,
      height: `${height}px`,
    }).appendTo(`#${ canvasid }`);

    const c = document.getElementById(`map${canvasid}`);
    c.width = width;
    c.height = height;
    this.ctx = c.getContext('2d');
  }
}
