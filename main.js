console.log("Video Test Pattern v3");
let img, img2;
let pixBlock = [];
let pixBlock2 = [];
// let width = window.innerWidth;
// let height = window.innerHeight;

// if (window.innerWidth > window.innerHeight) {
//   width = height; // available width in browser
// } else {
//   height = width;
// }

function preload() {
  img = loadImage("assets/glitch.jpg"); //glitchy test pattern
  img2 = loadImage("assets/video.jpg"); //defective graphic card display
}

function setup() {
  createCanvas(840, 840);
  pixelDensity(1);
  frameRate(2);

  // noLoop();
}

function draw() {
  background(240);
  loadReferenceImages(); // load reference images in the top two squares
  getPixelBlocks(); // store both reference images as arrays (pixBlock, pixBlock2)
  renderBlocks();
  makeGrid();
}

function loadReferenceImages() {
  img.loadPixels(); //Loads pixel data for the display window into the img.pixels[] array
  image(img, 0, 0); //place img at x=0, y=0
  img.updatePixels();

  img2.loadPixels(); //Loads pixel data for the display window into the img2.pixels[] array
  image(img2, 420, 0); //place img2 at x=420, y=0
  img2.updatePixels();
}

function getPixelBlocks() {
  let i = 0; //array index
  let w = 42; //horizontal block size 420 / 10 (image width / # of grid blocks)
  let h = 42; //vertical block size  420 / 10 (image height / # of grid blocks)
  let x0_img2 = 420; //x0 location of img2 (video.jpg)
  let y0_img2 = 0; //y0 location of img2

  /* img.get stores the reference image pixel data for each grid block
  e.g pixBlock[0] is the pixel data at the first grid block in upper left corner 
  Each array, pixBlock and pixBlock2 contain pixel data for each of the 100 grid blocks
  IMPORTANT:  img2 is located at x=0, y=0 and not related to it's location within the canvas
  at x = 420, y = 0.  Use x=0, y=0 when reading values into the pixBlock2 array.
  DO NOT USE x/y of 420, 0 
  */

  for (let y = 0; y < 10; y++) {
    //
    for (let x = 0; x < 10; x++) {
      pixBlock[i] = img.get(w * x, h * y, w, h); // get data at each grid block
      pixBlock2[i] = img2.get(w * x, h * y, w, h); //img2 also uses x0 = 0, y0 = 0 as origin
      i++; // array index is 0 to 99 since there are 100 grid blocks
    }
  }
}

/* Render a random block from img1,2 and display across the lower half of the canvas

*/
function renderBlocks() {
  //let x0 = 0;
  let y0 = 420;
  let x0_img2 = 420; // x0 location for rendering img2
  let y0_img2 = 420; // y0 location for rendering img2
  let i = Math.floor(random(0, 100)); // random integer 0 to 99
  let j = Math.floor(random(0, 100)); // random integer 0 to 99

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      pixBlock[i].loadPixels();
      image(pixBlock[i], 42 * x, y0 + 42 * y);
      pixBlock[i].updatePixels();
      pixBlock2[j].loadPixels();
      image(pixBlock2[j], x0_img2 + 42 * x, y0_img2 + 42 * y);
      pixBlock2[j].updatePixels();
    }
  }
}

/* Draw a grid for the top two reference images (img, img2) */
function makeGrid() {
  imgH = 420; //image height
  imgW = 840; //image width
  gridW = imgW / 20; //sets grid spacing
  gridH = imgH / 10; //sets grid spacing

  for (let y = 0; y < imgH; y += gridH) {
    for (let x = 0; x < imgW; x += gridW) {
      stroke(20);
      line(x, 0, x, imgH);
    }
    line(0, y, imgW, y);
  }
}
