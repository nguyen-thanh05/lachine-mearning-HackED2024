import React, { useState } from 'react';
import './App.css';

function App() {
  const [personImage, setPersonImage] = useState(null);
  const [clothingImage, setClothingImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);

  const personInputHandler = () => {
    const fileInput = document.getElementById('personInput');
    fileInput.click();
  };

  const clothingInputHandler = () => {
    const fileInput = document.getElementById('clothingInput');
    fileInput.click();
  };

  const personChangeHandler = (event) => {
    const file = event.target.files[0];
    setPersonImage(URL.createObjectURL(file));
  };

  const clothingChangeHandler = (event) => {
    const file = event.target.files[0];
    setClothingImage(URL.createObjectURL(file));
  };

  return (
    <div className="App">
      <div className="top-bar">
        <h1 className="title">Picture Me</h1>
        <h1 className="explanation">Next generation e-shopping software</h1>
      </div>
      <header className="App-header">
        {(!personImage || !clothingImage) ? <section className="content-column">
          <div className="input-section">
            {personImage ? (
              <div className="image-container">
                <img alt="Upload Photo Here" src={personImage} />
              </div>
            ) : (
              <div>
                <button onClick={personInputHandler}>Upload Photo of Person</button>
                <input
                  type="file"
                  id="personInput"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={personChangeHandler}
                />
              </div>
            )}
          </div>

          <div className="input-section">
            {clothingImage ? (
              <div className="image-container">
                <img alt="Selected Clothing" src={clothingImage} />
              </div>
            ) : (
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
            )}
          </div>
        </section> : 
          !resultImage ? <div className="loading-spinner"/> : <img alt="Resulting Image" src={personImage} />
        }
        </header>
    </div>
  );
}

export default App;
