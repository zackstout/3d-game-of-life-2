
// -Global variables-
var pos = new THREE.Vector3();
var color = new THREE.Color("rgb(100, 50, 30)");
var color2 = new THREE.Color("rgb(0, 0, 255)");
var geometry, cube;
var material = new THREE.MeshBasicMaterial( { color: color } );
var material2 = new THREE.MeshBasicMaterial( { color: color2 } );

var threeD = false;
// Number of cells:
var n = 20;
// Size of each cell: ensures size is always 40 units.
var s = 40 / n;
// array of arrays:
var currentVals = [];
var nextVals = [];
// [x, z, on/off]:
// var initial = [[10, 10], [10, 11], [10, 12], [11, 10], [12, 11]];
var initial = [[15, 15], [15, 16], [15, 17], [16, 15], [17, 16]];

var height = 0;


// -Setting up three.js-
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xB0E0E6 );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 45;
camera.position.y = 10 + height;
camera.position.x = 20;

// console.log(camera);
// renderer.shadowMap.enabled = true;
//
// var light = new THREE.PointLight( 0xffffff, 1, 100 );
// light.position.set( 0, 10, 0 );
// light.castShadow = true;            // default false
// scene.add( light );
// light.shadow.mapSize.width = 512;  // default
// light.shadow.mapSize.height = 512; // default
// light.shadow.camera.near = 0.5;       // default
// light.shadow.camera.far = 500;      // default

// camera.rotation.y =  Math.PI / 8;

// camera.


// -Functions-

// Add the initial configuration to the grid's values:
function initialize() {
  initial.forEach(function(a) {
    // Beautiful: this grabs the cell we care about:
    index = a[0] * n + a[1];
    currentVals[index][2] = 1;

    // Ahhh 'let' solving this for us: otherwise, gets hoisted, and line 40 gets messed up.
    // let m = getNeighbors([currentVals[index][0], currentVals[index][1], currentVals[index][2]]);

    // let lod = liveOrDie([currentVals[index][0], currentVals[index][1]]);
    // console.log(m);
  });
  // Seems to be working correctly here:
  // console.log(getNeighbors([12, 13]));
}

function setupVals() {
  for (var i=0; i < n; i++) {
    for (var j=0; j < n; j++) {
      // Initialize both arrays with all elements starting at value 0:
      currentVals.push([i, j, 0]);
      nextVals.push([i, j, 0]);
    }
  }
}

function liveOrDie(x) {
    var neighbors = getNeighbors(x);
    // console.log(neighbors);
    var total = 0;
    var oh, one, val;

    // console.log(currentVals);
    // Grab total of live neighbors:
    // jeezo more namespacing errors:
    neighbors.forEach(function(neighbor) {
      // total = 0;
      oh = neighbor[0];
      one = neighbor[1];
      val = neighbor[2];

      // strange that we had to add ==1 to get it to work here: .... No it's not. we were referring incorrectly.
      if (val == 1) {
        total ++;
        // console.log('aha', i, j);
      }
    });
    if (total == 3 ) {
      // yes, this is really working:
      // console.log(x[0], x[1]);
    }

    // Game of Life logic:
    if (total < 2 || total > 3) {
      nextVals[x[0] * n + x[1]][2] = 0;
    }
    else if (total == 3) {
      // console.log('woo');
      nextVals[x[0] * n + x[1]][2] = 1;
    } else if (total == 2 && currentVals[x[0] * n + x[1]][2]){
      // console.log('woo2');
      nextVals[x[0] * n + x[1]][2] = 1;
    } else {
      nextVals[x[0] * n + x[1]][2] = 0;
    }
    total = 0;
  }

