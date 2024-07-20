import * as TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';
import { slot, slotTop} from './SlotBack';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

//import { draw } from './tree'

//const drawTree = draw()
//scene.add(drawTree)


// scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(0,1,28); //29
var cameraDefaultPosition = new THREE.Vector3(0, 0, 29);
var cameraDefaultRotation = new THREE.Euler(0, 0, 0, 'XYZ');

const textureLoader = new THREE.TextureLoader();
const backgroundI = textureLoader.load('images/lines.jpeg')

scene.background = backgroundI;
//scene.background =0x6ceefa

//balken

    function frameBuilder(x,y,z, rotation){
      var balken;
      if(rotation){
      balken = slotTop();
      balken.rotation.z +=Math.PI / 2;
      }
      else {balken = slot()};
      
      balken.position.set(x,y,z);
      scene.add(balken);
      return balken
    }

    frameBuilder(-23.5,0,3.7, false);
    frameBuilder(-14.5,0,3.8, false);
    frameBuilder(-5.5,0,4, false);
    frameBuilder(3.5,0,4, false);
    frameBuilder(12.5,0,3.8, false);
    frameBuilder(21.5,0,3.7, false);
    frameBuilder(-1,13,4.5, true);
    frameBuilder(-1,-13,4.5, true);
    
    const fT1 = frameBuilder(-1,14,5, false);
    const fT2 = frameBuilder(-1,15,5, false);
    fT1.rotation.z +=Math.PI / 2
    fT2.rotation.z +=Math.PI / 2



//variables
const numSections = 6;
const sectionDuration = 2000;


const wheels = []   //new THREE.Group();
//createCylinders
    function createCylinder(position, initRot, attLine = {}, attRow = {}) {
      const radius = 5;
      const height = 8;
      const numSegments = 8;

      const quarterCylinderGeometry = new THREE.CylinderGeometry(radius, radius, height, numSegments, 1, true, 0, Math.PI * 0.4);
      const materials = Array.from({ length: 5 }, (_, index) => {
       
        const texture = new THREE.TextureLoader().load(`images/s${index + 1}.jpeg`);
        //texture.rotation = Math.PI / 2;

        return new THREE.MeshBasicMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
          map: texture,
        });
      });




      const quarterCylinders = materials.map((material, index) => {
        const quarterCylinderMesh = new THREE.Mesh(quarterCylinderGeometry, material);
        quarterCylinderMesh.rotation.y = (Math.PI * 0.4) * index;
        return quarterCylinderMesh;
      });



      const cylinderMesh = new THREE.Group();
      quarterCylinders.forEach((quarterCylinder) => cylinderMesh.add(quarterCylinder));

      cylinderMesh.rotateY(Math.PI / 2);
      cylinderMesh.rotateX(Math.PI / 2);
      cylinderMesh.position.copy(position);
      cylinderMesh.rotation.x += initRot;
      
      Object.assign(cylinderMesh, attLine);
      Object.assign(cylinderMesh, attRow);
      Object.assign(cylinderMesh, { rotationV: 0 });
      cylinderMesh.rotationV = 0;
      
      wheels.push(cylinderMesh)
      return cylinderMesh;
    }


//addCylinders
    let c1_1 = createCylinder(new THREE.Vector3(-19, 9, 0), 0.5, {line: 1}, {row: 1});
    let c1_2 = createCylinder(new THREE.Vector3(-10, 9, 0),0.5,{line: 1}, {row: 2});
    let c1_3 = createCylinder(new THREE.Vector3(-1, 9, 0), 0.5,{line: 1}, {row: 3});
    let c1_4 = createCylinder(new THREE.Vector3(8, 9, 0), 0.5,{line: 1}, {row: 4});
    let c1_5 = createCylinder(new THREE.Vector3(17, 9, 0), 0.5,{line: 1}, {row: 5});
    let c2_1 = createCylinder(new THREE.Vector3(-19, 0, 0), 0.3, {line: 2}, {row: 1});
    let c2_2 = createCylinder(new THREE.Vector3(-10, 0, 0), 0.3,{line: 2}, {row: 2});
    let c2_3 = createCylinder(new THREE.Vector3(-1, 0, 0), 0.3,{line: 2}, {row: 3});
    let c2_4 = createCylinder(new THREE.Vector3(8, 0, 0), 0.3,{line: 2}, {row: 4});
    let c2_5 = createCylinder(new THREE.Vector3(17, 0, 0), 0.3,{line: 2}, {row: 5});
    let c3_1 = createCylinder(new THREE.Vector3(-19, -9, 0), 0.1,{line: 3}, {row: 1});
    let c3_2 = createCylinder(new THREE.Vector3(-10, -9, 0),0.1,{line: 3}, {row: 2});
    let c3_3 = createCylinder(new THREE.Vector3(-1, -9, 0),0.1,{line: 3}, {row: 3});
    let c3_4 = createCylinder(new THREE.Vector3(8, -9, 0),0.1,{line: 3}, {row: 4});
    let c3_5 = createCylinder(new THREE.Vector3(17, -9, 0),0.1,{line: 3}, {row: 5});

    wheels.forEach((y) => {scene.add(y)});

