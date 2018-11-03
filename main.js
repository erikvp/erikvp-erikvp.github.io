console.log("p5 sandbox");
let osc1, osc2, osc3;
let playing = false;
// let width = 800;

// let height = 800;
let y = 400;
let angle = 1;
let timer = 0;
let offset = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(width, height);
  backgroundColor = 20;
  textAlign(CENTER);
  angleMode(DEGREES);

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
  osc2.freq(400);
  // osc2.amp(0);
  osc2.amp(0.5, 0.05);
  osc2.start();
  // source, delayTime, feedback, filter frequency
  delay2.process(osc2, 0.9, 0.4, 1800);

  osc3 = new p5.Oscillator();
  delay3 = new p5.Delay();
  osc3.setType("sine");
  osc3.freq(300);
  // osc2.amp(0);
  osc3.amp(0.5, 0.05);
  osc3.start();
  // source, delayTime, feedback, filter frequency
  delay3.process(osc3, 0.9, 0.4, 1800);
}

function draw() {
  background(backgroundColor);
  // text("click to play", width / 2, height / 2);
  drawLines();
  setFreq();
  checkTimer();
}

function mouseClicked() {
  if (!playing) {
    // ramp amplitude to 0.5 over 0.05 seconds
    osc1.amp(0.5, 0.05);
    osc2.amp(0.5, 0.05);
    osc3.amp(0.5, 0.05);
    playing = true;
    backgroundColor = color(10, 10, 10);
  } else {
    // ramp amplitude to 0 over 0.5 seconds
    osc1.amp(0, 0.5);
    osc2.amp(0, 0.5);
    osc3.amp(0, 0.5);
    playing = false;
    backgroundColor = color(200, 10, 25);
  }
}

function setFreq() {
  let freq1 = 200;
  let freq2 = 400;
  let freq3 = 300;

  // freq1 = Math.round(map(mouseY, 0, height, 240, 100));
  // osc1.freq(freq1);

  freq3 = Math.round(
    map(y, windowHeight / 2 - 50, windowHeight / 2 + 50, 200, 400)
  );
  osc3.freq(freq3);

  console.log(`F1: ${freq1} F2: ${freq2} F3: ${freq3}`);
}

function drawLines() {
  y = windowHeight / 2;
  a = 0;
  g = 255;

  stroke(255);
  line(0, windowHeight / 2 - 50, windowWidth, windowHeight / 2 - 50);
  line(0, windowHeight / 2 + 50, windowWidth, windowHeight / 2 + 50);

  y = sin(angle) * offset + windowHeight / 2;
  if (angle >= 360) {
    angle = 0;
    offset = Math.round(random(40, 60));
    console.log(`Offset: ${offset}`);
  } else if (angle >= 88 && angle <= 92) {
    angle += 0.03;
    a = Math.round(random(200, 255));
    g = 255;
  } else if (angle >= 268 && angle <= 272) {
    angle += 0.03;
    a = Math.round(random(200, 255));
    g = 255;
  } else {
    angle += 0.2;
    a = Math.round(random(100, 180));
    g = Math.round(random(150, 220));
    console.log(`Angle: ${angle}  y: ${y}`);
  }

  stroke(20, g, 0, a);
  line(0, y, width, y);
}

function checkTimer() {}
