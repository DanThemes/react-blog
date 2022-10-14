import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ArticleForm from '../components/ArticleForm';
import axios from 'axios'
import { Buffer } from 'buffer';
window.Buffer = Buffer;

const EditArticle = () => {
  const [articleData, setArticleData] = useState(false)
  const { id } = useParams();
  const endpoint = `${process.env.REACT_APP_API_URL}/articles/${id}`;

  useEffect(() => {
    const fetchArticle = async () => {
      const endpoint = `${process.env.REACT_APP_API_URL}/articles/${id}`;
      const { data } = await axios.get(endpoint);
      console.log(data)
      setArticleData(data)
    }
    fetchArticle();
  }, [id])

  return (
    <div>
      <h2>Edit an article</h2>
      <ArticleForm articleData={articleData} endpoint={endpoint} />
    </div>
  )
}

export default EditArticle;