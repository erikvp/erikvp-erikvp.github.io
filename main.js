console.log("p5 sandbox");
let img, img2;
let pixBlock = [];
let pixBlock2 = [];

function preload() {
  img = loadImage("assets/glitch.jpg");
  img2 = loadImage("assets/video.jpg");
}

function setup() {
  createCanvas(840, 840);
  pixelDensity(1);
  frameRate(2);

  // noLoop();
}

function draw() {
  background(250);
  unmodifiedImage();

  setBlocks();
  renderBlocks();
  makeGrid();
  // scrollLines();
}

function makeGrid() {
  imgH = 420;
  imgW = 840;
  gridW = imgW / 20;
  gridH = imgH / 10;

  for (let y = 0; y < imgH; y += gridH) {
    for (let x = 0; x < imgW; x += gridW) {
      stroke(20);
      line(x, 0, x, imgH);
    }
    line(0, y, imgW, y);
  }
}

function unmodifiedImage() {
  img.loadPixels(); //Loads pixel data for the display window into the img.pixels[] array
  image(img, 0, 0); //place img at x=0, y=0
  img.updatePixels();

  img2.loadPixels(); //Loads pixel data for the display window into the img2.pixels[] array
  image(img2, 420, 0); //place img2 at x=420, y=0
  img2.updatePixels();
}

function setBlocks() {
  let i = 0;
  let w = 42;
  let h = 42;
  let x2_0 = 420;

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      pixBlock[i] = img.get(w * x, h * y, w, h); // starting coord x0, y0, width, height
      pixBlock2[i] = img2.get(w * x, h * y, w, h);
      i++;
    }
  }
}

function renderBlocks() {
  let x0 = 0;
  let y0 = 420;
  let x2_0 = 420;
  let y2_0 = 420;
  let i = Math.floor(random(0, 100)); // random integer 0 to 99

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      pixBlock[i].loadPixels();
      image(pixBlock[i], x0 + 42 * x, y0 + 42 * y);
      pixBlock[i].updatePixels();

      pixBlock2[i].loadPixels();
      image(pixBlock2[i], x2_0 + 42 * x, y2_0 + 42 * y);
      pixBlock2[i].updatePixels();

      // i = Math.floor(random(0, 100));
    }
  }
}

function scrollLines() {
  let a = Math.round(random(20, 50));
  strokeWeight(1);

  if (cy < height / 2) {
    stroke(220, 220, 230, a);
    line(420, cy, 840, cy);
    cy += Math.round(random(4, 39));
  } else {
    cy = 0;
  }
}
