import Random from './Random.js';
import DecToHex from './DecToHex.js';

export function generateRandomHex() {
  let color = '#';

  for (let i = 0; i < 6; i += 1) {
    color += DecToHex(Random(0, 15));
  }

  return color;
};

export function rgbaToHex(c) {
  let res = '#';
  let re = /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i;
  c = c.match(re);
  for(let i = 1; i <= 3; i++) {
    res += ('0' + parseInt(c[i],10).toString(16)).slice(-2);
  }

  return res;
}

export function generateRandomRgba() {
  let r, g, b;
  [r, g, b] = [Random(0,255), Random(0,255), Random(0,255)];
  return `rgba(${ r }, ${ g }, ${ b }, 255)`;
}

export function decreaseOpacity(rgba) {
  let re = /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i;
  rgba = rgba.match(re);
  let alpha = parseInt(rgba[4]) - 20;
  if (alpha < 0) {
    alpha = 0;
  }
  return `rgba(${ rgba[1] }, ${ rgba[2] }, ${ rgba[3] }, ${ alpha })`;
}
