import * as THREE from 'three';
var scene = new THREE.Scene();

  // Set up camera
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Set up renderer
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create Julia set geometry
  var juliaGeometry = new THREE.PlaneGeometry(4, 4, 100, 100);
  var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });

  // Modify vertices based on Julia set formula
  for (var i = 0; i < juliaGeometry.vertices.length(); i++) {
    var vertex = juliaGeometry.vertices[i];
    var x = vertex.x;
    var y = vertex.y;
    
    // Julia set formula
    var iterations = 20;
    for (var j = 0; j < iterations; j++) {
      var xtemp = x * x - y * y + 0.355;
      y = 2 * x * y + 0.355;
      x = xtemp;
    }

    // Adjust the height based on the Julia set value
    vertex.z = Math.sin(x) * Math.cos(y) * 0.5;
  }

  var juliaMesh = new THREE.Mesh(juliaGeometry, material);
  scene.add(juliaMesh);

  // Set up animation
  function animate() {
    requestAnimationFrame(animate);
    juliaMesh.rotation.x += 0.01;
    juliaMesh.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  // Handle window resizing
  window.addEventListener('resize', function () {
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
  });

  // Start animation
  animate();