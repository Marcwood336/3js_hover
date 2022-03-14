

import * as THREE from 'THREE';
import * as dat from 'dat.gui';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);

camera.position.z = 8


const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth,innerHeight);
renderer.setPixelRatio(devicePixelRatio);

document.body.appendChild(renderer.domElement);

new OrbitControls(camera,renderer.domElement)


//plane
const planeGeometry = new THREE.PlaneGeometry(5,5,10,5);
const planeMaterial = new THREE.MeshPhongMaterial({
 
  flatShading: THREE.FlatShading,
  side: THREE.DoubleSide,
  vertexColors:true
 


  });
const  planeMesh = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(planeMesh);


// plane z

const planeArray = planeMesh.geometry.attributes.position.array;

for(let i =0; i < planeArray.length; i+=3){

  const x = i;
  const y = i+1;
  const z = i+2;

  planeArray[z] += Math.random()

}


//light

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(0,0,1);
scene.add(light);

const backLight = new THREE.DirectionalLight(0xffffff,1);
backLight.position.set(0,0-1);
scene.add(backLight)







//animate function

function animate(){
requestAnimationFrame(animate);
renderer.render(scene,camera);
}



//raycaster -mouse input monitoring

const mouse ={
  x:undefined,
  y:undefined
}

addEventListener('mousemove',(event)=>{

mouse.x=(event.clientX/innerWidth) *2-1;
mouse.y=-(event.clientY/innerHeight)*2+1


const raycaster = new THREE.Raycaster()
raycaster.setFromCamera(mouse,camera);
const intercepts = raycaster.intersectObject(planeMesh);

if (intercepts.length > 0){


 intercepts[0].object.geometry.attributes.color.setX(intercepts[0].face.a,1)
 intercepts[0].object.geometry.attributes.color.setY(intercepts[0].face.a,1)
 intercepts[0].object.geometry.attributes.color.setZ(intercepts[0].face.a,0)

  intercepts[0].object.geometry.attributes.color.setX(intercepts[0].face.b,1)
 intercepts[0].object.geometry.attributes.color.setY(intercepts[0].face.b,1)
 intercepts[0].object.geometry.attributes.color.setZ(intercepts[0].face.b,0)

   intercepts[0].object.geometry.attributes.color.setX(intercepts[0].face.c,1)
 intercepts[0].object.geometry.attributes.color.setY(intercepts[0].face.c,1)
 intercepts[0].object.geometry.attributes.color.setZ(intercepts[0].face.c,0)


intercepts[0].object.geometry.attributes.color.needsUpdate =true


//we now want the original colors to immediatly be restablished, we do that using gsap:


//we need 2 objects having the initial and the hover color of our planeMesh

const initialColors = {
  r:0,
  g:1,
  b:0
}


const hoverColors = {
  r:1,
  g:1,
  b:0
}


gsap.to(hoverColors,{
  r:initialColors.r,
  g:initialColors.g,
  b:initialColors.b,
 duration:1.5,

  onUpdate:()=>{
 intercepts[0].object.geometry.attributes.color.setX(intercepts[0].face.a,hoverColors.r)
 intercepts[0].object.geometry.attributes.color.setY(intercepts[0].face.a,hoverColors.g)
 intercepts[0].object.geometry.attributes.color.setZ(intercepts[0].face.a,hoverColors.b)

  intercepts[0].object.geometry.attributes.color.setX(intercepts[0].face.b,hoverColors.r)
 intercepts[0].object.geometry.attributes.color.setY(intercepts[0].face.b,hoverColors.g)
 intercepts[0].object.geometry.attributes.color.setZ(intercepts[0].face.b,hoverColors.b)

   intercepts[0].object.geometry.attributes.color.setX(intercepts[0].face.c,hoverColors.r)
 intercepts[0].object.geometry.attributes.color.setY(intercepts[0].face.c,hoverColors.g)
 intercepts[0].object.geometry.attributes.color.setZ(intercepts[0].face.c,hoverColors.b)


intercepts[0].object.geometry.attributes.color.needsUpdate =true

  }
})


}});



//color attribute of planeMesh;


 const color =[]
 const {count} = planeMesh.geometry.attributes.position

for(let i = 0; i < count ; i++  ){


color.push(0,1,0)

}




  planeMesh.geometry.setAttribute('color',
  new THREE.BufferAttribute(new Float32Array(color),3));

  console.log(planeMesh);

animate()