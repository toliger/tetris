import WallPaper from './WallPaper.js';

const wp = new WallPaper();

setInterval(() => {
  wp.refresh();
}, 50);

$(document).ready(() => {
  window.setTimeout(() => {
    $('#t1').addClass('anim1');
    $('#t2').addClass('anim2');
    $('a').addClass('anim3');
  }, 3000);
});
