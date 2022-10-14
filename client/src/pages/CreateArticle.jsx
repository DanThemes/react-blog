import ArticleForm from '../components/ArticleForm';
import { Buffer } from 'buffer';
window.Buffer = Buffer;

const endpoint = `${process.env.REACT_APP_API_URL}/articles/new`;

const CreateArticle = () => {
  return (
    <div>
      <h2>Create a new article</h2>
      <ArticleForm endpoint={endpoint} />
    </div>
  )
}

export default CreateArticle;