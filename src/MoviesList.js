import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { useNavigate } from "react-router-dom";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

 
  const token = localStorage.getItem("token");

 
  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://node-app-production-738d.up.railway.app/movies",
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      setMovies(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMovies();
    }
  }, [token]);

  
  if (!token) {
    return (
      <section className="vh-100 backlogin_bg d-flex align-items-center">
        <div className="container">
            <div className="backlogin_card">
            <h2 className="fs-30 text-center fw-300">
            Please Login to view the movies list
          </h2>
          <div className="text-center mt-4">
            <button className='btn btn_outline' onClick={() => navigate("/login")}>Go to Login</button>
          </div>
            </div>
          
        </div>
      </section>
    );
  }

 
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

 
  const placeholderImage =
    "https://via.placeholder.com/300x450?text=No+Image+Available";
  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 3) {
      return `${words.slice(0, 3).join(" ")}...`;
    }
    return title;
  };

  return (
    <section className="py-5 bg_lightgrey">
      <div className="container">
        <div className="d-flex mb-5 justify-content-end align-items-center">
          <div className="d-flex gap-4">
            <a className="btn shadow-none btn_outline" href="/registered-user">
              Registered User
            </a>
            <div>
              <div className="dropdown">
                <button
                  className="btn shadow-none btn_secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Company Info
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item cursor-pointer">Blogs</a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                 
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4 movies_row">
          {movies.map((movie, index) => (
            <div className="col-md-3 movies_list mb-4" key={index}>
              <div className="card movies_card border-0 h-100">
                <img
                  src={movie.poster ? movie.poster : placeholderImage}
                  alt={movie.title}
                />
                <div className="card-body">
                  <h3 className="title mb-3">{truncateTitle(movie.title)}</h3>
                  <p className="mb-2">
                    <strong>Genre:</strong> {movie.genres.join(", ")}
                  </p>
                  <p className="mb-2">
                    <strong>Year:</strong> {movie.year}
                  </p>
                  <p className="mb-2">
                    <strong>IMDb:</strong> {movie.imdb.rating} (
                    {movie.imdb.votes} votes)
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoviesList;
