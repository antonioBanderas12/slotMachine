import * as THREE from 'three';
import { TextureLoader } from 'three';
const textureLoader = new TextureLoader();
const texture = textureLoader.load('images/redMetal.jpeg')
const SMaterial = new THREE.MeshStandardMaterial({map: texture})


export function slot(){

  const SGeometry = new THREE.BoxGeometry(1.5,25,3);
  const slotMachine = new THREE.Mesh(SGeometry, SMaterial)

return slotMachine;
}


export function slotTop(){
  
  const TGeometry = new THREE.BoxGeometry(1.5,50,3);
  const top = new THREE.Mesh(TGeometry, SMaterial)

return top;
}