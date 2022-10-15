import axios from 'axios';
import React, { useContext, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// const config = {
//   bucketName: process.env.REACT_APP_AWS_S3_BUCKET,
//   dirName: 'react-blog',
//   region: process.env.REACT_APP_AWS_S3_REGION,
//   accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
//   secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//   s3Url: `https://${process.env.REACT_APP_AWS_S3_BUCKET}.s3.${process.env.REACT_APP_AWS_S3_REGION}.amazonaws.com`,
// }
// const ReactS3Client = new S3(config);

const ArticleForm = ({ articleData, endpoint }) => {
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useContext(AuthContext)
  const navigate = useNavigate();

  // get a presigned url
  const getPresignedUrl = async () => {
    if (!image) return null;

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/aws`, {
        fileName: image.name
      })
      console.log(response)
      return response;
    } catch (err) {
      setError(err);
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);

    const presignedUrl = await getPresignedUrl();
    
    if (image) {
      // upload to AWS S3
      const response = await axios.put(presignedUrl.data.url, image)
      console.log(response)
    }

    const imageUrl = presignedUrl ? presignedUrl.data.fullFileName : null

    console.log(imageUrl)
    // return;

    // save article to db
    try {
      const options = {
        image: imageUrl,
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
      navigate(`/articles/${article.data._id}`)
    } catch (err) {
      setError(err);
      // setError(err.response.data);
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