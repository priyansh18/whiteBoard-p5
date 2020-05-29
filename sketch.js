var pencilColor;
var bgColor;
var drawSize;
var penStyle;
var paint;
var locations;

function setup() {
  paint = createCanvas(innerWidth - 250, innerHeight);
  pencilColor = "red";
  bgColor = "#ffffff";
  drawSize = 3;
  penStyle = "pencil";
  locations = [];

  document.getElementsByTagName("canvas")[0].style.cursor = "hand";

  document.getElementById("colors").onclick = function (e) {
    const color = e.target.dataset.color;
    pencilColor = color;
  };

  document.getElementById("bg-colors").onclick = function (e) {
    const color = e.target.dataset.color;
    bgColor = color;
    document.body.style.background = bgColor;
  };
  document.getElementById("sizeRange").onchange = function () {
    var size = map(document.getElementById("sizeRange").value, 2, 20, 4, 20);
    drawSize = size;
  };

  //------------------Pen Type-----------------//

  document.getElementById("pencil").onchange = function () {
    penStyle = "pencil";
    document.getElementById("pencil").checked = true;
    document.getElementById("eraser").checked = false;
    document.getElementById("line").checked = false;
    document.getElementById("rectangle").checked = false;
    document.getElementById("circle").checked = false;
    document.getElementById("oval").checked = false;
    document.getElementById("square").checked = false;
    document.getElementsByTagName("canvas")[0].style.cursor = "hand";
  };

  document.getElementById("eraser").onchange = function () {
    penStyle = "eraser";
    document.getElementById("eraser").checked = true;
    document.getElementById("pencil").checked = false;
    document.getElementById("line").checked = false;
    document.getElementById("rectangle").checked = false;
    document.getElementById("circle").checked = false;
    document.getElementById("oval").checked = false;
    document.getElementById("square").checked = false;
    document.getElementsByTagName("canvas")[0].style.cursor = "cell";
  };
  document.getElementById("line").onchange = function () {
    penStyle = "line";
    document.getElementById("line").checked = true;
    document.getElementById("pencil").checked = false;
    document.getElementById("eraser").checked = false;
    document.getElementById("rectangle").checked = false;
    document.getElementById("circle").checked = false;
    document.getElementById("oval").checked = false;
    document.getElementById("square").checked = false;
    document.getElementsByTagName("canvas")[0].style.cursor = "hand";
  };
  document.getElementById("circle").onchange = function () {
    penStyle = "circle";
    document.getElementById("circle").checked = true;
    document.getElementById("rectangle").checked = false;
    document.getElementById("pencil").checked = false;
    document.getElementById("eraser").checked = false;
    document.getElementById("line").checked = false;
    document.getElementById("oval").checked = false;
    document.getElementById("square").checked = false;
    document.getElementsByTagName("canvas")[0].style.cursor = "hand";
  };
  document.getElementById("rectangle").onchange = function () {
    penStyle = "rectangle";
    document.getElementById("rectangle").checked = true;
    document.getElementById("pencil").checked = false;
    document.getElementById("eraser").checked = false;
    document.getElementById("line").checked = false;
    document.getElementById("circle").checked = false;
    document.getElementById("oval").checked = false;
    document.getElementById("square").checked = false;
    document.getElementsByTagName("canvas")[0].style.cursor = "hand";
  };
  document.getElementById("oval").onchange = function () {
    penStyle = "oval";
    document.getElementById("oval").checked = true;
    document.getElementById("pencil").checked = false;
    document.getElementById("eraser").checked = false;
    document.getElementById("line").checked = false;
    document.getElementById("rectangle").checked = false;
    document.getElementById("circle").checked = false;
    document.getElementById("square").checked = false;
    document.getElementsByTagName("canvas")[0].style.cursor = "hand";
  };
  document.getElementById("square").onchange = function () {
    penStyle = "square";
    document.getElementById("square").checked = true;
    document.getElementById("pencil").checked = false;
    document.getElementById("eraser").checked = false;
    document.getElementById("line").checked = false;
    document.getElementById("rectangle").checked = false;
    document.getElementById("circle").checked = false;
    document.getElementById("oval").checked = false;
    document.getElementsByTagName("canvas")[0].style.cursor = "hand";
  };

  document.getElementById("clearCanvas").onclick = function (e) {
    e.preventDefault();
    if (confirm("Do you want to clear paint")) {
      setup();
      document.body.style.background = "#fff";
    } else {
      return;
    }
  };

  window.onresize = function () {
    document.getElementsByTagName("canvas")[0].style.width = innerWidth - 250;
    document.getElementsByTagName("canvas")[0].style.height = innerHeight;
  };
}

function mouseDragged() {
  // console.log(pencilColor, penStyle, drawSize);
  fill(pencilColor);
  stroke(pencilColor);
  strokeWeight(drawSize);
  if (locations.length == 2) {
    locations.pop();
    locations.push([mouseX, mouseY]);
  } else {
    locations.push([mouseX, mouseY]);
  }

  if (locations.length >= 2) {
    if (penStyle === "pencil") {
      line(pmouseX, pmouseY, mouseX, mouseY);
    } else if (penStyle === "eraser") {
      stroke(bgColor);
      fill("#c8c8c8");
      rect(mouseX, mouseY, drawSize / 1.2, drawSize / 1.2);
    } else if (penStyle === "rectangle") {
      stroke(pencilColor);
      fill(bgColor);
      const width = locations[1][0] - locations[0][0];
      const height = locations[1][1] - locations[0][1];
      console.log(width, height);
      rect(locations[0][0], locations[0][1], width, height);
    } else if (penStyle === "circle") {
      stroke(pencilColor);
      fill(bgColor);
      const radius = locations[1][0] - locations[0][0];
      ellipse(locations[0][0], locations[0][1], radius / 2, radius / 2);
      // ellipse(locations[0][0], locations[0][1], 2 * radius);
    }
  }
}

function mouseReleased() {
  locations = [];
}
