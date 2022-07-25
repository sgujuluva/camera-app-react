//react lib
import { useEffect, useRef, useState } from "react";
//import {BsFillCameraFill} from "react-icons/bs"
import resetImg from "./images/reset.png";
import cameraImg from "./images/camera-ani.gif";
import cameraStill from "./images/camera-still.png";
import uploadImg from "./images/upload.gif";
import downloadImg from "./images/download.gif";

//styles
 import "./App.css"; 

function App() {
  const [camImg, setCamImg] = useState(cameraStill);
  const [loadImg, setLoadImg] = useState(false);
  const [base64Img, setBase64Img] = useState("");
  let videoRef = useRef(null);
  let photoRef = useRef(null);
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((response) => {
      //capturing the current video using useRef
      let video = videoRef.current;
      // intialising the response object to video sourceobj
      video.srcObject = response;
      // video streaming (auto play)
      video.play();
    });
  }, [videoRef]);

  const handleClick = () => {
    //while clicking cameraani pic to be shown from still to ani
    setCamImg(cameraImg);

    setLoadImg(true);
    
    //capturing the current video
    let video = videoRef.current;
    //capturing the current photo from the current video
    let photo = photoRef.current;
    //setting height and width to draw in canvas
    const width = video.offsetWidth;
    const height = video.offsetHeight;
    //setting height and width for the photo captured
    photo.width = width;
    photo.height = height;
    //drawing in canvas
    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    //to bring the animated camer to normal camera---setting to normal
    setTimeout(function () {
      setCamImg(cameraStill);
    }, 1500);
  };
  const handleReset = () => {
    setLoadImg(false); 
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
    
  };

  const handleUpload = () => {
    let photo = photoRef.current;
    const convert2Base64 = photo.toDataURL("image/jeg");
    setBase64Img(convert2Base64);
  };
  return (
    <div className="App">
      <h1>Camera App</h1>
      <video ref={videoRef}></video>
      <div className="button">
        <img
          src={camImg}
          alt="camera img"
          className="takePic"
          onClick={handleClick}
        />
        <img
          src={resetImg}
          alt="reset img"
          className="reset"
          onClick={handleReset}
        />
      </div>

      <canvas ref={photoRef}></canvas>
      <div className="load">
        {loadImg ? (<div><button className="upload" onClick={handleUpload}>
          <img src={uploadImg} />
        </button>
        <button className="download">
          <img src={downloadImg} />
        </button></div>) : ""}
      </div>
    </div>
  );
}

export default App;

/* <img src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgCAYAAAA10dz"  */
