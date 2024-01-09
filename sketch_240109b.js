
let cracks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  background(0); // Redraw background to create a dynamic effect

  for (let crack of cracks) {
    expandCrack(crack);
    drawCrack(crack);
  }
}

function mouseClicked() {
  let crack = {
    segments: [{ x: mouseX, y: mouseY }], // Start with a single segment
    color: color(random(255), random(255), random(255)), // Random color
    expanding: true
  };
  cracks.push(crack);
}

function expandCrack(crack) {
  if (!crack.expanding) return;

  let lastSegment = crack.segments[crack.segments.length - 1];
  let newX = lastSegment.x + random(-20, 20);
  let newY = lastSegment.y + random(-20, 20);

  // Check if the new segment is outside the canvas
  if (newX < 0 || newX > width || newY < 0 || newY > height) {
    crack.expanding = false; // Stop expanding this crack
  } else {
    crack.segments.push({ x: newX, y: newY });
  }
}

function drawCrack(crack) {
  for (let i = 0; i < crack.segments.length - 1; i++) {
    let segmentStart = crack.segments[i];
    let segmentEnd = crack.segments[i + 1];

    stroke(crack.color);
    strokeWeight(random(1, 4)); // Varying stroke weight for each segment
    line(segmentStart.x, segmentStart.y, segmentEnd.x, segmentEnd.y);
  }
}
