document.addEventListener("DOMContentLoaded", () => {
  const dino = document.querySelector(".dino");
  const grid = document.querySelector(".grid");
  const alert = document.getElementById("alert");
  let isJumping = false;
  let gravity = 0.9;
  let isGameOver = false;

  const control = (e) => {
    if (e.keyCode === 32) {
      //make dino jumps
      if (!isJumping) {
        isJumping = true;
        jump();
      }
    }
  };

  document.addEventListener("keyup", control);

  let position = 0;
  const jump = () => {
    count = 0;
    let timerId = setInterval(() => {
      //move down
      if (count === 15) {
        clearInterval(timerId);
        let downTimerId = setInterval(() => {
          if (count === 0) {
            clearInterval(downTimerId);
            isJumping = false;
          }
          position -= 5;
          count--;
          position = position * gravity;
          dino.style.bottom = position + "px";
        });
      }

      //move up
      position += 30;
      count++;
      position = position * gravity;
      dino.style.bottom = position + "px";
    }, 20);
  };

  const generateObstacle = () => {
    let randomTime = Math.random() * 4000;

    let obstaclePosition = 1000;
    const obstacle = document.createElement("div");
    if (!isGameOver) obstacle.classList.add("obstacle");
    grid.appendChild(obstacle);
    obstacle.style.left = obstaclePosition + "px";

    let timerId = setInterval(() => {
      if (obstaclePosition > 0 && obstaclePosition < 36 && position < 36) {
        clearInterval(timerId);
        alert.innerHTML = "Game Over";
        isGameOver = true;

        while (grid.firstChild) {
          grid.removeChild(grid.lastChild);
        }
      }
      obstaclePosition -= 10;
      obstacle.style.left = obstaclePosition + "px";
    }, 20);

    if (!isGameOver) {
      setTimeout(generateObstacle, randomTime);
    }
  };

  generateObstacle();
});
