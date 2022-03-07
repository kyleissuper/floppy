import game from "./game.js";
import physics from "./physics.js";
import loop from "./loop.js";
import kitty from "./kitty.js";
import obstacleMaker from "./obstacleMaker.js";
import scoreBoard from "./scoreBoard.js";
import backDrop from "./backDrop.js";
import "./webfont.js";

document.addEventListener("DOMContentLoaded", () => {
  WebFont.load({
    google: {
      families: ['Averia Serif Libre:700'],
    },
    active() {
      game.setup(physics, kitty, obstacleMaker, scoreBoard, backDrop);
      loop.start(game.nextFrame, game.renderWithLag);
    },
  });
});
