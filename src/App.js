//react lib
import { useEffect, useRef,useState } from "react";
//import {BsFillCameraFill} from "react-icons/bs"
import resetImg from "./images/reset.png"
import cameraImg from "./images/camera-ani.gif"
import cameraStill from "./images/camera-still.png"
 
//styles
import "./App.css";

function App() {
  const [camImg,setCamImg] = useState(cameraStill)

  let videoRef = useRef(null);
  let photoRef = useRef(null);
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({video : true})
    .then(response => {
     //capturing the current video using useRef
      let video = videoRef.current;
    // intialising the response object to video sourceobj
      video.srcObject = response;
   // video streaming (auto play)
         video.play();  
    })
  },[videoRef])

  const handleClick = () => {
    //while clicking cameraani pic to be shown from still to ani
    setCamImg(cameraImg );
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
    ctx.drawImage(video,0,0,width,height);
    //to bring the animated camer to normal camera---setting to normal
    setTimeout(function(){
      setCamImg(cameraStill);
    },1500)
  }
  const handleReset = () => {
    photoRef.current = ""; //check---------------not working
  
  }
  return (
    <div className="App">
      <h1>Camera App</h1>      
      <video ref = {videoRef}></video>
      <div className = "button">
      <img src={camImg} alt = "camera img" className = "takePic" onClick={handleClick}/>
      <img src={resetImg} alt = "reset img" className = "reset" onClick = {handleReset}/>
      </div>
      
      <canvas ref={photoRef}></canvas> 
    </div>
  );
}

export default App;
