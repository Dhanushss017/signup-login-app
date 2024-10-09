import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import MoviesList from './MoviesList';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movieslist" element={<MoviesList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
