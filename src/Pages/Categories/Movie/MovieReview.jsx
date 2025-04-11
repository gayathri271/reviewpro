import React, { useEffect, useState } from 'react';
import { ref, push, onValue } from 'firebase/database';
import { db } from '../../../firebase'; 
import './MovieReview.css'

const MovieReview = () => {
  const [isModalOpen,setIsModalOpen]=useState(false)
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [movieForm, setMovieForm] = useState({ title: '', image: '', description: '' });
  const [reviewForm, setReviewForm] = useState({ username: '', title: '', description: '', rating: '' });

  // Fetch movies from Firebase
  useEffect(() => {
    const movieRef = ref(db, 'movies');
    onValue(movieRef, (snapshot) => {
      const data = snapshot.val() || {};
      const movieList = Object.entries(data).map(([id, movie]) => ({ id, ...movie }));
      setMovies(movieList);
    });
  }, []);

  // Fetch reviews when a movie is selected
  useEffect(() => {
    if (!selectedMovie) return;
    const reviewsRef = ref(db, 'reviews/movies');
    onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const reviewList = Object.values(data).filter(r => r.movieId === selectedMovie.id);
      setReviews(reviewList);
    });
  }, [selectedMovie]);

  // Add new movie
  const handleAddMovie = () => {
    const { title, image, description } = movieForm;
    if (!title || !image || !description) return alert('All movie fields are required');
    const movieRef = ref(db, 'movies');
    push(movieRef, movieForm);
    setMovieForm({ title: '', image: '', description: '' });
  };

  // Add new review
  const handleAddReview = () => {
    const { username, title, description, rating } = reviewForm;
    if (!username || !title || !description || !rating) return alert('All review fields are required');
    const reviewRef = ref(db, 'reviews/movies');
    push(reviewRef, {
      ...reviewForm,
      movieId: selectedMovie.id
    });
    setReviewForm({ username: '', title: '', description: '', rating: '' });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Review System</h1>
      <button
  onClick={() => setIsModalOpen(true)}
  className="bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700 transition mb-4"
>
  + Add Movie
</button>

{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 w-full max-w-md relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
        onClick={() => setIsModalOpen(false)}
      >
        &times;
      </button>
      <h2 className="text-xl font-bold mb-4 text-purple-700">Add New Movie</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddMovie();
          setIsModalOpen(false);
        }}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Movie Title"
          value={movieForm.title}
          onChange={(e) => setMovieForm({ ...movieForm, title: e.target.value })}
          className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={movieForm.image}
          onChange={(e) => setMovieForm({ ...movieForm, image: e.target.value })}
          className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <textarea
          placeholder="Movie Description"
          value={movieForm.description}
          onChange={(e) => setMovieForm({ ...movieForm, description: e.target.value })}
          rows={4}
          className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700 transition"
        >
          Add Movie
        </button>
      </form>
    </div>
  </div>
)}
      {/* Display Movie Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            className="bg-white rounded shadow cursor-pointer p-2"
          >
            <img src={movie.image} alt={movie.title} className="w-full h-40 object-cover rounded" />
            <h3 className="text-center mt-2 font-semibold">{movie.title}</h3>
          </div>
        ))}
      </div>

      {/* Display Reviews */}
      {selectedMovie && (
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-2">Reviews for {selectedMovie.title}</h2>
          <img src={selectedMovie.image} alt={selectedMovie.title} className="w-full max-w-md mx-auto rounded mb-4" />
          <p className="mb-4">{selectedMovie.description}</p>

          {/* Add Review Form */}
          <div className="bg-gray-100 p-4 rounded mb-4">
            <h3 className="text-lg font-semibold mb-2">Add Review</h3>
            <input
              type="text"
              placeholder="Your Name"
              value={reviewForm.username}
              onChange={(e) => setReviewForm({ ...reviewForm, username: e.target.value })}
              className="block w-full p-2 mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Review Title"
              value={reviewForm.title}
              onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
              className="block w-full p-2 mb-2 rounded"
            />
            <textarea
              placeholder="Your Review"
              value={reviewForm.description}
              onChange={(e) => setReviewForm({ ...reviewForm, description: e.target.value })}
              className="block w-full p-2 mb-2 rounded"
            />
            <input
              type="number"
              placeholder="Rating (1–5)"
              value={reviewForm.rating}
              onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}
              className="block w-full p-2 mb-2 rounded"
              min="1"
              max="5"
            />
            <button onClick={handleAddReview} className="bg-green-600 text-white px-4 py-2 rounded">Submit Review</button>
          </div>

          {/* Review Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded shadow">
                <p className="text-sm text-gray-600">By: {review.username}</p>
                <h4 className="font-bold">{review.title}</h4>
                <p>{review.description}</p>
                <p className="text-yellow-500 mt-2">Rating: {review.rating} ⭐</p>
              </div>
            ))}
            {reviews.length === 0 && (
              <p className="text-gray-500 text-center col-span-full">No reviews yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieReview;


