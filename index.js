const canvasWidth = 200;
const canvasHeight = 200;

const getPolygonPoints = (numOfSides, radius) => {
  if (numOfSides < 0 || radius < 0) {
    return false;
  }

  let points = [];

  for (i = 0; i < numOfSides; i++) {
    const angle = (Math.PI * 2 * i) / numOfSides;
    const x = radius * Math.cos(angle) + canvasWidth / 2;
    const y = radius * Math.sin(angle) + canvasHeight / 2;

    points.push({ x: x, y: y });
  }

  return points;
};

const drawPolygon = (points) => {
  if (!points) {
    return;
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Clear canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Fill colors
  ctx.fillStyle = "#FFFFFF";

  // Move to first point
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  // Draw line between rest of polygon points
  for (var i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }

  // Draw line between last point and first point to close the path
  ctx.closePath();
  ctx.fill();
};

const initDefaultPolygon = () => {
  const sides = 3;
  const radius = 80;

  document.querySelector(".sides").value = sides;
  document.querySelector(".radius").value = radius;

  drawPolygon(getPolygonPoints(sides, radius));
};

const createPolygonFromInputHandler = () => {
  const sidesInput = document.querySelector(".sides");
  const radiusInput = document.querySelector(".radius");

  sidesInput.addEventListener("input", () => {
    drawPolygon(getPolygonPoints(sidesInput.value, radiusInput.value));
  });

  radiusInput.addEventListener("input", () => {
    drawPolygon(getPolygonPoints(sidesInput.value, radiusInput.value));
  });
};

(function () {
  createPolygonFromInputHandler();
  initDefaultPolygon();
})();
