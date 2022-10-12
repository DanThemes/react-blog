import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Content from './components/Content';
import Header from './components/Header';
import Articles from './pages/Articles';
import Article from './pages/Article';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ContextProvider } from './context/AuthContext';

import './style.scss';
import CreateArticle from './pages/CreateArticle';



const App = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Content />}>
            <Route index element={<Home />} />
            <Route path='/articles' element={<Articles />} />
            <Route path='/articles/new' element={<CreateArticle />} />
            <Route path='/articles/:id' element={<Article />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />


            <Route path='*' element={<p>This page doesn't exit.</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App 