//counter
let counterElement = document.getElementById('counter-display');

function updateCounter(number) {
  counterElement.textContent = `Bank: $${number.toFixed(2)}`;
}









//animate
const clock = new THREE.Clock()
    const animate = () => {
      requestAnimationFrame(animate);
      TWEEN.update();
      if(mixer)
      {
          mixer.update(clock.getDelta())
      }

      renderer.render(scene, camera);
    };



// Easing
    function cubicEaseInOut(t) {
      if ((t /= 0.5) < 1) return 0.5 * t * t * t;
      return 0.5 * ((t -= 2) * t * t + 2);
    }

// spinning
    function rotateCylinderWithEasingPromise(cylinder, targetRotation, targetValue) {
      return new Promise((resolve) => {
        var duration = 3000;
        var startTime = Date.now();
        var startRotation = cylinder.rotation.x;
    
        var rotateInterval = 10;
    
        var rotateCylinder = () => {
          var elapsed = Date.now() - startTime;
          var progress = Math.min(1, elapsed / duration);
          var easedProgress = cubicEaseInOut(progress);
    
          var easedRotation = startRotation + easedProgress * (targetRotation - startRotation);
          cylinder.rotation.x = easedRotation;
    
          if (progress < 1) {
            setTimeout(rotateCylinder, rotateInterval);
          } else {
            resolve();
          }
        };
    
        rotateCylinder();
      });
    }


//gltf
const gltfLoader = new GLTFLoader()
let mixer = null
let wormGltf = null; // Variable to store the gltf object

gltfLoader.load(
    'winAnim/win_2.gltf',
    (gltf) =>
    {
        console.log('success')
        console.log(gltf)
        gltf.scene.scale.set(0.7, 0.7, 0.7)
        //gltf.scene.rotateX(180)
        gltf.scene.rotateY(1.5708)
        gltf.scene.rotateY(3.14159)
        //gltf.scene.rotateZ(30)
        gltf.scene.position.set(0,0,25)
        
        
            // Set opacity for all materials in the gltf object
            gltf.scene.traverse((child) => {
              if (child.isMesh) {
                  const goldTexture = textureLoader.load('images/gold.jpeg')
                  const winMat = new THREE.MeshStandardMaterial( { map: goldTexture} )
                  child.material = winMat;
                  child.material.transparent = true;
                  child.material.opacity = 0; // Set your desired opacity value (0.0 to 1.0)
              }
          });
        
        
        scene.add(gltf.scene)
        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[0])
        action.play()

        wormGltf = gltf;

    },
    (progress) =>
    {
        console.log('progress')
        console.log(progress)
    },
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
)





//light
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);

const lightp = new THREE.PointLight( 0xFFFFFF, 10, 100 );
lightp.position.set( 10, 10, 70 );
scene.add( lightp );

const lightp2 = new THREE.PointLight( 0xFFFFFF, 10, 100 );
lightp2.position.set(-10, 10, 70 );
scene.add( lightp2 );



// Define variables
let cameraShakeDuration = 5; // Duration of camera shake in seconds
let cameraShakeIntensity = 0.5; // Intensity of camera shake
let cameraShakeTimer = 0; // Timer for camera shake
let isCameraShaking = false; // Flag to track camera shake state

