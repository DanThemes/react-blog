import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateArticle = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError(false);

    try {
      const article = await axios.post('http://localhost:3001/api/articles/new', {
        title,
        content
      });

      navigate(`/articles/${article.data._id}`)

      // console.log(article.data);

    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <div>
      <h2>Create a new article</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          name="content"
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
        ></textarea>

        <button>Save</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  )
}

export default CreateArticle