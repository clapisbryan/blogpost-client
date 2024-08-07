import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Blog from './pages/Blog/Blog';
import Login from './pages/Login/Login';
import NoMatch from './pages/NoMatch/NoMatch';
import Register from './pages/Register/Register';
import GetComments from './pages/Blog/GetComments/GetComments';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/getComments/:postId" element={<GetComments />} />
          {!token &&
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          }
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
