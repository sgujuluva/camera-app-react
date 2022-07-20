//react lib
import { useEffect, useRef } from "react";
import ImageGallery from "react-image-gallery";
//styles
import "./App.css";

function App() {
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
    //capturing the current video
    let video = videoRef.current;
    //capturing the current photo from the current video
    let photo = photoRef.current;
    //setting height and width to draw in canvas
    const width = 500;
    const height = 200;
    //setting height and width for the photo captured
    photo.width = width;
    photo.height = height;
    //drawing in canvas
    let ctx = photo.getContext("2d");
    ctx.drawImage(video,0,0,width,height)
  }
  return (
    <div className="App">
      <h1>Camera App</h1>
      
      <video ref = {videoRef}></video>
      <button onClick={handleClick}>Take Picture</button>
      <canvas ref={photoRef}></canvas> 
    </div>
  );
}

export default App;
