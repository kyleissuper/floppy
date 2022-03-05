import flappy from "./flappy.js";
import physics from "./physics.js";
import loop from "./loop.js";
import bird from "./bird.js";
import obstacleMaker from "./obstacleMaker.js";
import scoreBoard from "./scoreBoard.js";
import backDrop from "./backDrop.js";

document.addEventListener("DOMContentLoaded", () => {
  flappy.setup(physics, bird, obstacleMaker, scoreBoard, backDrop);
  loop.start(flappy.nextFrame, flappy.renderWithLag);
});
