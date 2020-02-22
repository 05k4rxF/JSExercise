window.onload = function() {
  cvs = document.getElementById('canvas');
  ctx = cvs.getContext("2d");
  document.addEventListener("keydown", KeyPush);
  setInterval(game, 1000 / 15);
}
px = py = 10;
gs = tc = 20;
ax = ay = 15;
xv = yv = 0;
trail = [];
tail = 5;

function game() {
  px += xv;
  py += yv;
  if (px < 0) {
    px = tc - 1;
  }
  if (px > tc - 1) {
    px = 0;
  }
  if (py < 0) {
    py = tc - 1;
  }
  if (py > tc - 1) {
    py = 0;
  }
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cvs.width, cvs.height);

  ctx.fillStyle = "lime";
  for (var i = 0; i < trail.length; i++) {
    ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
    if (trail[i].x == px && trail[i].y == py) {
      tail = 5;
    }
  }
  if (ax == px && ay == py) {
    tail++;
    ax = Math.floor(Math.random() * tc);
    ay = Math.floor(Math.random() * tc);
  }
  trail.push({
    x: px,
    y: py
  });
  while (trail.length > tail) {
    trail.shift();
  }

  ctx.fillStyle = "red";
  ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
}

function KeyPush(evt) {
  switch (evt.keyCode) {
    case 37:
      xv = -1;
      yv = 0
      break;
    case 38:
      xv = 0;
      yv = -1
      break;
    case 39:
      xv = 1;
      yv = 0
      break;
    case 40:
      xv = 0;
      yv = 1
      break;
  }
}
