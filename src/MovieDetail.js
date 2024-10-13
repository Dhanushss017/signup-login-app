import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMovie(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <section className="py-5 vh-100 d-flex align-items-center bg_lightblue">
      <div className="container">
      <h3 className="title text-center text_primary mb-3">{movie.title}</h3>
        <div className="row justify-content-center">
            <div className="col-md-10">
            <div className="card d-flex shadow-none  justify-content-between flex-md-row movies_card border-0 h-100">
          <div>
          <img className="p-3" src={movie.poster} alt={movie.title} />

          </div>
          <div className="card-body align-self-center">
            <h3 className="title mb-3">{movie.title}</h3>
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
            <p className="mb-2">
              <strong>Plot:</strong> {movie.plot}
            </p>
            <p className="mb-2">
              <strong>Cast:</strong> {movie.cast.join(", ")}
            </p>
          </div>
        </div>
            </div>
        </div>
       
      </div>
    </section>
  );
};

export default MovieDetail;
