import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from '../context/AuthContext';
import { uploadFile } from 'react-s3';
import { Buffer } from 'buffer';
window.Buffer = Buffer;


const config = {
  bucketName: process.env.REACT_APP_AWS_S3_BUCKET,
  dirName: 'react-blog',
  region: process.env.REACT_APP_AWS_S3_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
}
console.log(config)

const CreateArticle = () => {
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState(false)

  const { user } = useContext(AuthContext)

  const navigate = useNavigate();

  // upload image to AWS S3
  const handleUpload = async () => {
    try {
      const response = await uploadFile(image, config)
      console.log(response)
      return response.location;
    } catch (err) {
      console.log(err)
      setError(err);
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setError(false);

    const imageURL = image ? await handleUpload() : null;
    // console.log(imageURL)
    // return;
    
    // save article to db
    try {
      const endpoint = `${process.env.REACT_APP_API_URL}/articles/new`;
      const article = await axios.post(endpoint, {
        image: imageURL,
        title,
        content,
        author: {
          id: user._id,
          username: user.username
        }
      });
      navigate(`/articles/${article.data._id}`)
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <div>
      <h2>Create a new article</h2>

      <form onSubmit={handleSubmit} className="full-form">
        <input
          type="file"
          name="image"
          onChange={e => setImage(e.target.files[0])}
        />

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <ReactQuill theme="snow" value={content} onChange={setContent} />

        <button>Save</button>
      </form>

      {error && <p>{JSON.stringify(error)}</p>}
    </div>
  )
}

export default CreateArticle