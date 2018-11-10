console.log("p5 sandbox");
let width = window.innerWidth; // available width in browser
let height = window.innerHeight; //available height in browser

// array to store x-y coords of points for each box
let boxL = [];
let boxC = [];
let boxR = [];

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

// number of dots in each box
let div = 100;
let numDots = Math.round((boxW * boxH) / div);

let pOff = 0; // counter for perlin noise generator
let colorVal = 0;
let strokeVal = 0;

let wNoise;

function setup() {
  createCanvas(width, height);

  wNoise = new p5.Noise("white");
  wNoise.start();

  bgColor = color(250, 250, 250);
  for (let i = 0; i < numDots; i++) {
    let x = Math.round(random(xMinL, xMaxL)); // x-coord within left square
    let y = Math.round(random(yMin, yMax)); // y-coord within left square
    boxL.push(new Points(x, y));
  }

  for (let i = 0; i < numDots; i++) {
    let x = Math.round(random(xMinC, xMaxC)); // x-coord within center square
    let y = Math.round(random(yMin, yMax)); // y-coord within center square
    boxC.push(new Points(x, y));
  }

  for (let i = 0; i < numDots; i++) {
    let x = Math.round(random(xMinR, xMaxR)); // x-coord within right square
    let y = Math.round(random(yMin, yMax)); // y-coord within right square
    boxR.push(new Points(x, y));
  }
}

function draw() {
  let ampLevel;

  background(bgColor);
  solidSquares();

  strokeVal = noiseVal();
  ampLevel = map(strokeVal, 0, 100, 0.7, 0.1);
  wNoise.amp(ampLevel);
  // console.log(`strokeVal: ${strokeVal} ampLevel: ${ampLevel}`);

  for (let i = 0; i < numDots; i++) {
    boxL[i].renderL();
    boxC[i].renderC();
    boxR[i].renderR();
  }
}

class Points {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.wh = 1;
  }
  renderL() {
    noStroke();
    fill(strokeVal);
    this.x = Math.round(random(xMinL, xMaxL));
    this.y = Math.round(random(yMin, yMax));
    rect(this.x, this.y, this.wh, this.wh);
  }

  renderC() {
    noStroke();
    fill(strokeVal);
    this.x = Math.round(random(xMinC, xMaxC));
    this.y = Math.round(random(yMin, yMax));
    rect(this.x, this.y, this.wh, this.wh);
  }

  renderR() {
    noStroke();
    fill(strokeVal);
    this.x = Math.round(random(xMinR, xMaxR));
    this.y = Math.round(random(yMin, yMax));
    rect(this.x, this.y, this.wh, this.wh);
  }
}

function solidSquares() {
  let aL = Math.round(random(170, 190));
  let aC = Math.round(random(180, 200));
  let aR = Math.round(random(200, 210));

  noStroke();

  fill(232, 68, 15, 215);
  rect(xMinL - space / 2, yMin - space, boxW * 3.75, boxH * 1);
  fill(255, 219, 39, aL);
  rect(xMinL, yMin, boxW, boxH);
  fill(51, 255, 55, aC);
  rect(xMinC, yMin, boxW, boxH);
  fill(51, 238, 255, aR);
  rect(xMinR, yMin, boxW, boxH);
  fill(20);
  ellipse(xMinL, yMin - space / 2, space / 3, space / 3);
}

function noiseVal() {
  let noiseVal = 0;
  pOff = pOff + 0.001;
  noiseVal = noise(pOff);
  colorVal = Math.round(map(noiseVal, 0, 1, 0, 100));
  console.log(colorVal);
  return colorVal;
}
