console.log("p5 sandbox");
let osc1, osc2;
let playing = false;
// let width = 800;

// let height = 800;
let y = 400;
let angle = 1;
let timer = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(width, height);
  backgroundColor = 20;
  textAlign(CENTER);

  osc1 = new p5.Oscillator();
  delay1 = new p5.Delay();
  osc1.setType("sine");
  osc1.freq(200);
  // osc1.amp(0);
  osc1.amp(0.5, 0.05);
  osc1.start();
  // source, delayTime, feedback, filter frequency
  delay1.process(osc1, 0.9, 0.4, 1800);

  osc2 = new p5.Oscillator();
  delay2 = new p5.Delay();
  osc2.setType("sine");
  osc2.freq(200);
  // osc2.amp(0);
  osc2.amp(0.5, 0.05);
  osc2.start();
  // source, delayTime, feedback, filter frequency
  delay2.process(osc2, 0.9, 0.4, 1800);
}

function draw() {
  background(backgroundColor);
  // text("click to play", width / 2, height / 2);
  drawLines();
  setFreq();
  checkTimer();
}

// function mouseClicked() {
//   if (!playing) {
//     // ramp amplitude to 0.5 over 0.05 seconds
//     osc1.amp(0.5, 0.05);
//     osc2.amp(0.5, 0.05);
//     playing = true;
//     backgroundColor = color(10, 10, 10);
//   } else {
//     // ramp amplitude to 0 over 0.5 seconds
//     osc1.amp(0, 0.5);
//     osc2.amp(0, 0.5);
//     playing = false;
//     backgroundColor = color(200, 10, 25);
//   }
// }

function setFreq() {
  let freq1 = 200;
  let freq2 = 200;

  // freq1 = Math.round(map(mouseY, 0, height, 240, 100));
  // osc1.freq(freq1);

  freq2 = Math.round(
    map(y, windowHeight / 2 - 10, windowHeight / 2 + 10, 190, 210)
  );
  osc2.freq(freq2);

  console.log(`Freq 1: ${freq1} Freq 2: ${freq2}`);
}

function drawLines() {
  y = windowHeight / 2;

  stroke(255);
  line(0, windowHeight / 2, windowWidth, windowHeight / 2);

  y = sin(angle) * 10 + windowHeight / 2;
  if (angle > 360) {
    angle = 0;
  } else {
    angle += 0.001;
    console.log(`Angle: ${angle}`);
  }

  line(0, y, width, y);
}

function checkTimer() {}
