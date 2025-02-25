document.addEventListener("DOMContentLoaded", function () {
  let player = document.getElementById("player");
  let playerCar = document.getElementById("player-car");
  let speedDisplay = document.getElementById("speed");
  let isDriving = false;
  let speed = 0;

  // Handle car entry and exit
  window.addEventListener("keydown", function (e) {
      if (e.key === "e") {
          isDriving = !isDriving;
          if (isDriving) {
              player.setAttribute("position", "0 1 0");
              player.setAttribute("camera", "active: false");
              playerCar.appendChild(player);
          } else {
              document.querySelector("a-scene").appendChild(player);
              player.setAttribute("position", "0 1.6 5");
              player.setAttribute("camera", "active: true");
          }
      }
  });

  // Car movement
  window.addEventListener("keydown", function (e) {
      if (!isDriving) return;

      if (e.key === "ArrowUp") speed = Math.min(50, speed + 1);
      if (e.key === "ArrowDown") speed = Math.max(0, speed - 2);
      if (e.key === "ArrowLeft") playerCar.object3D.rotation.y += 0.05;
      if (e.key === "ArrowRight") playerCar.object3D.rotation.y -= 0.05;

      speedDisplay.textContent = speed;
  });

  function updateCarMovement() {
      if (isDriving && speed > 0) {
          let direction = playerCar.object3D.rotation.y;
          playerCar.object3D.position.x -= Math.sin(direction) * (speed / 500);
          playerCar.object3D.position.z -= Math.cos(direction) * (speed / 500);
      }
      requestAnimationFrame(updateCarMovement);
  }
  updateCarMovement();

  // NPC Walking Animation
  AFRAME.registerComponent("npc", {
      tick: function (time, timeDelta) {
          this.el.object3D.position.z += 0.005;
          if (this.el.object3D.position.z > 10) this.el.object3D.position.z = -10;
      },
  });

  // Traffic Cars AI
  AFRAME.registerComponent("traffic", {
      tick: function (time, timeDelta) {
          this.el.object3D.position.z += 0.02;
          if (this.el.object3D.position.z > 10) this.el.object3D.position.z = -30;
      },
  });
});