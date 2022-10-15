import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import { AuthContext } from '../context/AuthContext';

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
  }, [navigate, endpoint])

  // TODO: add a delete confirmation modal
  const handleDelete = async () => {
    const imageFileName = article.image.substring(article.image.indexOf('amazonaws.com/') + 14);
    console.log(imageFileName)
    // return
    // delete image from AWS S3
    try {
      console.log(article.image)
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/aws/${id}`)
      console.log(response)
    } catch (err) {
      console.log(err)
    }

    // return;

    // delete article from db
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/articles/${id}`, id);
    } catch (err) {
      console.log(err)
    }

    // return;
    navigate('/articles')
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