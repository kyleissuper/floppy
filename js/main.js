import { flappy } from "./flappy.js";
import { physics } from "./physics.js";
import { loop } from "./loop.js";
import { bird } from "./bird.js";
import { obstacleMaker } from "./obstacleMaker.js";


document.addEventListener("DOMContentLoaded", function loadGame() {
  flappy.setup(physics, bird, obstacleMaker);
  flappy.newGame();
  loop.start(flappy.nextFrame, flappy.renderWithLag);
});
