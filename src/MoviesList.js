import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if the token exists in localStorage
  const token = localStorage.getItem('token');

  // Fetch movies data using Axios
  const fetchMovies = async () => {
    try {
      const response = await axios.get('https://node-app-production-738d.up.railway.app/movies', {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in request headers
        },
      });
      setMovies(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch data on component mount if the token is available
  useEffect(() => {
    if (token) {
      fetchMovies();
    }
  }, [token]);

  // Redirect to login page if no token is found
  if (!token) {
    return (
      <div>
        <h2>Please Login to view the movies list</h2>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  // Conditional rendering based on loading and error state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Movies List</h1>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            {/* Replace 'title' with the actual property of your movie object */}
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;
