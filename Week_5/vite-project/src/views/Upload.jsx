import React, {useState} from 'react';
import PropTypes from 'prop-types';
import useForm from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/apiHooks';

const Upload = () => {
  const initValues = {
    title: '',
    description: '',
    file: '',
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doUpload,
    initValues,
  );
  const {postMedia} = useMedia();
  const {postFile} = useFile();
  const [file, setFile] = useState(null);
  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  async function doUpload() {
    try {
      const token = localStorage.getItem('token');
      postFile(file, token);
      postMedia(file, inputs, token);
    } catch (e) {
      console.log(e.message);
    }
  }
  return (
    <>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://placehold.co/200?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
          type="submit"
          disabled={file && inputs.title.length > 3 ? false : true}
        >
          Upload
        </button>
      </form>
    </>
  );
};
export default Upload;
