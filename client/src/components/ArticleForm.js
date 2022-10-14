import axios from 'axios';
import React, { useContext, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import S3 from 'react-aws-s3';
import { AuthContext } from '../context/AuthContext';

const config = {
  bucketName: process.env.REACT_APP_AWS_S3_BUCKET,
  dirName: 'react-blog',
  region: process.env.REACT_APP_AWS_S3_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  s3Url: `https://${process.env.REACT_APP_AWS_S3_BUCKET}.s3.${process.env.REACT_APP_AWS_S3_REGION}.amazonaws.com`,
}
const ReactS3Client = new S3(config);

const ArticleForm = ({ articleData, endpoint }) => {
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useContext(AuthContext)
  const { id } = useParams();
  const navigate = useNavigate();

  
  // upload image to AWS S3
  const handleUpload = async () => {
    try {
      const response = await ReactS3Client.uploadFile(image, image.name)
      console.log(response)
      return response.location;
    } catch (err) {
      setError(err);
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);

    const imageURL = image ? await handleUpload() : null;

    console.log(imageURL)

    // save article to db
    try {
      const options = {
        image: imageURL,
        title: !title ? articleData.title : title,
        content: !content ? articleData.content : content,
        author: {
          id: user._id,
          username: user.username
        }
      }
      
      const article = articleData ? 
        await axios.put(endpoint, options) : 
        await axios.post(endpoint, options)

      console.log(article)
      navigate(`/articles/${id}`)
    } catch (err) {
      setError(err.response.data);
    }
    setIsLoading(false);
  }

  return (
    <div>
      {articleData && <img src={articleData.image} alt={articleData.title} />}

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
          defaultValue={!title ? articleData?.title : title}
          onChange={e => setTitle(e.target.value)}
        />

        <ReactQuill theme="snow" value={!content ? articleData?.content : content} onChange={setContent} />

        <button>Save {isLoading && <div className="lds-dual-ring"></div>}</button>
      </form>

      {error && <p>{console.log(error)}</p>}
    </div>
  )
}

export default ArticleForm