import WallPaper from './WallPaper.js';

const wp = new WallPaper();

setInterval(() => {
  wp.refresh();
}, 50);
