const constraints = {
  video:true,
  audio: false
}

const tesseract = require("node-tesseract-ocr");
const config = {
  lang: "eng",
  oem: 1,
  psm: 3
}


const cameraView = document.querySelector("#camera_view"),
      cameraOutput = document.querySelector("#camera_output"),
      cameraSensor = document.querySelector("#camera_sensor"),
      cameraTrigger = document.querySelector("#camera_trigger");


//cameraStart will acces the camera and stream the video to the camera_view
function cameraStart(){
  navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => {
    track = stream.getTracks()[0];
    cameraView.srcObject = stream;
  })
  .catch((error) => {
    console.error("Oops. Something is broken.", error);
  })
}

cameraTrigger.onclick = function(){
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoWidth;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraOutput.src = cameraSensor.toDataURL("img/webp");
  cameraOutput.classList.add("taken");
  tesseract.recognize(cameraSensor.toDataURL("img/webp"), config)
  .then((text) => {
    console.log("Result:", text);
  })
  .catch((error) => {
    console.log(error.message);
  })
};

//Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
