import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import MoviesList from './MoviesList';
import RegisteredUser from './RegisteredUser';
import MovieDetail from './MovieDetail';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/movieslist" element={<MoviesList />} />
          <Route path='/registered-user' element={<RegisteredUser />}/>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
