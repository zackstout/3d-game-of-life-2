
var scene = new THREE.Scene();
// Can set background color in one of two ways. this is first:
scene.background = new THREE.Color( 0xB0E0E6 );

// Number of cells:
var n = 20;
// Size of each cell: ensures size is always 40 units.
var s = 40 / n;

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ alpha: true });
//eh?
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

// second way to set background color (requires alpha):
// renderer.setClearColor( 0xB0E0E6, 0);

document.body.appendChild( renderer.domElement );

var pos = new THREE.Vector3();
var color = new THREE.Color("rgb(100, 50, 30)");
var color2 = new THREE.Color("rgb(0, 0, 255)");
var geometry, cube;
var material = new THREE.MeshBasicMaterial( { color: color } );
var material2 = new THREE.MeshBasicMaterial( { color: color2 } );

// array of arrays:
var currentVals = [];
var nextVals = [];

// [x, z, on/off]:
var initial = [[10, 10], [10, 11], [10, 12], [11, 9]];

function initialize() {
  initial.forEach(function(a) {
    // Beautiful: this grabs the cell we care about:
    currentVals[a[0] * n + a[1]][2] = 1;

    // Checking getNeighbors function:
    // Hmm why is it running twice?
    // Ahhh 'let' solving this for us: otherwise, gets hoisted, and line 40 gets messed up.
    let m = getNeighbors([currentVals[a[0] * n + a[1]][0], currentVals[a[0] * n + a[1]][1]]);
    console.log(m);
  });

  // perfect, we got them:
  // console.log(currentVals);
}

// Hmm, an issue where we want to call drawGrid before initialize (to get currentVals) but also vice versa (to draw correctly)....


function setupVals() {
  for (var i=0; i < n; i++) {
    for (var j=0; j < n; j++) {
      currentVals.push([i, j, 0]);
      nextVals.push([i, j, 0]);
    }
  }
}

function liveOrDie(x) {
    var neighbors = getNeighbors(x);
    var total = 0;

    neighbors.forEach(function(n) {
      var i = n[0];
      var j = n[1];
      var b = n[2];
      if (currentVals[i * n + j][b]) {
        total ++;
        console.log('aha', i, j);
      }
    });

    // Game of Life logic:
    if (total < 2 || total > 3) {
      nextVals[x[0] * n + x[1]][2] = 1;
    }
    else if (total == 3) {
      nextVals[x[0] * n + x[1]][2] = 1;
    } else if (total == 2 && currentVals[x[0] * n + j][2]){
      nextVals[x[0] * n + x[1]][2] = 1;
    } else {
      nextVals[x[0] * n + x[1]][2] = 0;
    }
  }

// x is our cell, i.e. array of 3 (e.g. [10, 10, 1]):
function getNeighbors(x) {
    neighbors = [];

    if (x[0] > 0) {
      neighbors.push([x[0] - 1, x[1]]);

      if (x[1] > 0) {
        neighbors.push([x[0], x[1] - 1]);
        neighbors.push([x[0] - 1, x[1] - 1]);
      }

      //shouldn't it be n-1?:
      if (x[1] < n - 2) {
        neighbors.push([x[0], x[1] + 1]);
        neighbors.push([x[0] - 1, x[1] + 1]);
      }
    } else {
      if (x[1] > 0) {
        neighbors.push([x[0], x[1] - 1]);
      }
      if (x[1] < n - 2) {
        neighbors.push([x[0], x[1] + 1]);
      }
    }

    if (x[0] < n - 2) {
      neighbors.push([x[0] + 1, x[1]]);

      if (x[1] > 0) {
        neighbors.push([x[0] + 1, x[1] - 1]);
      }
      if (x[1] < n - 2) {
        neighbors.push([x[0] + 1, x[1] + 1]);
      }
    }

    return neighbors;
  } // end getNeighbors



function drawGrid(y) {
  for (var i=0; i < n; i++) {
    for (var j=0; j < n; j++) {
      // Increment position by the size of each box:
      pos.set(i * s, y, j * s);
      geometry = new THREE.BoxGeometry(s, s, s);

      // randomize color:
      // if (Math.random() > 0.5) {
      //   cube = new THREE.Mesh( geometry, material );
      // } else {
      //   cube = new THREE.Mesh( geometry, material2 );
      // }

      if (currentVals[i * n + j][2]) {
        cube = new THREE.Mesh( geometry, material );
      } else {
        cube = new THREE.Mesh( geometry, material2 );
      }
      // wonder whether we need copy:
      cube.position.copy( pos );
      scene.add( cube );
    }
  }

  initialize();

}

var height = 0;

setupVals();
initialize();
drawGrid(height);

// console.log(currentVals);

camera.position.z = 45;
camera.position.y = 10;
camera.position.x = 20;

var animate = function () {
  setTimeout( function() {

      requestAnimationFrame( animate );

  }, 1000 );  renderer.render(scene, camera);
  // drawGrid(height);
  // height += 0.1;

};

animate();
