var radius;
var c;

function setup() {
  createP("Online Tutor");
  // creating Canvas
  let cnv = createCanvas(1200, 700);
  cnv.position(20, 100);
  slider = createSlider(1, 25, 10);
  eraser = createButton("clear");
  eraser.mousePressed(changeBG);
  checkbox = createCheckbox("Eraser", false);
  c = color(255, 0, 0);
  background(0);
  colorMode(RGB);
}

function draw() {
  radius = slider.value();
}

function mouseClicked() {
  if (mouseX > 400) {
    c = get(mouseX, mouseY);
    checkbox.checked(false);
  } else {
    stampRectangle(c);
  }
}

function mouseDragged() {
  if (checkbox.checked()) {
    stroke(255);
  } else {
    stroke(c);
  }
  if (mouseX < 390) {
    strokeWeight(slider.value());
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function changeBG() {
  background(255);
  createColorPicker();
}

function stampRectangle(c) {
  fill(c);
  noStroke();
  rect(mouseX, mouseY, slider.value(), slider.value());
}

function eraserSwitch() {
  //
}
