// by SamuelYAN
// more works //
// https://twitter.com/SamuelAnn0924
// https://www.instagram.com/samuel_yan_1990/
let prevSpecValues = [];
var seed = Math.random() * 643.864;
var t;
var num, vNum;
var radius, mySize, margin;
var sizes = [];
let mic;
let fft;

let colors = [];
let colors0 = "281914-1a1a1a-202020-242e30".split("-").map((a) => "#" + a);
let colors2 = "7382ce-9fb7f4-12177d-9bb5e9-7486af"
  .split("-")
  .map((a) => "#" + a);
let colors3 = "82d362-5c5190-6c6dd1-3d6966-5967ca"
  .split("-")
  .map((a) => "#" + a);
let colors4 = "8c75ff-c553d2-2dfd60-2788f5-23054f"
  .split("-")
  .map((a) => "#" + a);
let colors5 = "f21252-8834f1-c4dd92-184fd3-f9fee2"
  .split("-")
  .map((a) => "#" + a);
let colors6 = "2E294E-541388-F1E9DA-FFD400-D90368"
  .split("-")
  .map((a) => "#" + a);
let colors7 = "fefefe-fffffb-fafdff-fef9fb-f7fcfe"
  .split("-")
  .map((a) => "#" + a);
let colors8 = "8c75ff-c553d2-2dfd60-2788f5-23054f-f21252-8834f1-c4dd92-184fd3-f9fee2-2E294E-541388-F1E9DA-FFD400-D90368-e9baaa-ffa07a-164555-ffe1d0-acd9e7-4596c7-6d8370-e45240-21d3a4-3303f9-cd2220-173df6-244ca8-a00360-b31016"
  .split("-")
  .map((a) => "#" + a);
let colors11 = "025159-3E848C-7AB8BF-C4EEF2-A67458"
  .split("-")
  .map((a) => "#" + a);
let colors12 = "10454F-506266-818274-A3AB78-BDE038"
  .split("-")
  .map((a) => "#" + a);
let colors13 = "D96690-F28DB2-F2C9E0-89C2D9-88E8F2"
  .split("-")
  .map((a) => "#" + a);
var color_setup1, color_setup2;
let color_bg;
let v_planet = [];

function setup() {
  // 创建麦克风对象并启动
  mic = new p5.AudioIn();
  mic.start();

  // 创建FFT对象并设置输入为麦克风
  fft = new p5.FFT();
  fft.setInput(mic);

  randomSeed(seed);
  // frameRate(50);
  // pixelDensity(5);
  mySize = min(windowWidth, windowHeight);
  margin = mySize / 100;
  createCanvas(mySize, mySize, WEBGL);
  color_setup1 = colors7;
  color_setup2 = random([
    colors4,
    colors5,
    colors6,
    colors8,
    colors11,
    colors2,
    colors12,
    colors3,
    colors13,
  ]);
  color_bg = "#202020";
  background(color_bg);
  // num = 50;
  num = int(random(40, 20));
  radius = mySize * 0.75;
  for (let a = 0; a < TAU; a += TAU / num) {
    sizes.push(random(0.1, 0.5));
  }
  t = 0;
}

function draw() {
  randomSeed(seed);
  background(color_bg);

  let spectrum = fft.analyze();

  for (let i = 0; i < num; i++) {
    let a = (TAU / num) * i;
    let specIndex = Math.floor(map(i, 0, num, 0, spectrum.length));
    let specValue = map(spectrum[specIndex], 0, 255, 1, 10) / 1.5;

    if (prevSpecValues[i] === undefined) {
      prevSpecValues[i] = specValue;
    }

    let smoothSpecValue = lerp(prevSpecValues[i], specValue, 0.1);
    prevSpecValues[i] = smoothSpecValue;

    let scaleFactor = map(i, 0, num, 0.5, 2); // 根据 i 的值在 0.5 到 2 之间映射缩放因子
    let adjustedSmoothSpecValue = smoothSpecValue * scaleFactor;

    let x =
      ((radius * sin(a + t)) / random(5, 2) / 1.0) * adjustedSmoothSpecValue;
    let y =
      ((radius * cos(a + t)) / random(2, 5) / 1.0) * adjustedSmoothSpecValue;
    v_planet[i] = createVector(x, y);
  }

  push();
  // translate(width / 2, height / 2);

  for (let q = 0; q < 1 / 5; q += random(0.01, 0.02)) {
    for (let j = 0; j < 1; j++) {
      rotateX(sin(-t) / 100 + q / random(75, 100) / 10);
      rotateY(sin(t) / 100 + q / random(75, 100) / 10);
      rotateZ(sin(-t) / 100 + q / random(75, 100) / 10);
      noFill();
      strokeWeight(2 * random(0.2, 0.6));
      stroke(random(color_setup2));

      beginShape();
      // curveVertex(v_planet[0].x, v_planet[0].y);
      for (let i = 0; i < num; i++) {
        let d = random(radius / 2, radius / 8);
        let x_plus = (0.005 * random(-d, d)) / 1;
        let y_plus = (0.005 * random(-d, d)) / 1;
        let z_plus = (0.005 * random(-d, d)) / 1;
        curveVertex(
          v_planet[i].x + x_plus,
          v_planet[i].y + y_plus,
          random(-100, 100) + z_plus
        );
      }
      // curveVertex(v_planet[num - 1].x, v_planet[num - 1].y);
      endShape(CLOSE);

      for (let i = 0; i < num; i += 2) {
        let d = (1.5 + sin(t)) * random(radius / 2, radius / 4);
        let x_plus = (0.25 * random(-d, d)) / 1;
        let y_plus = (0.25 * random(-d, d)) / 1;
        let z_plus = (2 * random(-d, d)) / 1;

        let specIndex = Math.floor(map(i, 0, num, 0, spectrum.length));
        let specValue = map(spectrum[specIndex], 0, 255, 1, 10);

        noStroke();
        // strokeWeight(random(0.1));
        fill(random(color_setup2));
        push();
        translate(v_planet[i].x + x_plus, v_planet[i].y + y_plus, z_plus);
        rotateX(t);
        rotateY(t);
        rotateZ(t);
        sphere(random(3) * specValue);
        pop();
      }
    }
  }
  pop();

  t += 2 * random(0.001, 0.005);
}

function keyTyped() {
  if (key === "s" || key === "S") {
    saveCanvas("0701_Emotional lines_01_2022", "png");
  }
}
