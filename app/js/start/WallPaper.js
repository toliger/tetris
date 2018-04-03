import Random from '../utils/Random.js';

function calculate(value) {
  const res = value;
  if (res[0] === 1) {
    if (res[1] + 0.1 > 1) {
      res[0] = 0;
      return res;
    }
    res[1] += 0.1;
    return res;
  }
  if (res[1] - 0.2 < 0) {
    res[0] = 1;
    return res;
  }
  res[1] -= 0.1;
  return res;
}

export default class WallPaper {
  constructor(cubeSize = 10) {
    this.size = {};
    this.size.cubeSize = cubeSize;

    this.canvasInit();
    this.carre = [];

    this.arrayGenerate();
  }

  canvasInit() {
    this.ctx = document.getElementById('wall').getContext('2d');

    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;

    this.size.width = Math.floor(window.innerWidth / (this.size.cubeSize * 2));
    this.size.height = Math.floor(window.innerHeight / (this.size.cubeSize * 2));
  }

  arrayGenerate() {
    for (let i = 0; i < this.size.height; i += 1) {
      this.carre.push([]);
      for (let j = 0; j < this.size.width; j += 1) {
        this.carre[i].push([1, Math.random(), Random(20, 255), Random(20, 126), Random(20, 126)]);
      }
    }
  }


  drawWall() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
  }

  refresh() {
    this.ctx.clearRect(
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height,
    );

    this.drawWall();

    for (let i = 0; i < this.size.height; i += 1) {
      for (let j = 0; j < this.size.width; j += 1) {
        this.ctx.fillStyle = `rgba(${this.carre[i][j][2]}, ${this.carre[i][j][3]}, ${this.carre[i][j][4]}, ${this.carre[i][j][1]}`;
        this.ctx.beginPath();
        this.ctx.rect(
          (j * (this.size.cubeSize * 2)) + this.size.cubeSize,
          (i * (this.size.cubeSize * 2)) + this.size.cubeSize,
          this.size.cubeSize,
          this.size.cubeSize,
        );
        this.ctx.fill();
        this.carre[i][j] = calculate(this.carre[i][j]);
      }
    }
  }
}
