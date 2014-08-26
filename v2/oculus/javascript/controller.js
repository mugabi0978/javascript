// Generated by CoffeeScript 1.7.1
(function() {
  var controller, createLight, positionLight, removeLight;

  window.controller = controller = new Leap.Controller({
    background: true
  });

  controller.use('transform', {
    quaternion: (new THREE.Quaternion).setFromEuler(new THREE.Euler(Math.PI * -0.3, 0, Math.PI, 'ZXY')),
    position: new THREE.Vector3(0, 100, 0)
  });

  controller.use('riggedHand', {
    parent: window.scene,
    camera: window.camera,
    positionScale: 2,
    renderFn: null,
    boneColors: function(boneMesh, leapHand) {
      return {
        hue: 0.6,
        saturation: 0.2,
        lightness: 0.8
      };
    }
  });

  controller.use('playback', {
    recording: 'top-down-pinch-37fps.json.lz',
    loop: false
  });

  controller.connect();

  createLight = function(hand) {};

  removeLight = function(hand) {
    var light, lightVisualizer;
    light = hand.data('light');
    scene.remove(light);
    hand.data('light', null);
    lightVisualizer = hand.data('lightVisualizer');
    scene.remove(lightVisualizer);
    return hand.data('lightVisualizer', null);
  };

  positionLight = function(hand) {
    var handMesh, light, offsetDown, offsetForward, pos;
    handMesh = hand.data('riggedHand.mesh');
    light = hand.data('light');
    if (hand.pinchStrength > 0.5) {
      pos = Leap.vec3.clone(hand.palmPosition);
      offsetDown = Leap.vec3.clone(hand.palmNormal);
      Leap.vec3.multiply(offsetDown, offsetDown, [13, 13, 13]);
      Leap.vec3.add(pos, pos, offsetDown);
      offsetForward = Leap.vec3.clone(hand.direction);
      Leap.vec3.multiply(offsetForward, offsetForward, [13, 13, 13]);
      Leap.vec3.add(pos, pos, offsetForward);
      return handMesh.scenePosition(pos, window.light.position);
    }
  };

  controller.on('handFound', createLight);

  controller.on('handLost', removeLight);

  controller.on('hand', positionLight);

  document.body.onkeydown = function(e) {
    switch (e.which) {
      case 32:
        return scope.pause();
      default:
        return console.log("unbound keycode: " + e.which);
    }
  };

}).call(this);
