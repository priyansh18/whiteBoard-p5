
function setup() {
  // creating Canvas
  let canvas = createCanvas(1300, 800);

  //----------------Brush colour property----------------//
   var brushColor = "#151168";
  //Getting Element
  document.getElementById("brushColor").value = brushColor;
  //Implement Event Handler on brush colour
  document.getElementById("brushColor").onchange = function () {
    brushColor = document.getElementById("brushColor").value;
  };

  //----------------Background colour property-----------//
  var bgColor = "#c8c8c8";
  // Getting Element
  document.getElementById("bgColor").value = bgColor;
  //Implement Event Handler on brush colour
  document.getElementById("bgColor").onchange = function () {
    bgColor = document.getElementById("bgColor").value;
    document.body.style.background = bgColor;
  };

  //----------------Size Slider property-----------//
  var drawSize = 4
  //Implementing Event Handler on Size slider
  document.getElementById('sizeslider').onchange = function(){
		var size = map(document.getElementById('sizeslider').value(2,25,4,25));
		drawSize = size;

  document.getElementsByTagName("canvas")[0].style.cursor = "crosshair";
}

function mouseDragged() {
  fill(brushColor);
  stroke(brushColor);
}
