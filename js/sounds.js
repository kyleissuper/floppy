const sounds = (() => {
  // TODO: Implement sounds using HTML5 Web Audio API because Safari is mostly broken
  //       See:
  //       * https://developer.mozilla.org/en-US/docs/Games/Techniques/Audio_for_Web_Games
  //       * https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/PlayingandSynthesizingSounds/PlayingandSynthesizingSounds.html
  // Temporary workaround for Safari
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  let isMuted = false;
  const jumpSound = new Audio("sound/jump.mp3");
  const endSound = new Audio("sound/end.wav");

  const music = new Audio("sound/downy feathers.mp3");
  music.loop = true;
  music.volume = 0.3;

  const toggle = document.querySelector("#muteToggle");
  toggle.addEventListener("click", toggleMute);

  const publicAPI = {
    jump,
    end,
  };

  return publicAPI;

  // ****************************************

  function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
      toggle.classList.add("mute");
      pauseMusic();
    } else {
      toggle.classList.remove("mute");
      playMusic();
    }
  }

  function playMusic() {
    music.load();
    music.play();
  }

  function pauseMusic() {
    music.pause();
  }

  function jump() {
    if (isMuted === true) return;
    if (music.paused === true) playMusic();
    if (isSafari === true) return;
    jumpSound.load();
    jumpSound.play();
  }

  function end() {
    if (isMuted === true) return;
    if (isSafari === true) return;
    endSound.load();
    endSound.play();
  }
})();

export default sounds;
