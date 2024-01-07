import logo from './logo.svg';
import './App.css';
import ImageUploading from 'react-images-uploading';
import React, {useState, useEffect} from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "./components/ui/navigation-menu"

import { Button } from "./components/ui/button"
// import axios
import  axios from 'axios';

function App() {
  const [personImage, setPersonImage] = useState(null);
  const [clothingImage, setClothingImage] = useState(null);
    const [clothingImageOriginal, setClothingImageOriginal] = useState(null);
    const [personImageOriginal, setPersonImageOriginal] = useState(null);




  const [resultImage, setResultImage] = useState(null);


  const backendUrl = "http://localhost:8000";
  const userID = 1; // hardcoded userID for now

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
    setPersonImageOriginal(file);

    setPersonImage(URL.createObjectURL(file));
    //setPersonImage(file);
  }

  const clothingChangeHandler = (event) => {
    const file = event.target.files[0];
    setClothingImageOriginal(file);
    setClothingImage(URL.createObjectURL(file));
  };

    const submitImage = () => {
        console.log('submitting image with url: ' + backendUrl + `/user/${userID}/images/`);
        let formData = new FormData();
        formData.append('clothImage', clothingImageOriginal);
        formData.append('personImage', personImageOriginal);

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
    };

    useEffect(() => {
        if (personImageOriginal && clothingImageOriginal) {
        // Perform the submit action
        // do fetch request to backend using backendUrl
        //
            submitImage();
        }
    }, [personImageOriginal, clothingImageOriginal]);

  return (
    <div className="App">
      <div className="top-bar">
        
        <div >
            <h1 className="title">Picture Me</h1>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
              <NavigationMenuTrigger>Item two</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>


        <header className="App-header">
            {(!personImage || !clothingImage) ? <section className="content-column">
              <div className="input-section">
                {personImage ? (
                  <img className="image-container"alt="Upload Photo Here" src={personImage} />
                ) : (
                  <div>
                    <Button onClick={personInputHandler}>Upload Photo of Person</Button>
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
                  <img className="image-container" alt="Selected Clothing" src={clothingImage} />
                ) : (
                  <div>
                    <Button onClick={clothingInputHandler}>Upload Photo of Clothing</Button>
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
              !resultImage ? <div className="loading-spinner"/> : 
              <div className="output-section">
                <img className="image-container" alt="Resulting Image" src={personImage} />
              </div>

            }
            </header>
    </div>
  );
}

export default App;
