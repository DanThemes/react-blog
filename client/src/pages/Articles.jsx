import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import sanitizeHtml from 'sanitize-html';

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
          {article.image ? (
            <Link to={`/articles/${article._id}`}>
              <img src={article.image} alt={article.title} />
            </Link>
          ) : (
            <Link to={`/articles/${article._id}`}>
              <img src="https://via.placeholder.com/800x150" alt={article.title} />
            </Link>
          )}
          
          <Link to={`/articles/${article._id}`}><h3>{article.title}</h3></Link>

          <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content.replace(/<[^>]+>/g, '').slice(0, 100) + " ...") }}></p>

          <Link to={`/articles/${article._id}`}>Read more</Link>
        </article>
      ))}
    </div>
  )
}

export default Articles