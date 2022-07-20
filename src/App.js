//react lib
import {useEffect, useRef} from "react";
import ImageGallery from "react-image-gallery"
//styles
import './App.css';

function App() {
  let videoRef = useRef(null);
  return (
    <div className="App">
      <h1>Camera App</h1>
      <video ref = {videoRef}></video>
      <button>Take Picture</button>
    </div>
  );
}

export default App;
