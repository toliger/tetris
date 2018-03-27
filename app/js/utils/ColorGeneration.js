import Random from './Random.js';
import DecToHex from './DecToHex.js';

export function generateRandomHex() {
  let color = '#';

  for (let i = 0; i < 6; i += 1) {
    color += DecToHex(Random(0, 15));
  }

  return color;
}

export function rgbaToHex(c) {
  let res = '#';
  const re = /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i;
  c = c.match(re);
  for (let i = 1; i <= 3; i++) {
    res += (`0${parseInt(c[i], 10).toString(16)}`).slice(-2);
  }

  return res;
}

export function generateRandomRgba() {
  const [r, g, b] = [Random(0, 255), Random(0, 255), Random(0, 255)];
  return `rgba(${r}, ${g}, ${b}, 150)`;
}

export function decreaseOpacity(rgba) {
  const re = /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i;
  rgba = rgba.match(re);
  let alpha = parseInt(rgba[4]) - 0.1;
  if (alpha < 0) {
    alpha = 0;
  }
  return `rgba(${rgba[1]}, ${rgba[2]}, ${rgba[3]}, ${alpha})`;
}
