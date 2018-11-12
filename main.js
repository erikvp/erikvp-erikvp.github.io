console.log("Revisions: Bandpass filter, alpha for noise");
let width = window.innerWidth; // available width in browser
let height = window.innerHeight; //available height in browser

// array to store x-y coords of points for each box
let boxL = [];
let boxC = [];
let boxR = [];
let boxH;

let space = width / 10; // horizontal spacing
let boxW = space * 2; // box width is 2 x space

if (width > height) {
  boxH = boxW; // make a square x = h
} else {
  boxH = boxW * 2;
}

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
let div = width * 1.5;
let numDots = Math.round((boxW * boxH) / div);

let pOff = 0; // counter for perlin noise generator
let fOff = 0; // counter for perlin noise generator

let colorVal = 0;
let strokeVal = 0;
let filterVal = 0;
let filterFreq = 0;

let wNoise;

function setup() {
  createCanvas(width, height);
  frameRate(10);

  wNoise = new p5.Noise("white");
  delay1 = new p5.Delay();
  bpFilter = new p5.BandPass();
  wNoise.start();
  wNoise.amp(0.5);

  // source, delayTime, feedback, filter frequency
  delay1.process(wNoise, 0.9, 0.7, 3000);

  wNoise.disconnect();
  wNoise.connect(bpFilter);
  // set bandpass filter parameters  center, bandwidth
  bpFilter.set(2200, 1000);

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
  background(bgColor);

  strokeVal = noiseVal();
  filterFreq = setFilter();
  bpFilter.set(filterFreq, 1000);

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
    this.w = Math.round(random(boxW / 20, boxW / 10));
    this.h = Math.round(random(boxH / 20, boxH / 3));
  }
  renderL() {
    let aL = Math.round(random(50, 220));
    noStroke();
    fill(strokeVal, aL);
    this.x = Math.round(random(xMinL, xMaxL));
    this.y = Math.round(random(yMin, yMax));
    rect(this.x, this.y, this.w, this.h);
  }

  renderC() {
    let aC = Math.round(random(120, 200));

    noStroke();
    fill(strokeVal, aC);
    this.x = Math.round(random(xMinC, xMaxC));
    this.y = Math.round(random(yMin, yMax));
    rect(this.x, this.y, this.w, this.h);
  }

  renderR() {
    let aR = Math.round(random(100, 255));

    noStroke();
    fill(strokeVal, aR);
    this.x = Math.round(random(xMinR, xMaxR));
    this.y = Math.round(random(yMin, yMax));
    rect(this.x, this.y, this.w, this.h);
  }
}

function setFilter() {
  let filterVal = 0;
  fOff = fOff + 0.001;
  filterVal = noise(fOff);
  filterVal = Math.round(map(filterVal, 0, 1, 1000, 1300));
  console.log(filterVal);
  return filterVal;
}

function noiseVal() {
  let noiseVal = 0;
  pOff = pOff + 0.001;
  noiseVal = noise(pOff);
  colorVal = Math.round(map(noiseVal, 0, 1, 0, 50));
  console.log(colorVal);
  return colorVal;
}
