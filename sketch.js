var brushColor;
var bgColor;
var drawSize;
var penStyle;
var canvas;

function setup() {
  // creating Canvas
  let canvas = createCanvas(1300, 800);

  //Brush colour property
  brushColor = "#151718";
  document.getElementById("brushColor").value = brushColor;
  document.getElementById("brushColor").onchange = function () {
    brushColor = document.getElementById("brushColor").value;
  };

  document.getElementsByTagName("canvas")[0].style.cursor = "crosshair";
}

function mouseDragged() {
  fill(brushColor);
  stroke(brushColor);
}
