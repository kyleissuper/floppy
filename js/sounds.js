const sounds = (() => {
  const toggle = document.querySelector("#muteToggle");
  toggle.addEventListener("click", toggleMute);

  const audioCtx = new AudioContext();

  let jumpTrack;
  let endTrack;
  let musicTrack;
  let musicNode;
  let isMuted = false;
  let isPaused = true;

  loadFile("sound/jump.mp3")
    .then((track) => {
      jumpTrack = track;
    });
  loadFile("sound/end.wav")
    .then((track) => {
      endTrack = track;
    });
  loadFile("sound/music.mp3")
    .then((track) => {
      musicTrack = track;
    });

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
    if (!musicTrack) return;
    if (!musicNode) {
      musicNode = playTrack(musicTrack);
      musicNode.loop = true;
      isPaused = false;
    } else if (isPaused) {
      musicNode.playbackRate.value = 1;
      isPaused = false;
    }
  }

  function pauseMusic() {
    musicNode.playbackRate.value = 0;
    isPaused = true;
  }

  function jump() {
    if (isMuted) return;
    if (isPaused) playMusic();
    playTrack(jumpTrack);
  }

  function end() {
    if (isMuted) return;
    playTrack(endTrack);
  }

  async function loadFile(filePath) {
    const resp = await fetch(filePath);
    const arrBuffer = await resp.arrayBuffer();
    const audBuffer = await audioCtx.decodeAudioData(arrBuffer);
    return audBuffer;
  }

  function playTrack(audioBuffer) {
    const trackSource = audioCtx.createBufferSource();
    trackSource.buffer = audioBuffer;
    trackSource.connect(audioCtx.destination);
    trackSource.start();
    return trackSource;
  }
})();

export default sounds;
