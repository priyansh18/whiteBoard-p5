var pencilColor;
var bgColor;
var drawSize;
var penStyle;
var paint;

function setup() {
  paint = createCanvas(innerWidth - 250, innerHeight);
  pencilColor = "red";
  bgColor = "#c8c8c8";
  drawSize = 3;
  penStyle = "pencil";

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

  document.getElementById("pencil").onchange = function () {
    penStyle = "pencil";
    document.getElementById("pencil").checked = true;
    document.getElementById("eraser").checked = false;
    document.getElementsByTagName("canvas")[0].style.cursor = "hand";
  };

  document.getElementById("eraser").onchange = function () {
    penStyle = "eraser";
    document.getElementById("pencil").checked = false;
    document.getElementById("eraser").checked = true;
    document.getElementsByTagName("canvas")[0].style.cursor = "cell";
  };

  document.getElementById("clearCanvas").onclick = function (e) {
    e.preventDefault();
    if (confirm("Do you want to clear paint")) {
      setup();
      document.body.style.background = "#c8c8c8";
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
  console.log(pencilColor, penStyle, drawSize);
  fill(pencilColor);
  stroke(pencilColor);
  strokeWeight(drawSize);

  if (penStyle === "pencil") {
    line(pmouseX, pmouseY, mouseX, mouseY);
  } else if (penStyle === "eraser") {
    stroke(bgColor);
    fill("#c8c8c8");
    rect(mouseX, mouseY, drawSize / 1.2, drawSize / 1.2);
  }
}
