const physics = (() => {
  const scrollSpeed = -5;
  const fallGravity = 1.3;
  const defaultFallSpeed = -17;
  let fallSpeed = defaultFallSpeed;

  const publicAPI = {
    scrollSpeed,
    getCurrentFallSpeed,
    reset,
    fall,
    jump,
  };

  return publicAPI;

  // ****************************************

  function getCurrentFallSpeed() {
    return fallSpeed;
  }

  function reset() {
    fallSpeed = defaultFallSpeed;
  }

  function fall() {
    fallSpeed += fallGravity;
  }

  function jump() {
    fallSpeed = defaultFallSpeed;
  }
})();

export default physics;
