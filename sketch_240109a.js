let video;
let vScale = 16;
let currentColor;
let lastColorChangeTime = 0;
let colorChangeInterval = 300; // 0.3 seconds

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  video.hide();
  currentColor = color(255); // Start with white color
}

function draw() {
  background(51);
  video.loadPixels();

  let totalBrightness = 0;

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      let bright = (r + g + b) / 3;
      totalBrightness += bright;

      let mappedBright = map(bright, 0, 255, 0, 1);
      drawOrganicLine(x * vScale, y * vScale, mappedBright, currentColor);
    }
  }

  // Determine the average brightness
  let avgBrightness = totalBrightness / (video.width * video.height);
  
  // Check if it's time to change the color
  if (millis() - lastColorChangeTime > colorChangeInterval) {
    if (avgBrightness > 127) { // High noise
      currentColor = color(random(255), random(255), random(255)); // Random bright color
    } else { // Low noise
      currentColor = color(255); // White
    }
    lastColorChangeTime = millis();
  }
}

function drawOrganicLine(x, y, bright, col) {
  push();
  translate(x, y);
  stroke(col);
  noFill();

  beginShape();
  for (let i = 0; i < 1; i += 0.1) {
    let offsetX = map(noise(i, bright * 5), 0, 1, -vScale, vScale);
    let offsetY = map(noise(i, bright * 5 + 100), 0, 1, -vScale, vScale);
    curveVertex(i * vScale + offsetX, offsetY);
  }
  endShape();
  pop();
}
