import Random from './Random.js';
import DecToHex from './DecToHex.js';

export default () => {
  let color = '#';

  for (let i = 0; i < 6; i += 1) {
    color += DecToHex(Random(1, 16));
  }

  return color;
};

export function rgbaToHex(c) {
  let res = "#";
  let re = /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i;
  c = c.match(re);
  for(let i = 1; i <= 3; i++) {
    res += ("0" + parseInt(c[i],10).toString(16)).slice(-2);
  }

  return res;
}
