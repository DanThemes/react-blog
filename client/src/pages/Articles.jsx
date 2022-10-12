import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      const articles = await axios.get('http://localhost:3001/api/articles');

      setArticles(articles.data);
      console.log(articles);
    }

    fetchArticle();
  }, [])

  return (
    <div className="articles">
      <Link to="/articles/new">Create new article</Link>

      {articles.map(article => (
        <article key={article._id}>
          <img src="https://via.placeholder.com/800x150" alt="article image" />
          <h3>{article.title}</h3>
          <p>{article.content.slice(0, 10) + " ..."}</p>
          <Link to={`/articles/${article._id}`}>Read more</Link>
        </article>
      ))}
    </div>
  )
}

export default Articles