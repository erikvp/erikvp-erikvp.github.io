console.log("p5 tutorial on perlin noise");
let xOff = 0.0;
let yOff = 0.0;
let x0 = 0;
let y0 = 0;
let px0 = 0; // px0 = last x0 value
let py0 = 0; //py0 = last y0 value

let width = 800;
let height = 800;
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
  drawCenter();
  stroke(250, 0, 0);
}

function draw() {
  //background(20);
  xyCoords();
  displayCoords();
}

function drawCenter() {
  let wh = 100;
  let x0 = width / 2 - wh / 2;
  let y0 = height / 2 - wh / 2;

  noFill();
  stroke(240, 240, 240);
  rect(x0, y0, wh, wh);
}

function xyCoords() {
  xOff = xOff + 0.01;
  yOff = yOff + 0.03;
  px0 = x0;
  py0 = y0;
  x0 = Math.floor(noise(xOff) * width);
  y0 = Math.floor(noise(yOff) * width);
  console.log("coords:", px0, py0, x0, y0);

  //stroke(250);
  //line(x0, 0, x0, height); // vertical - x0, y0, x1, y1
}

function displayCoords() {
  let xText_xCoord = x0 + 20; // x location of text "x:"
  let yText_xCoord = xText_xCoord + 60; // x location of text "y:"
  let xyText_yCoord = y0 - 20; // y location of text "x: xxx  y: yyy"
  let r = Math.random() * 255;
  let g = Math.random() * 255;
  let b = Math.random() * 255;

  if (x0 <= maxX && x0 >= minX && y0 <= maxY && y0 >= minY) {
    console.log("CENTER:", x0, " - ", y0);
    stroke(r, g, b);
  } else {
    //console.log("NC  n = ", n);
    //stroke(250);
  }
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
  if (counter0 == 0) {
    console.log("skip this cycle");
    counter0++;
  } else {
    line(px0, py0, x0, y0);
  }
}
