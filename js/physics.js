const physics = (() => {
  const scrollSpeed = -5;
  const fallGravity = 1.3;
  const defaultFallSpeed = -17;
  let fallSpeed = defaultFallSpeed;

  const publicAPI = {
    fall,
    jump,
    reset,
    currentFallSpeed,
    scrollSpeed,
  };

  return publicAPI;

  // ****************************************

  function currentFallSpeed() {
    return fallSpeed;
  }

  function fall() {
    fallSpeed += fallGravity;
  }

  function jump() {
    fallSpeed = defaultFallSpeed;
  }

  function reset() {
    fallSpeed = defaultFallSpeed;
  }
})();

export default physics;
