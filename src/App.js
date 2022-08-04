//react lib
import { useEffect, useRef, useState } from "react";
//import {BsFillCameraFill} from "react-icons/bs"
import resetImg from "./images/reset.png";
import cameraImg from "./images/camera-ani.gif";
import cameraStill from "./images/camera-still.png";
import uploadImg from "./images/upload.gif";
import downloadImg from "./images/download.gif";
//bootstarp carousel
import Carousel from 'react-bootstrap/Carousel';

//styles
import "./App.css";

function App() {
  //setting the state for camera still and camera animation image
  const [camImg, setCamImg] = useState(cameraStill);
  //setting the state for upload icon
  const [uploadIcon, setUploadIcon] = useState(false);
  //setting the state of base64 image (to convert canvas image to normal image)
  const [base64Img, setBase64Img] = useState("");
  //get the images and make carousel
  const [images,setImages] = useState([])
  let videoRef = useRef(null);
  let photoRef = useRef(null);
  useEffect(() => {
    // getting the video of user using mediadevices
    navigator.mediaDevices.getUserMedia({ video: true }).then((response) => {
      //capturing the current video using useRef
      let video = videoRef.current;
      // intialising the response object to video sourceobj
      video.srcObject = response;
      // video streaming (auto play)
      video.play();
    });
  }, [videoRef]);

  const takePicture = () => {
    //while clicking cameraani pic to be shown from still to ani
    setCamImg(cameraImg);
    // once the pic is captured the upload icon is shown
    setUploadIcon(true);

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
    //to bring the animated camera to normal camera---setting to normal
    setTimeout(function () {
      setCamImg(cameraStill);
    }, 1500);
  };
  const retakePicture = () => {
    //once the reset button is clicked, hide the upload icon
    setUploadIcon(false);
    //capture the current image
    let photo = photoRef.current;
    //usng .getcontext method
    let ctx = photo.getContext("2d");
    // clear the current image
    ctx.clearRect(0, 0, photo.width, photo.height);
  };

  const fnConvert2Base64 = () => {
    let photo = photoRef.current;
    //converting the canvas photo to base64 normaljpeg image
    const convert2Base64 = photo.toDataURL("image/jpeg");
    setBase64Img(convert2Base64);
  };

  const fnUploadImg = () => {
    let confirmVal = window.confirm("D you want to upload to your cloud?");
    if(confirmVal){
      fnConvert2Base64();
      if(base64Img){
        fetch("https://62eb826e705264f263d9e90b.mockapi.io/cameraapp",{
          method:"POST",
          body:JSON.stringify({
            "Image":base64Img
          }),
          headers:{"Content-type":"application/json;charset=UTF-8"}
        })
        .then(response => response.json())
        .then(success => {
          console.log(success);
          alert("Image has been uploaded successfully")
        })
        .then(fnGetImages())
        .catch(error => alert(error))
      }
    }
  };

  const fnGetImages = () => {
    fetch("https://62eb826e705264f263d9e90b.mockapi.io/cameraapp"
    .then(response => response.json())
    .then(data => {
      let images= data.map(i => ({src : `${i.image}`}))
      setImages(images)
    })
    )}
  return (
    <div className="App">
      <h1>Camera App</h1>
      <video ref={videoRef}></video>
      <div className="button">
        <img
          src={camImg}
          alt="camera img"
          className="takePic"
          onClick={takePicture}
        />
        <img
          src={resetImg}
          alt="reset img"
          className="reset"
          onClick={retakePicture}
        />
      </div>

      <canvas ref={photoRef}></canvas>
      <div className="load">
        {uploadIcon ? (
          <div>
            <button className="upload" onClick={fnUploadImg}>
              <img src={uploadImg} alt="upload icon" />
              Upload
            </button>
            <button className="download" onClick={fnConvert2Base64}>
              <a href={base64Img} download>
                <img src={downloadImg} alt="download icon" />
              </a>
              Download
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        {
          images ? (
            <Carousel fade>
            {images.map((image, index) => (
              image.src ? 
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image.src}
                  alt="First slide"
                />
              </Carousel.Item> : ""
            ))}
          </Carousel>
            ) : ""
        }
      </div>
    </div>
  );
}

export default App;

/* <img src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgCAYAAAA10dz"  */
