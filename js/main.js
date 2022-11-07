import game from "./game.js";
import physics from "./physics.js";
import loop from "./loop.js";
import kitty from "./kitty.js";
import obstacleMaker from "./obstacleMaker.js";
import scoreBoard from "./scoreBoard.js";
import backDrop from "./backDrop.js";
import sounds from "./sounds.js";
import "./webfont.js";

function start() {
  game.setup(
    physics,
    kitty,
    obstacleMaker,
    scoreBoard,
    backDrop,
    sounds,
  );
  loop.start(game.nextFrame, game.render);
}

document.addEventListener("DOMContentLoaded", () => {
  WebFont.load({
    google: {
      families: ["Averia Serif Libre:700"],
    },
    active() {
      start();
    },
    inactive() {
      start();
    },
  });
});
