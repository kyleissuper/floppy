import { flappy } from "./flappy.js";
import { physics } from "./physics.js";
import { loop } from "./loop.js";
import { bird } from "./bird.js";
import { obstacleMaker } from "./obstacleMaker.js";
import { scoreBoard } from "./scoreBoard.js";


document.addEventListener("DOMContentLoaded", function loadGame() {
  flappy.setup(physics, bird, obstacleMaker, scoreBoard);
  loop.start(flappy.nextFrame, flappy.renderWithLag);
});
