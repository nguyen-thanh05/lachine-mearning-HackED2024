import logo from './logo.svg';
import './App.css';
import ImageUploading from 'react-images-uploading';
import React, { useState } from 'react';


function App() {
  const [personImage, setPersonImage] = useState(null);
  const [clothingImage, setClothingImage] = useState(null);

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
    setPersonImage(URL.createObjectURL(file));
  }

  const clothingChangeHandler = (event) => {
     const file = event.target.files[0];

    // Update the state or perform further actions with the selected image
    setClothingImage(URL.createObjectURL(file));
  }


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
        <img alt="Result"/> 
      </header>
    </div>
  );
}

export default App;
