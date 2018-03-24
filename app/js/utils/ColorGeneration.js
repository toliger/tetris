import Random from './Random.js';
import DecToHex from './DecToHex.js';

export default () => {
  let color = '#';

  for (let i = 0; i < 6; i += 1) {
    color += DecToHex(Random(1, 16));
  }

  return color;
};
