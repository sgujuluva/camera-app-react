//react lib
import { useEffect, useRef } from "react";
import ImageGallery from "react-image-gallery";
//styles
import "./App.css";

function App() {
  let videoRef = useRef(null);
  let photoRef = useRef(null);
  return (
    <div className="App">
      <h1>Camera App</h1>
      <button>Take Picture</button>
      <video ref = {videoRef}></video>
      <canvas ref={photoRef}></canvas>
    </div>
  );
}

export default App;