// x is our cell, i.e. array of 3 (e.g. [10, 10, 1]):
function getNeighbors(x) {
    var neighbors = [];
    var xPos, yPos, val;

    // ahh yes neighbors also needs to have info about
    if (x[0] > 0) {
      xPos = x[0] - 1;
      yPos = x[1];
      val = currentVals[xPos * n + yPos][2];
      neighbors.push([x[0] - 1, x[1], val]);

      if (x[1] > 0) {
        xPos = x[0];
        yPos = x[1] - 1;
        val = currentVals[xPos * n + yPos][2];
        neighbors.push([x[0], x[1] - 1, val]);
        xPos = x[0] - 1;
        yPos = x[1] - 1;
        val = currentVals[xPos * n + yPos][2];
        neighbors.push([x[0] - 1, x[1] - 1, val]);
      }

      //shouldn't it be n-1?:
      if (x[1] < n - 1) {
        xPos = x[0];
        yPos = x[1] + 1;
        val = currentVals[xPos * n + yPos][2];
        neighbors.push([x[0], x[1] + 1, val]);
        xPos = x[0] - 1;
        yPos = x[1] + 1;
        val = currentVals[xPos * n + yPos][2];
        neighbors.push([x[0] - 1, x[1] + 1, val]);
      }
    } else {
      if (x[1] > 0) {
        xPos = x[0];
        yPos = x[1] - 1;
        val = currentVals[xPos * n + yPos][2];
        neighbors.push([x[0], x[1] - 1, val]);
      }
      if (x[1] < n - 1) {
        xPos = x[0];
        yPos = x[1] + 1;
        val = currentVals[xPos * n + yPos][2];
        neighbors.push([x[0], x[1] + 1, val]);
      }
    }

    if (x[0] < n - 1) {
      xPos = x[0] + 1;
      yPos = x[1];
      val = currentVals[xPos * n + yPos][2];
      neighbors.push([x[0] + 1, x[1], val]);

      if (x[1] > 0) {
        xPos = x[0] + 1;
        yPos = x[1] - 1;
        val = currentVals[xPos * n + yPos][2];
        neighbors.push([x[0] + 1, x[1] - 1, val]);
      }
      if (x[1] < n - 1) {
        xPos = x[0] + 1;
        yPos = x[1] + 1;
        val = currentVals[xPos * n + yPos][2];
        neighbors.push([x[0] + 1, x[1] + 1, val]);
      }
    }

    return neighbors;
  } // end getNeighbors


function drawGrid(y) {
  // console.log(currentVals);
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


      if (threeD) {
        if (currentVals[i * n + j][2]) {
          cube = new THREE.Mesh( geometry, material );
          // wonder whether we need copy:
          cube.position.copy( pos );
          cube.receiveShadow = true;
          cube.castShadow = true;
          scene.add( cube );
        }
      } else {
        if (currentVals[i * n + j][2]) {
          cube = new THREE.Mesh( geometry, material );
          // wonder whether we need copy:
        } else {
          cube = new THREE.Mesh( geometry, material2 );
        }

        cube.position.copy( pos );
        cube.receiveShadow = true;
        cube.castShadow = true;
        scene.add( cube );
      }

    }
  }

  updateGrid();
}

function updateGrid() {
  currentVals.forEach((v) => {
    liveOrDie(v);
  });
  // this much works: first step, it gets the proper next state in nextVals:
  // console.log(currentVals);
  // console.log(nextVals);

  // for drawing next state. Shouldn't need to clear out nextVals, since GoL logic takes care of that:
  // currentVals = nextVals;

  currentVals = [];

  nextVals.forEach((a) => {
    clone = a.slice(0);
    currentVals.push(clone);
  });

  // Seems to have worked...:
  // console.log(currentVals);
  // drawGrid(height);
  // console.log(getNeighbors([12, 11]));

}

// -Let's go!-
setupVals();
initialize();
drawGrid(height);
// drawGrid(height);
// drawGrid(height);



// updateGrid();

var animate = function () {
  setTimeout( function() {
    drawGrid(height);
    height += 1;
    if (!threeD) {
      camera.position.y = 10 + height;
    }

    requestAnimationFrame( animate );

  }, 300 );  renderer.render(scene, camera);

};

animate();
