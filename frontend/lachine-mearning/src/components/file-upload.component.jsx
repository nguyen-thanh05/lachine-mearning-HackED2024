import React, { useState, useRef } from "react";

import {
  FileUploadContainer,
  FormField,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  InputLabel
} from "./file-upload.styles";
const FileUpload = ({onChange, onClick, ...otherProps}) => {
  const [files, setFiles] = useState({});
  const fileInputField = useRef(null);
  return (
      <FileUploadContainer>
        <DragDropText>Drag and drop your files anywhere or</DragDropText>
        <UploadFileBtn type="button" onClick={onClick}>

          <i className="fas fa-file-upload" />
          <span style={{width:"75%"}}> Upload {otherProps.person? " a person image": " a cloth image"}</span>
        </UploadFileBtn>
        <FormField
          type="file"
          ref={fileInputField}
          title=""
          value=""
                onChange={onChange}
                {...otherProps}
        />
      </FileUploadContainer>
  )
}

export default FileUpload;
