
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
//eh?
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
//eh?
// renderer.shadowMap.enabled = true;

document.body.appendChild( renderer.domElement );

var pos = new THREE.Vector3();
var color = new THREE.Color("rgb(100, 50, 30)");
var color2 = new THREE.Color("rgb(0, 0, 255)");
var geometry, cube;
var material = new THREE.MeshBasicMaterial( { color: color } );
var material2 = new THREE.MeshBasicMaterial( { color: color2 } );

// Number of cells:
var n = 20;
// Size of each cell: ensures size is always 40 units.
var s = 40 / n;

function drawGrid(y) {
  for (var i=0; i < n; i++) {
    for (var j=0; j < n; j++) {
      // Increment position by the size of each box:
      pos.set(i * s, y, j * s);
      geometry = new THREE.BoxGeometry(s, s, s);
      // randomize color:
      if (Math.random() > 0.5) {
        cube = new THREE.Mesh( geometry, material );
      } else {
        cube = new THREE.Mesh( geometry, material2 );
      }
      // wonder whether we need copy:
      cube.position.copy( pos );
      scene.add( cube );
    }
  }
}

var height = 0;

drawGrid(height);

camera.position.z = 45;
camera.position.y = 10;
camera.position.x = 20;

var animate = function () {
  requestAnimationFrame( animate );
  renderer.render(scene, camera);
  // drawGrid(height);
  // height += 0.1;

};

animate();
