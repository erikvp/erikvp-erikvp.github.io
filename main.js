console.log("Revisions: Pixel Canvas Matrix");

let width = window.innerWidth;
let height = window.innerHeight;

if (window.innerWidth > window.innerHeight) {
  width = height; // available width in browser
} else {
  height = width;
}

let fNum = 0; // file number
let loopNum = 1;

let pixelCanvasRow = 10; // number of canvases per row
let pixelCanvasCol = 10; // number of canvases per column
let pixelsRow = 20;
let pixelsCol = 20;
let pixelCanvasW = Math.round(width / pixelCanvasRow); // pixel canvas width
let pixelCanvasH = Math.round(height / pixelCanvasCol); // pixel canvas height
let pixelW = Math.round(pixelCanvasW / pixelsRow); // pixel width
let pixelH = Math.round(pixelCanvasH / pixelsCol); // pixel height
console.log(`pixelW: ${pixelW}, pixelH: ${pixelH}`);

function setup() {
  createCanvas(width, height);
  frameRate(1);
  // noLoop();
}

function draw() {
  // let r = Math.round(random(0, 255));
  // let g = Math.round(random(0, 255));
  // let b = Math.round(random(0, 255));
  background(250);

  //let delta = 4;
  for (let y = 0; y < pixelCanvasW * pixelCanvasCol; y += pixelCanvasW) {
    for (let x = 0; x < pixelCanvasH * pixelCanvasRow; x += pixelCanvasH) {
      renderStripe1(x, y);
      renderStripe2(x, y);
      renderStripe3(x, y);
      mask(x, y);
    }
  }

  // saveCanvas("b" + fNum, "png");
  // fNum++;

  // if (loopNum >= 10) {
  //   noLoop();
  //   console.log("END");
  // } else {
  //   loopNum++;
  // }
}

function renderStripe1(cX, cY) {
  let r = Math.round(random(0, 255));
  let g = Math.round(random(0, 255));
  let b = Math.round(random(0, 255));
  let a = Math.round(random(200, 255));
  let xW = Math.round(random(1, 15));
  let x0 = pixelW * Math.round(random(0, 19 - xW));
  let x1 = x0 + pixelW * xW;

  console.log(`xW: ${xW} x0: ${x0} x1: ${x1}`);
  fill(r, g, b, 255);
  rect(cX, cY, pixelCanvasW, pixelCanvasH);

  r = Math.round(random(0, 255));
  g = Math.round(random(0, 255));
  b = Math.round(random(0, 255));
  // Rows 0 - 6
  for (let y = pixelH * 0; y < pixelH * 6; y += pixelH) {
    for (let x = x0; x < x1; x += pixelW) {
      let pixel = Math.round(random(1, 10));
      // displays 30% of pixels
      if (pixel <= 3) {
        noStroke();
        fill(r, g, b, a);
        rect(cX + x, cY + y, pixelW, pixelH);
        // console.log(x, y, r, g, b, a);
      }
    }
  }
}

function renderStripe2(cX, cY) {
  let r = Math.round(random(0, 255));
  let g = Math.round(random(0, 255));
  let b = Math.round(random(0, 255));
  let a = Math.round(random(200, 255));
  let xW = Math.round(random(1, 15));
  let x0 = pixelW * Math.round(random(0, 19 - xW));
  let x1 = x0 + pixelW * xW;

  for (let y = pixelH * 7; y < pixelH * 13; y += pixelH) {
    for (let x = x0; x < x1; x += pixelW) {
      let pixel = Math.round(random(1, 10));
      if (pixel <= 3) {
        noStroke();
        fill(r, g, b, a);
        rect(cX + x, cY + y, pixelW, pixelH);
        // console.log(x, y, r, g, b, a);
      }
    }
  }
}

function renderStripe3(cX, cY) {
  let r = Math.round(random(0, 255));
  let g = Math.round(random(0, 255));
  let b = Math.round(random(0, 255));
  let a = Math.round(random(200, 255));
  let xW = Math.round(random(1, 15));
  let x0 = pixelW * Math.round(random(0, 19 - xW));
  let x1 = x0 + pixelW * xW;

  console.log(`STRIPE3 - xW: ${xW} x0: ${x0} x1: ${x1}`);

  for (let y = pixelH * 14; y < pixelH * 20; y += pixelH) {
    for (let x = x0; x < x1; x += pixelW) {
      let pixel = Math.round(random(1, 10));
      if (pixel <= 3) {
        noStroke();
        fill(r, g, b, a);
        rect(cX + x, cY + y, pixelW, pixelH);
        console.log(x, y, r, g, b, a);
      }
    }
  }
}

function mask(cX, cY) {
  let maskNum = Math.round(random(0, 9));

  if (maskNum < 3) {
    fill(240, 255);
    rect(cX, cY, pixelCanvasW, pixelCanvasH);
    console.log(`whitemask @ ${cX} ${cY}`);
  } else if (maskNum > 8) {
    fill(20, 255);
    rect(cX, cY, pixelCanvasW, pixelCanvasH);
    console.log(`black mask @ ${cX} ${cY}`);
  }
}
