console.log("Revisions: Cow");
// A bright green cow. I can hear it screaming. I'm hungry for spinach

let width = window.innerWidth;
let height = window.innerHeight;

if (window.innerWidth > window.innerHeight) {
  width = height; // available width in browser
} else {
  height = width;
}

// array to store rgb values for each pixel block
let whiteArr = [];

let pixelRow = 20;
let pixelHeight = 20;
let pixelW = Math.round(width / pixelRow); // width of each pixel block
let pixelH = Math.round(height / pixelHeight); // height of each pixel block
let pixelQty = pixelRow * pixelHeight; //total number of pixels

let cowImg;
function preload() {
  cowImg = loadImage("assets/cow800.jpg");
}

function setup() {
  createCanvas(width, height);
  // imageMode(CENTER);
}

function draw() {
  background(255);
  let delta = 4;
  frameRate(5);
  image(cowImg, 0, 0, width, height);

  for (let y = 0; y < pixelHeight; y++) {
    for (let x = 0; x < pixelRow; x++) {
      // top green rectangle covering cow
      if (y >= 7 && y <= 10 && x >= 5 && x <= 15) {
        let center = Math.round(random(240, 251));
        let r = 20;
        let g = Math.round(random(center - delta, center + delta));
        let b = 20;

        let a = Math.round(random(100, 150));
        let x0 = x * pixelW;
        let y0 = y * pixelH;
        whiteArr.push(new pixelBlock(r, g, b, a, x0, y0));

        // bottom green rectangle covering cow
      } else if (y >= 11 && y <= 14 && x >= 4 && x <= 14) {
        let center = Math.round(random(240, 251));
        let r = 20;
        let g = Math.round(random(center - delta, center + delta));
        let b = 20;

        let a = Math.round(random(100, 150));
        let x0 = x * pixelW;
        let y0 = y * pixelH;
        whiteArr.push(new pixelBlock(r, g, b, a, x0, y0));

        // white rectangles covering rest of image surrounding cow
      } else {
        let center = Math.round(random(240, 251));
        let r = Math.round(random(center - delta, center + delta));
        let g = r;
        let b = r;
        let a = Math.round(random(20, 50));
        let x0 = x * pixelW;
        let y0 = y * pixelH;
        whiteArr.push(new pixelBlock(r, g, b, a, x0, y0));
      }
    }
  }
  // console.table(whiteArr);

  for (let i = 0; i < pixelQty; i++) {
    whiteArr[i].renderPixels();
  }
  whiteArr.length = 0;
  renderText();
}

class pixelBlock {
  constructor(r, g, b, a, x0, y0) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.x0 = x0;
    this.y0 = y0;
  }
  renderPixels() {
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    rect(this.x0, this.y0, pixelW, pixelH);
  }
}

function renderText() {
  let fontSize = Math.round(width / 20);
  let line1x = pixelW * 2;
  let line1y = pixelH * 4;
  let line2x = pixelW * 3;
  let line2y = pixelH * 5.5;
  let line3x = pixelW * 6;
  let line3y = pixelH * 14.5;

  fill(240, 200);
  rect(pixelW * 2, pixelH * 3, pixelW * 11, pixelH * 3);

  noStroke();
  fill(40);
  textSize(fontSize);
  textFont("VT323");
  text(" A bright green C0W", line1x, line1y);
  text("I can hear it  SCREAMING", line2x, line2y);
  text("I'm hungry for SPINACH", line3x, line3y);
}