// Function to shake the camera
function shakeCamera() {
    cameraShakeTimer = cameraShakeDuration; // Start the shake timer
    isCameraShaking = true; // Set camera shake flag to true

    // Generate random movement for the camera
    const startPosition = camera.position.clone(); // Store initial camera position
    const noise = new THREE.Vector3(); // Vector to store random noise
    const cameraShakeLoop = () => {
        if (cameraShakeTimer > 0) {
            noise.set(
                (Math.random() - 0.5) * cameraShakeIntensity,
                (Math.random() - 0.5) * cameraShakeIntensity,
                (Math.random() - 0.5) * cameraShakeIntensity
            );

            // Apply random noise to camera position
            camera.position.copy(startPosition.clone().add(noise));

            cameraShakeTimer -= 1 / 60; // Decrement timer based on frame rate (60 FPS assumed)
            requestAnimationFrame(cameraShakeLoop);
        } else {
            // Camera shake completed, set camera shake flag to false
            isCameraShaking = false;
        }
    };

    // Start the camera shake loop
    cameraShakeLoop();
}

// Function to perform another action
function startWin() {
    // Check if camera is shaking
    if (isCameraShaking) {

          const initialOpacity = 0;
          const targetOpacity = 1;
          const duration = 1000;

       // Create a TWEEN animation
       new TWEEN.Tween({ opacity: initialOpacity })
       .to({ opacity: targetOpacity }, duration)
       .onUpdate(({ opacity }) => {
           // Update opacity during the animation
           wormGltf.scene.traverse((child) => {
               if (child.isMesh) { // a material i created in the code earlier
                  child.material.transparent = true;
                  child.material.opacity = opacity;
               }
           });
       })
       .start();
  }
}

function stopWin(){
  wormGltf.scene.traverse((child) => {
    if (child.isMesh) {
       child.material.transparent = true;
       child.material.opacity = 0;
    }
  })
}









var counter = 10;
// Click
document.addEventListener('click', async () => {
  counter -= 0.4;

  wormGltf.scene.traverse((child) => {
    if (child.isMesh) {
        child.material.transparent = true;
        child.material.opacity = 0; // Set your desired opacity value (0.0 to 1.0)
    }
});


  // Rotate cylinders and wait for all rotations to finish
  await Promise.all(wheels.map((y) => {
    const targetValue = Math.round(Math.random() * (30 - 5)) + 5;
    return rotateCylinderWithEasingPromise(y, y.rotation.x + targetValue * (Math.PI * 0.4), targetValue);
  }));

  wheels.forEach((y, index) => {
    y.rotationV = getCurrentRotation(y);

    // if (index < wheels.length - 1) {
    //   const rotationThreshold = 0.01;
    //   const rotationDiff = Math.abs(y.rotationV - getCurrentRotation(wheels[index + 1]));


      if (index < wheels.length -2) {
        const rotationThreshold = 0.01;
        var rotationDiff1 = Math.abs(y.rotationV - getCurrentRotation(wheels[index + 1]));
        if(rotationDiff1 == 360) rotationDiff1 = 0;
        var rotationDiff2 = Math.abs(y.rotationV - getCurrentRotation(wheels[index + 2]));
        if(rotationDiff2 == 360) rotationDiff2 = 0;


        console.log(`'c ${index + 1}, c ${index + 2}, c ${index + 3} : ${rotationDiff1}, ${rotationDiff2}`);


        if (
          rotationDiff1 < rotationThreshold && 
          rotationDiff2 < rotationThreshold &&
          y.line === wheels[index + 1].line &&
          y.row === wheels[index + 1].row - 1 &&
          y.line === wheels[index + 2].line &&
          y.row === wheels[index + 2].row - 2
        ) {
          counter += 4;
          console.log('strike');

          shakeCamera();
          startWin();

          setTimeout(stopWin, cameraShakeDuration * 1000);

}

      }
    });


  counter = Math.round(counter * 100) / 100;
  updateCounter(counter);
  console.log(counter);
});







//getcurrentRot
  function getCurrentRotation(cylinder) {
    const currentRotation = cylinder.rotation.x;
    const currentRotationDegrees = (currentRotation * 180) / Math.PI % 360;
    const originalRotationDegrees = (cylinder.userData.originalRotation * 180) / Math.PI % 360;
    const relativeRotationDegrees = (currentRotationDegrees - originalRotationDegrees + 360) % 360;

    return Math.round(relativeRotationDegrees);
  }

// Store the original rotation for each cylinder
wheels.forEach((y) => {
  y.userData.originalRotation = y.rotation.x;
});











animate();
//Size
    window.addEventListener('resize', () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    });
