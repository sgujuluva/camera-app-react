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
     
      let video = videoRef.current;
    
      video.srcObject = response;
   
      /* video.play(); */
    })
  },[videoRef])

  const handleClick = () => {
    let video = videoRef.current;
    let photo = photoRef.current;
    const width = 400;
    const height = 500;
  }
  return (
    <div className="App">
      <h1>Camera App</h1>
      <button onClick={handleClick}>Take Picture</button>
      <video ref = {videoRef}></video>
      <canvas ref={photoRef}></canvas> 
    </div>
  );
}

export default App;
