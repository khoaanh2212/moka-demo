import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

const FileUploader = (props) => (
  <Dropzone
    style={{
      height: 100,
      border: '2px dashed #ddd',
      borderRadius: 3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

    }}
    onDrop={props.onDrop}
    multiple={props.multiple}
    accept={props.accept}
  >
    <div>Drag and drop files to upload or Browse</div>
  </Dropzone>
);

export default FileUploader;

FileUploader.defaultProps = {
  accept: '*/*',
  multiple: false,
  onDrop: () => {
  },
};

FileUploader.propTypes = {
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  onDrop: PropTypes.func,
};
