import Random from '../utils/Random.js';

var c = document.getElementById("wall");
var ctx = c.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;



ctx.fillStyle = "yellow";

const cubeSize = 10;

const width = Math.floor(window.innerWidth / (cubeSize * 2));
const height = Math.floor(window.innerHeight / (cubeSize * 2));



let carre = [];
console.log(width, height);

for(let i = 0; i < height; i += 1) {
  carre.push([]);
  for(let j = 0; j < width; j += 1) {
    carre[i].push([1, Math.random(), Random(0, 255), Random(0, 126), Random(0, 126)]);
  }
}

function calculate(value) {
  if (value[0] == 1) {
    if (value[1] + 0.1 > 1) {
      value[0] = 0;
      return value;
    }
    value[1] += 0.1;
    return value;
  } else {
    if (value[1] - 0.2 < 0) {
      value[0] = 1;
      return value;
    }
    value[1] -= 0.1;
    return value;
  }
}

function drawWall() {
  ctx.beginPath();
  ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "black";
  ctx.fill();
}

function print() {
  ctx.clearRect(
    0,
    0,
    ctx.canvas.width,
    ctx.canvas.height,
  );

  drawWall();

  for(let i = 0; i < height; i += 1) {
    for(let j = 0; j < width; j += 1) {
      ctx.fillStyle = "rgba(" + carre[i][j][2] + ", " + carre[i][j][3] + ", " + carre[i][j][4] + ", " + carre[i][j][1] + ")";
      ctx.beginPath();
      ctx.rect(j * (cubeSize * 2) + cubeSize, i * (cubeSize * 2) + cubeSize, cubeSize, cubeSize);
      ctx.fill();
      carre[i][j] = calculate(carre[i][j]);
    }
  }
}

console.log(carre);
setInterval(() =>{
  console.log('tick');
  print();
}, 50);
