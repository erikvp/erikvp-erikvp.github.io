console.log("$scribbl3 v1");
let xOff = 0.0;
let yOff = 0.0;
let x0 = 0;
let y0 = 0;
let px0 = 0; // px0 = last x0 value
let py0 = 0; //py0 = last y0 value

// USE FOR Mobile/Desktop/Tablet COMPATIBILITY
let width = window.innerWidth;
let height = window.innerHeight;

/*
if (window.innerWidth > window.innerHeight) {
  width = height; // available width in browser
} else {
  height = width;
}*/

//console.log(width, height, targetWH);

let firstIteration = true;
let colorChange = 0;

function preload() {}

function setup() {
  createCanvas(width, height);
  frameRate(20);
  xyCoords(); //define initial x0/y0 coords
  stroke(250, 0, 0); // set initial line color to red
}

function draw() {
  xyCoords();
  changeColor();
}

function xyCoords() {
  xOff = xOff + 0.01; //x offset for perlin noise
  yOff = yOff + 0.03; //y offset for perlin noise
  px0 = x0; // previous x0 value used to draw line segment
  py0 = y0; // previous y0 value used to draw line segment
  x0 = Math.floor(noise(xOff) * width); //x0 for drawing line segment
  y0 = Math.floor(noise(yOff) * height); //y0 for drawing line segment
  //console.log("coords:", px0, py0, x0, y0);
}

function changeColor() {
  let change = Math.floor(Math.random() * 1000);

  //Change rgb color 10% of the time
  if (change < 10) {
    console.log("change:", change);
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    stroke(r, g, b);
  }

  //This is used the first time the draw loop runs to set px0, py0
  if (firstIteration === true) {
    console.log("initialize px0, py0", px0, py0);
    firstIteration = false;
  } else {
    line(px0, py0, x0, y0);
  }
}
