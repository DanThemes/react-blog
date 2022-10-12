import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Content from './components/Content';
import Header from './components/Header';
import Articles from './pages/Articles';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ContextProvider } from './context/AuthContext';

import './style.scss';



const App = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Content />}>
            <Route index element={<Home />} />
            <Route path='/articles' element={<Articles />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App 