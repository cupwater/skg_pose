// Our input frames will come from here.
const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const controlsElement = document.getElementsByClassName("control-panel")[0];
const canvasCtx = canvasElement.getContext("2d");

const myImage = new Image(720, 720);
myImage.src = 'assets/example.jpg';

canvasCtx.drawImage(
  myImage,
  0,
  0,
  canvasElement.width,
  canvasElement.height
);
canvasCtx.restore();

// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
const fpsControl = new FPS();

// Optimization: Turn off animated spinner after its hiding animation is done.
const spinner = document.querySelector(".loading");
spinner.ontransitionend = () => {
  spinner.style.display = "none";
};

function zColor(data) {
  return "white";
}

function Queue() {
  let items = [];
  let max_num = 3;
  // add element into queue
  this.update = function (element) {
    if (items.length >= max_num) {
      this.dequeue();
    }
    items.push(element);
  };

  // add element into queue
  this.enqueue = function (element) {
    items.push(element);
  };

  // remove first element
  this.dequeue = function () {
    return items.shift();
  };

  // return first element
  this.front = function () {
    return items[0];
  };

  // judge if the queue is empty
  this.isEmpty = function () {
    return items.length === 0;
  };

  // return the length of queue
  this.size = function () {
    return items.length;
  };

  // clean the queue
  this.clear = function () {
    items = [];
  };

  // return the average of all elements in quene
  this.average = function () {
    element_length = items[0].length;
    if (element_length == 5) {
      let head_average = [];
      for (var i=0; i<element_length; i++)
      {
        head_average.push({'x': 0, 'y':0, 'z': 0, 'visibility': 0});
      }
      for (var i = 0; i < items.length; i++) {
        for (var j = 0; j < element_length; j++) {
          head_average[j].x += items[i][j].x;
          head_average[j].y += items[i][j].y;
          head_average[j].z += items[i][j].z;
          head_average[j].visibility += items[i][j].visibility;
        }
      }
      for (var j = 0; j < element_length; j++) {
        head_average[j].x = head_average[j].x / items.length;
        head_average[j].y = head_average[j].y / items.length;
        head_average[j].z = head_average[j].z / items.length;
        // head_average[j].visibility = head_average[j].visibility / items.length;
        head_average[j].visibility = 1;
      }
      return head_average;

    }
    else {
      let abdo_average = [];
      for (var i=0; i<element_length; i++)
      {
        abdo_average.push({'x': 0, 'y':0, 'z': 0, 'visibility': 0});
      }
      for (var i = 0; i < items.length; i++) {
        for (var j = 0; j < element_length; j++) {
          abdo_average[j].x += items[i][j].x;
          abdo_average[j].y += items[i][j].y;
          abdo_average[j].z += items[i][j].z;
          abdo_average[j].visibility += items[i][j].visibility;
        }
      }
      for (var j = 0; j < element_length; j++) {
        abdo_average[j].x = abdo_average[j].x / items.length;
        abdo_average[j].y = abdo_average[j].y / items.length;
        abdo_average[j].z = abdo_average[j].z / items.length;
        // abdo_average[j].visibility = abdo_average[j].visibility / items.length;
        abdo_average[j].visibility = 1;
      }
      return abdo_average;
    }
  };
}

let body_queue = new Queue();
let head_queue = new Queue();


function onResults(results) {
  // Hide the spinner.
  document.body.classList.add("loaded");
  // Update the frame rate.
  fpsControl.tick();
  // Draw the overlays.
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );
  if ('poseLandmarks' in results)
  {

    body_idxs = [11,12,13,14,15,16,23,24];
    var abdo_list = []; 
    for (var i=0; i<8; i++)
    {
      abdo_list.push(results.poseLandmarks[body_idxs[i]])
    }

    c_ab_x = (results.poseLandmarks[23].x + results.poseLandmarks[24].x) / 2;
    c_ab_y = (results.poseLandmarks[23].y + results.poseLandmarks[24].y) / 2;
    c_ab_z = (results.poseLandmarks[23].z + results.poseLandmarks[24].z) / 2;
    c_ab_v = (results.poseLandmarks[23].visibility + results.poseLandmarks[24].visibility) / 2;

    c_sh_x = (results.poseLandmarks[11].x + results.poseLandmarks[12].x) / 2;
    c_sh_y = (results.poseLandmarks[11].y + results.poseLandmarks[12].y) / 2;
    c_sh_z = (results.poseLandmarks[11].z + results.poseLandmarks[12].z) / 2;
    c_sh_v = (results.poseLandmarks[11].visibility + results.poseLandmarks[12].visibility) / 2;

    ratio_list = [1.5, 3, 6];
    abdo_list.push({'x': c_sh_x, 'y':c_sh_y, 'z': c_sh_z, 'visibility': c_sh_v});
    for (var i=0; i<3; i++)
    { 
      ratio = ratio_list[i];
      _x = (c_sh_x + (ratio - 1) * c_ab_x) / ratio;
      _y = (c_sh_y + (ratio - 1) * c_ab_y) / ratio;
      _z = (c_sh_z + (ratio - 1) * c_ab_z) / ratio;
      _v = (c_sh_v + (ratio - 1) * c_ab_v) / ratio;
      abdo_list.push({'x': _x, 'y':_y, 'z': _z, 'visibility': _v})
    }

    body_queue.update(abdo_list);
    var abdo_averate = body_queue.average();

    drawLandmarks(
      canvasCtx,
      abdo_averate,
      { visibilityMin: 0.15, color: zColor, fillColor: "rgb(18,38,243)", linewidth: 10, }
    );
      drawConnectors(canvasCtx, abdo_averate, POSE_N_CONNECTIONS, {
      visibilityMin: 0.35,
      linewidth: 10,
      color: "rgb(142,239,131)",
    });
  }
  canvasCtx.restore();
}

