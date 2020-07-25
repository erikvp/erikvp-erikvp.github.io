console.log("p5 tutorial on perlin noise");
let xOff = 0.0;
let yOff = 0.0;
let x0 = 0;
let y0 = 0;
let px0 = 0; // px0 = last x0 value
let py0 = 0; //py0 = last y0 value

// USE FOR Mobile/Desktop/Tablet COMPATIBILITY
let width = window.innerWidth;
let height = window.innerHeight;

if (window.innerWidth > window.innerHeight) {
  width = height; // available width in browser
} else {
  height = width;
}

let whSquare = width; // Use for setting target area
let canvasCenter = whSquare / 2;
let whPercent = 0.15;
let targetWH = whSquare * whPercent;

//console.log(width, height, targetWH);

//let width = 800; // use for development - fixed width only
//let height = 800; //use for development - fixed height only
let minX = width / 2 - 50;
let maxX = width / 2 + 50;
let minY = height / 2 - 50;
let maxY = height / 2 + 50;

let counter0 = 0;
let colorChange = 0;

function preload() {}

function setup() {
  createCanvas(width, height);
  frameRate(20);
  //Loop();
  xyCoords(); //define initial x0/y0 coords

  stroke(250, 0, 0);
}

function draw() {
  //background(20);
  xyCoords();
  changeColor();
  displayCoords();
}

function xyCoords() {
  xOff = xOff + 0.01;
  yOff = yOff + 0.03;
  px0 = x0;
  py0 = y0;
  x0 = Math.floor(noise(xOff) * width);
  y0 = Math.floor(noise(yOff) * width);
  //console.log("coords:", px0, py0, x0, y0);
}

function changeColor() {
  let change = Math.floor(Math.random() * 1000);

  if (change < 10) {
    console.log("change:", change);
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    stroke(r, g, b);
  }

  if (counter0 == 0) {
    console.log("skip this cycle");
    counter0++;
  } else {
    line(px0, py0, x0, y0);
  }
}

function displayCoords() {
  let xText_xCoord = x0 + 20; // x location of text "x:"
  let yText_xCoord = xText_xCoord + 60; // x location of text "y:"
  let xyText_yCoord = y0 - 20; // y location of text "x: xxx  y: yyy"

  /*
  fill(20);
  ellipse(x0, y0, 40, 40);
  fill(250, 0, 0);
  ellipse(x0, y0, 10, 10);

  textSize(17);
  stroke(250);
  fill(250);
  text("x: ", 730, 760);
  text(x0, 750, 760);
  text("y: ", 730, 780);
  text(y0, 750, 780);
  */
}
