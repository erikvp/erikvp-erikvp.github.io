console.log("$scribbl3 v1");
let xOff = 0.0; //Used for perlin noise x0
let yOff = 0.0; //Used for perline noise y0
let x0 = 0; // Line segment
let y0 = 0; //Line segment
let px0 = 0; // px0 = last x0 value
let py0 = 0; //py0 = last y0 value
let seconds = 20; //Initial value for countdown timer
let r;
let g;
let b;
let titleAdj;
let titleNoun;
let titleVerb;
let titleAdverb;
let title;

// USE FOR Mobile/Desktop/Tablet COMPATIBILITY
let width = window.innerWidth; //Set canvas width to screen width
let height = window.innerHeight; //Set canvas height to screen height

let firstIteration = true; //Set px0, yx0 first time thru draw loop
let newDrawing = false; //Create a new drawing when timer runs out

let cancel = setInterval(countdownSeconds, 1000);

function countdownSeconds() {
  seconds -= 1;
  //console.log("s: ", seconds);

  if (seconds < 0) {
    seconds = Math.floor(random() * 40 + 20); //Set new drawing timer between 20 - 60 seconds
    newDrawing = true;
  }
}
//Check for mobile or tablet orientation change and reset drawing.
window.onorientationchange = function (event) {
  console.log("Screen Rotated " + event.target.screen.orientation.angle);
  width = window.innerWidth;
  height = window.innerHeight;
  newDrawing = true;
  firstIteration = true;
  seconds = 60;
  window.location.reload();
};

// USE FOR SQUARE CANVAS
/*
if (window.innerWidth > window.innerHeight) {
  width = height; // available width in browser
} else {
  height = width;
}*/

function preload() {}

function setup() {
  createCanvas(width, height);
  frameRate(30);
  xyCoords(); //define initial x0/y0 coords
  selectName();
  stroke(250, 0, 0); // set initial line color to red
}

function draw() {
  //Clear screen for new drawing
  if (newDrawing === true) {
    background(255);
    newDrawing = false;
    selectName();
  }
  xyCoords();
  changeColor();
  infoDisplay();
}

function stickPiles() {
  xMin = 100;
  xMax = 500;
  yMin = 100;
  yMax = 300;

  x0 = Math.floor(Math.random() * xMin);
  x1 = Math.floor(Math.random() * xMin);

  stroke(0);
  line(x0, yMin, x1, yMax);

  line;
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
  let change = Math.floor(Math.random() * 1000); // random number between 0 - 99.

  //Change rgb color 10% of the time
  if (change < 10) {
    //console.log("change:", change);
    r = Math.floor(Math.random() * 255);
    g = Math.floor(Math.random() * 255);
    b = Math.floor(Math.random() * 255);
  }
  //This is used the first time the draw loop runs to set px0, py0
  if (firstIteration === true) {
    //console.log("initialize px0, py0", px0, py0);
    firstIteration = false;
  } else {
    stroke(r, g, b);
    line(px0, py0, x0, y0);
  }
}

function selectName() {
  let adjIndex = Math.floor(Math.random() * adjective.length);
  let nounIndex = Math.floor(Math.random() * noun.length);
  let verbIndex = Math.floor(Math.random() * verb.length);
  let adverbIndex = Math.floor(Math.random() * adverb.length);

  titleAdj = adjective[adjIndex];
  titleNoun = noun[nounIndex];
  titleVerb = verb[verbIndex];
  titleAdverb = adverb[adverbIndex];
  title = titleAdj
    .concat(" " + titleNoun)
    .concat(" " + titleVerb)
    .concat(" " + titleAdverb);
}

function infoDisplay() {
  //Title Block in left bottom corner
  fill(255); // white for rectangle
  noStroke();
  rect(5, height - 50, 360, 45);
  textSize(15);
  fill(0); // black text
  noStroke(); //no border on text
  text(title, 10, height - 30);

  //Color tracker rectangle
  fill(r, g, b);
  rect(10, height - 20, 25, 10);

  //Text for x, y, t
  fill(0);
  noStroke();
  text("x: " + x0, 40, height - 10);
  text("y: " + y0, 90, height - 10);
  text("t: " + seconds + "s", 140, height - 10);
}
