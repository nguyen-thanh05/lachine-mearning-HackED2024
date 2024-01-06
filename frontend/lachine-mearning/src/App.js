import logo from './logo.svg';
import './App.css';
import ImageUploading from 'react-images-uploading';
import React, {useState, useEffect} from 'react';

// import axios
import  axios from 'axios';

function App() {
  const [personImage, setPersonImage] = useState(null);
  const [clothingImage, setClothingImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);


  const backendUrl = "http://localhost:8000";
  const userID = 4; // hardcoded userID for now

  const personInputHandler = () => {
    // Trigger the file input programmatically
    const fileInput = document.getElementById('personInput');
    fileInput.click();
  };

  const clothingInputHandler = () => {
    // Trigger the file input programmatically
    const fileInput = document.getElementById('clothingInput');
    fileInput.click();
  };

  const personChangeHandler = (event) => { 
    const file = event.target.files[0];

    // Update the state or perform further actions with the selected image
    //setPersonImage(URL.createObjectURL(file));
    setPersonImage(file);
  }

  const clothingChangeHandler = (event) => {
     const file = event.target.files[0];

    // Update the state or perform further actions with the selected image
    //setClothingImage(URL.createObjectURL(file));
    setClothingImage(file);
  }

    const submitImage = () => {
        console.log('submitting image with url: ' + backendUrl + `/user/${userID}/images/`);
        let formData = new FormData();
        formData.append('clothImage', clothingImage);
        formData.append('personImage', personImage);

        axios.post(backendUrl + `/user/${userID}/images/`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
            }
        }
        ).then((response) => {
            console.log(response);
            // get image url from response
            let clothImgUrl = response.data.clothImage;
            let personImgUrl = response.data.personImage;

            setResultImage(backendUrl + clothImgUrl);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (personImage && clothingImage) {
            // Perform the submit action
            // do fetch request to backend using backendUrl
            //
            submitImage();
        }
    }, [personImage, clothingImage]);

  return (
    <div className="App">
      <header className="App-header">
        {personImage ? 
          <div className="image-container">
            <img alt="Upload Photo Here" src={personImage}/> 
          </div>
          : 
            <div>
              <button onClick={personInputHandler}>Upload Photo of Clothing
              </button>
              <input
                type="file"
                id="personInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={personChangeHandler}
              />
            </div>
        } 

        {clothingImage ? 
          <div className="image-container">
            <img alt="Selected Clothing" src={clothingImage}/> 
          </div>
          : 
            <div>
              <button onClick={clothingInputHandler}>Upload Photo of Clothing</button>
              <input
                type="file"
                id="clothingInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={clothingChangeHandler}
              />
            </div>
          }
        {resultImage ? 
          <div className="image-container">
            <img alt="Result" src={resultImage}/> 
          </div>
          : 
            <div>
              <button onClick={submitImage}>result</button>
            </div>
                }
      </header>
    </div>
  );
}

export default App;
