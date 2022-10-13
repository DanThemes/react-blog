import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';

const Article = () => {
  const [ article, setArticle ] = useState('')
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async() => {
      try {
        const article = await axios.get(`http://localhost:3001/api/articles/${id}`);

        setArticle(article.data);
      } catch (err) {
        return navigate('/')
      }
    }

    fetchArticle();
  }, [id, navigate])

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
      </div>
      <h3>{article.title}</h3>
      <div className="article-content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }} />
    </article>
  )
}

export default Article