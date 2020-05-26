var radius;
var c;

function setup() {
  // creating Canvas
  let cnv = createCanvas(1300, 800);
  cnv.position(280, 0);
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
  if (mouseX > 1300) {
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
  if (mouseX < 250) {
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
