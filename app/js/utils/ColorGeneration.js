import Random from './Random.js';
import DecToHex from './DecToHex.js';

export function generateRandomHex() {
  let color = '#';

  for (let i = 0; i < 6; i += 1) {
    color += DecToHex(Random(0, 15));
  }

  return color;
}

export function generateRandomRgba() {
  const [r, g, b] = [Random(0, 255), Random(0, 255), Random(0, 255)];
  return `rgba(${r}, ${g}, ${b}, 150)`;
}
