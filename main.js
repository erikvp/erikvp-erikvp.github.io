console.log("sandbox-p5");

let lines = [];
let numLines = 6;

setup = () => {
  // let canvas = createCanvas(960, 540);
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-container");

  // Line(y, yInc, angle)
  for (let i = 0; i < numLines; i++) {
    let y = random(-70, 0); // start position at top of screen
    let yInc = random(0.2, 1.0); // line speed
    let angle = random(0.0, 2); //start angle for color change
    let x1 = width / 2 - 100; // center of screen - 100
    let x2 = x1 + 200;
    lines.push(new Line(x1, x2, y, yInc, angle));
  }
};

draw = () => {
  background(0); // Set the background to black
  for (let i = 0; i < numLines; i++) {
    lines[i].move();
    lines[i].changeColor();
  }
};

class Line {
  constructor(x1, x2, y, yInc, angle) {
    this.x1 = x1;
    this.x2 = x2;
    this.y = y;
    this.yInc = yInc;
    this.color = 255; //whiteit
    this.angle = angle; //controls sine for color change
  }
  move() {
    //when line scrolls off bottom of screen, start at the top
    this.y <= height ? (this.y += this.yInc) : (this.y = random(-50, 0));
  }

  changeColor() {
    let c = 0;
    let a = 0.0;
    let inc = TWO_PI / 360;

    this.angle <= TWO_PI ? (this.angle += inc) : (this.angle = 0);
    this.color = sin(this.angle);

    if (Math.abs(lines[0].y - lines[5].y) < 5) {
      stroke(10, 230, 22);
      line(this.x1, this.y, this.x2, this.y);
    } else {
      c = Math.round(map(this.color, -1, 1, 30, 255));
      stroke(c);
      strokeWeight(1);
      //line (x1, y1, x2, y2)
      line(this.x1, this.y, this.x2, this.y);
    }
  }
}
