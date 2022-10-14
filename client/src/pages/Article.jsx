import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
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

const Article = () => {
  const [ article, setArticle ] = useState('')
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const navigate = useNavigate();

  const endpoint = `${process.env.REACT_APP_API_URL}/articles/${id}`;

  useEffect(() => {
    const fetchArticle = async() => {
      try {
        const article = await axios.get(endpoint);

        setArticle(article.data);
      } catch (err) {
        return navigate('/')
      }
    }

    fetchArticle();
  }, [id, navigate, endpoint])

  // TODO: add a delete confirmation modal
  const handleDelete = async () => {
    // try {
    //   const response = await axios.delete(endpoint)
    //   console.log(response)
    // } catch (err) {
    //   console.log(err);
    // }

    try {
      console.log(article.image);
      const imageName = article.image.slice(article.image.lastIndexOf('/') + 1);
      console.log(imageName);
      // return;
      const response = await ReactS3Client.deleteFile(imageName);
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    // navigate('/articles')
  }

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <article>
      {article.image ? (
        <img src={article.image} alt={article.title} />
        ) : (
        <img src="https://via.placeholder.com/800x150" alt={article.title} />
      )}
      <div className="article-meta">
          <p>Author: {article.author.username}</p>
          <p>Date: {new Date(article.createdAt).toDateString()}</p>
      </div>
      
      {user.username === article.author.username && (
        <>
          <Link to={`/articles/${article._id}/edit`} className="link">Edit</Link>
          <button className="link" onClick={handleDelete}>Delete</button>
        </>
      )}

      <h1>{article.title}</h1>
      <div className="article-content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }} />
    </article>
  )
}

export default Article