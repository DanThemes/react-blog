import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
  }, [])

  return (
    <article>
      <img src="https://via.placeholder.com/800x150" alt="article image" />
      <h3>{article.title}</h3>
      <p>{article.content}</p>
    </article>
  )
}

export default Article