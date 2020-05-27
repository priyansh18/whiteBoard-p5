var brushColor;
var bgColor;
var drawSize;
var penStyle;
var canvas;

function setup() {
  // creating Canvas
  let canvas = createCanvas(1300, 800);

  //----------------Brush colour property----------------//
  brushColor = "#151168";
  //Getting Element
  document.getElementById("brushColor").value = brushColor;
  //Implement Event Handler on brush colour
  document.getElementById("brushColor").onchange = function () {
    brushColor = document.getElementById("brushColor").value;
  };

  //----------------Background colour property-----------//
  bgColor = "#c8c8c8";
  // Getting Element
  document.getElementById("bgColor").value = bgColor;
  //Implement Event Handler on brush colour
  document.getElementById("bgColor").onchange = function () {
    bgColor = document.getElementById("bgColor").value;
    document.body.style.background = bgColor;
  };

  document.getElementsByTagName("canvas")[0].style.cursor = "crosshair";
}

function mouseDragged() {
  fill(brushColor);
  stroke(brushColor);
}
