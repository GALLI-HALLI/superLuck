import { TPlayerBall, TGameCanvas } from "../types/bombGameTypes";

export function isWallCollision(
  playerBall: TPlayerBall,
  canvas: TGameCanvas,
  ballRad: number
) {
  let tempX: number = playerBall.x;
  let tempY: number = playerBall.y;

  if (tempY - ballRad <= 0) {
    //천장
    tempY = ballRad;
    console.log("hit top");
  } else if (tempY + ballRad >= canvas.height) {
    //바닥
    tempY = canvas.height - ballRad;
    console.log("hit bottom");
  }

  if (tempX - ballRad <= 0) {
    //왼쪽 벽
    tempX = ballRad;
    console.log("hit left");
  } else if (tempX + ballRad >= canvas.width) {
    //오른쪽 벽
    tempX = canvas.width - ballRad;
    console.log("hit right");
  }
  // console.log(joystickData.moveX, joystickData.moveY)
  return [tempX, tempY];
}

export function isBallCollision(
  ball1: TPlayerBall,
  ball2: TPlayerBall,
  ballRad: number
) {
  const radiusSum = ballRad * 2;
  const dx = ball2.x - ball1.x;
  const dy = ball2.y - ball1.y;
  // console.log(gameData.x, gameData.y)

  if (radiusSum * radiusSum > dx * dx + dy * dy) {
    //ball collide
    return true;
  } else {
    return false;
  }
}

export function adjustPosition(
  ball1: TPlayerBall,
  ball2: TPlayerBall,
  ballRad: number
) {
  const radiusSum = ballRad * 2;
  const dx = ball2.x - ball1.x;
  const dy = ball2.y - ball1.y;

  const degree = Math.abs(Math.atan(dy / dx));
  const ballsDistance = Math.sqrt(dx ** 2 + dy ** 2);
  const hypotenuse = (radiusSum - ballsDistance) / 2;

  const adjustX = Math.cos(degree) * hypotenuse;
  const adjustY = Math.sin(degree) * hypotenuse;

  let xDirection;
  let yDirection;

  if (ball2.x <= ball1.x && ball2.y <= ball1.y) {
    xDirection = 1;
    yDirection = 1;
  } else if (ball2.x >= ball1.x && ball2.y <= ball1.y) {
    xDirection = -1;
    yDirection = 1;
  } else if (ball2.x >= ball1.x && ball2.y >= ball1.y) {
    xDirection = -1;
    yDirection = -1;
  } else if (ball2.x <= ball1.x && ball2.y >= ball1.y) {
    xDirection = 1;
    yDirection = -1;
  } else {
    console.log("문제가 있습니다");
    xDirection = 1;
    yDirection = 1;
  }

  return [adjustX * xDirection, adjustY * yDirection];
}