const pose = new Pose({
  locateFile: (file) => {
    if (`${file}`.indexOf('.tflite') == -1 && `${file}`.indexOf('.data') == -1 && `${file}`.indexOf('.wasm') == -1 )
    {
      return `${file}`;
    }
    else
    {
      return `https://cdn.jsdelivr.net/npm/@stevepeng/skg_pose@1.0.2/${file}`;
    }
    // return `${file}`;
  },
});
pose.onResults(onResults);


function onResultsFaceMesh(results) {
  if (results.multiFaceLandmarks) {
    for (const landmarks of results.multiFaceLandmarks) {
      var newHeadlms = [landmarks[10], landmarks[199], landmarks[234], landmarks[454], landmarks[1]];
      for (var i=0; i<5; i++) 
      {
        newHeadlms[i].x = 1 - newHeadlms[i].x;
      }

      head_queue.update(newHeadlms);
      var head_average = head_queue.average();

      drawLandmarks(
        canvasCtx,
        // newHeadlms,
        head_average,
        { visibilityMin: 0.15, color: zColor, fillColor: "rgb(243,62,18)", linewidth: 10, }
      );
      drawConnectors(canvasCtx, head_average, [[0, 1], [2, 3]],
        { color: 'rgb(142,239,131)' });
    }
  }
  canvasCtx.restore();
}
const faceMesh = new FaceMesh({
  locateFile: (file) => {
    if (`${file}`.indexOf('.data') == -1 && `${file}`.indexOf('.wasm') == -1 )
    {
      return `${file}`;
    }
    else
    {
      return `https://cdn.jsdelivr.net/npm/@stevepeng/skg_pose@1.0.2/${file}`;
    }
    // return `${file}`;
  }
});
faceMesh.setOptions({
  maxNumFaces: 1,
  refineLandmarks: false,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
faceMesh.onResults(onResultsFaceMesh);

canvasCtx.drawImage(
  myImage,
  0,
  0,
  canvasElement.width,
  canvasElement.height
);
canvasCtx.restore();

// canvasCtx.restore();
// pose.send({ image: myImage });

/**
 * Instantiate a camera. We'll feed each frame we receive into the solution.
 */
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await pose.send({ image: videoElement });
    await faceMesh.send({ image: videoElement });
  },
  width: 720,
  height: 720,
});
camera.start();

// Present a control panel through which the user can manipulate the solution
// options.
new ControlPanel(controlsElement, {
  selfieMode: true,
  modelComplexity: 1,
  smoothLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
})
  .add([
    new StaticText({ title: "TestPose" }),
    fpsControl,
    new Toggle({ title: "Selfie Mode", field: "selfieMode" }),
    new Slider({
      title: "Model Complexity",
      field: "modelComplexity",
      discrete: ["Lite", "Full", "Heavy"],
    }),
    new Toggle({ title: "Smooth Landmarks", field: "smoothLandmarks" }),
    new Slider({
      title: "Min Detection Confidence",
      field: "minDetectionConfidence",
      range: [0, 1],
      step: 0.01,
    }),
    new Slider({
      title: "Min Tracking Confidence",
      field: "minTrackingConfidence",
      range: [0, 1],
      step: 0.01,
    }),
  ])
  .on((options) => {
    videoElement.classList.toggle("selfie", options.selfieMode);
    pose.setOptions(options);
  });
