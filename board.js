let pencilColor;
let bgColor;
let drawSize;
let penStyle;
let paint;
let locations;
let lastX;
let lastY;

const penStyles = [
  "pencil",
  "eraser",
  "line",
  "rectangle",
  "circle",
  "oval",
  "square",
];

const cursors = ["hand", "cell", "hand", "hand", "hand", "hand", "hand"];

function drawWithPencil(_pmouseX, _pmouseY, _mouseX, _mouseY) {
  return line(_pmouseX, _pmouseY, _mouseX, _mouseY);
}

function drawWithEraser(bgColor, _mouseX, _mouseY, drawSize) {
  const factor = 1.2;
  stroke(bgColor);
  fill(bgColor);
  return rect(_mouseX, _mouseY, drawSize / factor, drawSize / factor);
}

function drawBox(isRectangle, bgColor, pencilColor, lastX, lastY, locations) {
  // erase the last one
  const widthLast = lastX - locations[0][0];
  let heightLast = lastY - locations[0][1];
  heightLast = isRectangle ? heightLast : widthLast;

  stroke(bgColor);
  fill(bgColor);
  rect(locations[0][0], locations[0][1], widthLast, heightLast);

  // draw new one
  const width = locations[1][0] - locations[0][0];
  let height = locations[1][1] - locations[0][1];
  height = isRectangle ? height : width;

  stroke(pencilColor);
  fill(bgColor);
  rect(locations[0][0], locations[0][1], width, height);
}

function drawCircle(isCircle, bgColor, pencilColor, lastX, lastY, locations) {
  // erase old
  ellipseMode(CORNER);
  const xLast = lastX - locations[0][0];
  let yLast = lastY - locations[0][1];
  yLast = isCircle ? xLast : yLast;
  let radius = parseInt(sqrt(xLast ** 2 + yLast ** 2));

  stroke(bgColor);
  fill(bgColor);
  ellipse(locations[0][0], locations[0][1], xLast, yLast);

  // create new
  ellipseMode(CORNER);
  const xnew = locations[1][0] - locations[0][0];
  let ynew = locations[1][1] - locations[0][1];
  ynew = isCircle ? xnew : ynew;
  radius = parseInt(sqrt(xnew ** 2 + ynew ** 2));

  stroke(pencilColor);
  fill(bgColor);
  ellipse(locations[0][0], locations[0][1], xnew, ynew);
}

function drawLine(bgColor, pencilColor, lastX, lastY, locations) {
  // erase old
  stroke(bgColor);
  line(locations[0][0], locations[0][1], lastX, lastY);

  // create new
  stroke(pencilColor);
  line(locations[0][0], locations[0][1], locations[1][0], locations[1][1]);
}

function setup() {
  //  create canvas
  paint = createCanvas(innerWidth - 250, innerHeight);

  // set initial values
  pencilColor = "red";
  bgColor = "#ffffff";
  drawSize = 3;
  penStyle = "pencil";
  locations = [];

  // html tags selection Events
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
    let size = map(document.getElementById("sizeRange").value, 2, 20, 4, 20);
    drawSize = size;
  };

  penStyles.map((pen, index) => {
    document.getElementById(pen).onchange = function () {
      penStyle = pen;

      // set- Checked;
      penStyles.map((pen_style) => {
        document.getElementById(pen_style).checked = false;
        return pen_style;
      });
      document.getElementById(penStyle).checked = true;
      document.getElementsByTagName("canvas")[0].style.cursor = cursors[index];
    };
    return;
  });

  // clear canvas Functionality
  document.getElementById("clearCanvas").onclick = function (e) {
    e.preventDefault();
    if (confirm("Do you want to clear paint")) {
      setup();
      document.body.style.background = "#fff"; // reset to white board
    } else {
      return;
    }
  };

  // window resize Responsiveness
  window.onresize = function () {
    document.getElementsByTagName("canvas")[0].style.width = innerWidth - 250;
    document.getElementsByTagName("canvas")[0].style.height = innerHeight;
  };
}

function mouseDragged() {
  fill(pencilColor);
  stroke(pencilColor);
  strokeWeight(drawSize);

  let _pmouseX = parseInt(pmouseX);
  let _pmouseY = parseInt(pmouseY);
  let _mouseX = parseInt(mouseX);
  let _mouseY = parseInt(mouseY);

  // storing first and last mouse positions and getting the last position of mouse as well
  if (locations.length == 2) {
    [lastX, lastY] = locations.pop();
    locations.push([_pmouseX, _pmouseY]);
  } else {
    [lastX, lastY] = [_pmouseX, _pmouseY];
    locations.push([_pmouseX, _pmouseY]);
  }

  if (locations.length >= 2) {
    switch (penStyle) {
      case "pencil":
        drawWithPencil(_pmouseX, _pmouseY, _mouseX, _mouseY);
        break;

      case "eraser":
        drawWithEraser(bgColor, _mouseX, _mouseY, drawSize);
        break;

      case "rectangle":
        drawBox(true, bgColor, pencilColor, lastX, lastY, locations);
        break;
      case "square":
        drawBox(false, bgColor, pencilColor, lastX, lastY, locations);
        break;
      case "circle":
        drawCircle(true, bgColor, pencilColor, lastX, lastY, locations);
        break;
      case "oval":
        drawCircle(false, bgColor, pencilColor, lastX, lastY, locations);
        break;
      case "line":
        drawLine(bgColor, pencilColor, lastX, lastY, locations);
        break;
      default:
        break;
    }
  }
}

function mouseReleased() {
  locations = [];
}
