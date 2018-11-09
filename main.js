console.log("p5 sandbox");
let width = window.innerWidth; // available width in browser
let height = window.innerHeight; //available height in browser

// array to store x-y coords of points for each box
let boxL = [];
let boxC = [];
let boxR = [];

// number of dots in each box
let numDotsL = 2000;
let numDotsC = 2000;
let numDotsR = 2000;

let space = width / 10; // horizontal spacing
let boxW = space * 2; // box width is 2 x space
let boxH = boxW; // make a square x = h
let yMin = height / 2 - boxH / 2; // vertically center the square
let yMax = height / 2 + boxH / 2;

// upper left & lower right x-y coords for each box
let xMinL = space;
let xMaxL = space + boxW;
let xMinC = xMaxL + space;
let xMaxC = xMinC + boxW;
let xMinR = xMaxC + space;
let xMaxR = xMinR + boxW;

let pOff = 0; // counter for perlin noise generator
let colorVal = 0;
let strokeVal = 0;

let wNoise;

function setup() {
  createCanvas(width, height);

  wNoise = new p5.Noise("white");
  wNoise.start();

  bgColor = color(250, 250, 250);
  for (let i = 0; i < numDotsL; i++) {
    let x = Math.round(random(xMinL, xMaxL)); // x-coord within left square
    let y = Math.round(random(yMin, yMax)); // y-coord within left square
    boxL.push(new Points(x, y));
  }

  for (let i = 0; i < numDotsC; i++) {
    let x = Math.round(random(xMinC, xMaxC)); // x-coord within center square
    let y = Math.round(random(yMin, yMax)); // y-coord within center square
    boxC.push(new Points(x, y));
  }

  for (let i = 0; i < numDotsR; i++) {
    let x = Math.round(random(xMinR, xMaxR)); // x-coord within right square
    let y = Math.round(random(yMin, yMax)); // y-coord within right square
    boxR.push(new Points(x, y));
  }
}

function draw() {
  let ampLevel;

  background(bgColor);

  strokeVal = noiseVal();
  ampLevel = map(strokeVal, 0, 200, 0.7, 0.1);
  wNoise.amp(ampLevel);
  // console.log(`strokeVal: ${strokeVal} ampLevel: ${ampLevel}`);

  for (let i = 0; i < numDotsL; i++) {
    boxL[i].renderL();
  }
  for (let i = 0; i < numDotsC; i++) {
    boxC[i].renderC();
  }
  for (let i = 0; i < numDotsR; i++) {
    boxR[i].renderR();
  }
}

class Points {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  renderL() {
    stroke(strokeVal);
    this.x = Math.round(random(xMinL, xMaxL));
    this.y = Math.round(random(yMin, yMax));
    point(this.x, this.y);
  }

  renderC() {
    stroke(strokeVal);
    this.x = Math.round(random(xMinC, xMaxC));
    this.y = Math.round(random(yMin, yMax));
    point(this.x, this.y);
  }

  renderR() {
    stroke(strokeVal);
    this.x = Math.round(random(xMinR, xMaxR));
    this.y = Math.round(random(yMin, yMax));
    point(this.x, this.y);
  }
}

function noiseVal() {
  let noiseVal = 0;
  pOff = pOff + 0.001;
  noiseVal = noise(pOff);
  colorVal = Math.round(map(noiseVal, 0, 1, 0, 200));
  console.log(colorVal);
  return colorVal;
}
