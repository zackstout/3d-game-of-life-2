
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
//eh?
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
//eh?
renderer.shadowMap.enabled = true;

// hmm, no visible change yet...
textureLoader = new THREE.TextureLoader();
var ambientLight = new THREE.AmbientLight( 0x404040 );
scene.add( ambientLight );
var light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( -10, 10, 5 );
light.castShadow = true;
var d = 10;
light.shadow.camera.left = -d;
light.shadow.camera.right = d;
light.shadow.camera.top = d;
light.shadow.camera.bottom = -d;
light.shadow.camera.near = 2;
light.shadow.camera.far = 50;
light.shadow.mapSize.x = 1024;
light.shadow.mapSize.y = 1024;
scene.add( light );

document.body.appendChild( renderer.domElement );

var pos = new THREE.Vector3();

// pos.set( 0, - 0.5, 0 );
// position = {
//   x: 0,
//   y: 0,
//   z: 0
// };

var color = new THREE.Color("rgb(255, 0, 0)");
var geometry, cube;
var material = new THREE.MeshBasicMaterial( { color: color } );

// oh of course, this just puts them all on top of each other:
for (var i=0; i < 40; i++) {
  for (var j=0; j < 40; j++) {
    pos.set(i, 0, j);
    geometry = new THREE.BoxGeometry(1, 1, 1);
    cube = new THREE.Mesh( geometry, material );
    cube.position.copy( pos );
    // position.x ++;
    // position.y ++;
    scene.add( cube );
  }
  // position.z ++;

}
// var geometry = new THREE.BoxGeometry( 40, 1, 40 );

camera.position.z = 5;
camera.position.y = 1;

var animate = function () {
  requestAnimationFrame( animate );

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // cube.rotation.z += 0.02;

  renderer.render(scene, camera);
};

animate();
