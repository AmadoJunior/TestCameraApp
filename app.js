const constraints = {
  video:{
    facingMode: "user"
  },
  audio: false
}

const cameraView = document.querySelector("#camera_view"),
      cameraOutput = document.querySelector("#camera_output"),
      cameraSensor = document.querySelector("#camera_sensor"),
      cameraTrigger = document.querySelector("#camera_trigger");


//cameraStart will acces the camera and stream the video to the camera_view
const cameraStart = () => {
  navigator.mediaDevices.getUserMedia(constraints)//returns promise "stream"
  .then((stream) => {
    track = stream.getTracks()[0];
    cameraView.srcObject = stream;
  })
  .catch((error) => {
    console.error("Oops. Something is broken.", error);
  })
}

cameraTrigger.onclick = () => {
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoWidth;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraOutput.src = cameraSensor.toDataURL("img/webp");
  cameraOutput.classList.add("taken");
};

//Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
