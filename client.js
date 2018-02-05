
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
//eh?
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
//eh?
renderer.shadowMap.enabled = true;

// hmm, no visible change yet...
// textureLoader = new THREE.TextureLoader();
// var ambientLight = new THREE.AmbientLight( 0x404040 );
// scene.add( ambientLight );
// var light = new THREE.DirectionalLight( 0xffffff, 1 );
// light.position.set( -10, 10, 5 );
// light.castShadow = true;
// var d = 10;
// light.shadow.camera.left = -d;
// light.shadow.camera.right = d;
// light.shadow.camera.top = d;
// light.shadow.camera.bottom = -d;
// light.shadow.camera.near = 2;
// light.shadow.camera.far = 50;
// light.shadow.mapSize.x = 1024;
// light.shadow.mapSize.y = 1024;
// scene.add( light );

document.body.appendChild( renderer.domElement );

var pos = new THREE.Vector3();
var color = new THREE.Color("rgb(100, 50, 30)");
var color2 = new THREE.Color("rgb(0, 0, 255)");
var geometry, cube;
var material = new THREE.MeshBasicMaterial( { color: color } );
var material2 = new THREE.MeshBasicMaterial( { color: color2 } );

// var s = 1;
// var s;
var n = 20;
var s = 40 / n;

function drawGrid(num) {
  // s = 40 / num;
  for (var i=0; i < num; i++) {
    for (var j=0; j < num; j++) {
      pos.set(i * s, 0, j * s);
      geometry = new THREE.BoxGeometry(s, s, s);
      if (Math.random() > 0.5) {
        cube = new THREE.Mesh( geometry, material );
      } else {
        cube = new THREE.Mesh( geometry, material2 );
      }
      cube.position.copy( pos );
      scene.add( cube );
    }
  }
}

drawGrid(n);

camera.position.z = 45;
camera.position.y = 10;
camera.position.x = 20;

var animate = function () {
  requestAnimationFrame( animate );

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // cube.rotation.z += 0.02;

  renderer.render(scene, camera);
};

animate();
