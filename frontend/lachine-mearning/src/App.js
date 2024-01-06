import logo from './logo.svg';
import './App.css';
import ImageUploading from 'react-images-uploading';
import React, { useState } from 'react';

function App() {
  const [image, setImage] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <ImageUploading 
          value={image} 
          multiple={false}
        >
          {() => (<h3>Upload Here</h3>)}
        </ImageUploading>
      </header>
    </div>
  );
}

export default App;
