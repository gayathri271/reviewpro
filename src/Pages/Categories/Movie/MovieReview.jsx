
import React, { useEffect, useState } from 'react';
import { ref, push, onValue, get, remove } from 'firebase/database';
import { auth, db } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MovieReview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [movieForm, setMovieForm] = useState({ title: '', image: '', description: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = ref(db, 'users/' + user.uid);
        const snapshot = await get(userRef);
        const userData = snapshot.val();
        setUserRole(userData?.role);
      } else {
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const movieRef = ref(db, 'movies');
    onValue(movieRef, (snapshot) => {
      const data = snapshot.val() || {};
      const movieList = Object.entries(data).map(([id, movie]) => ({ id, ...movie }));
      setMovies(movieList);
    });
  }, []);

  const handleAddMovie = () => {
    const { title, image, description } = movieForm;
    if (!title || !image || !description) {
      alert('All fields are required');
      return;
    }

    const movieRef = ref(db, 'movies');
    push(movieRef, movieForm);
    setMovieForm({ title: '', image: '', description: '' });
  };

  const handleDeleteMovie = (movieId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
    if (confirmDelete) {
      const movieRef = ref(db, `movies/${movieId}`);
      remove(movieRef);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Movie Review System
      </Typography>

      {userRole === 'admin' && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setIsModalOpen(true)}
          sx={{ mb: 3 }}
        >
          + Add Movie
        </Button>
      )}

      {/* Modal for Adding Movie */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Movie</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Movie Title"
            value={movieForm.title}
            onChange={(e) => setMovieForm({ ...movieForm, title: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Image URL"
            value={movieForm.image}
            onChange={(e) => setMovieForm({ ...movieForm, image: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            multiline
            rows={3}
            value={movieForm.description}
            onChange={(e) => setMovieForm({ ...movieForm, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleAddMovie();
              setIsModalOpen(false);
            }}
            variant="contained"
          >
            Add Movie
          </Button>
        </DialogActions>
      </Dialog>

      {/* Movie Cards */}
      <Grid container spacing={4} justifyContent="center">
        {movies.map((movie) => (
          <Grid item key={movie.id}>
            <Card
              sx={{
                width: '400px',
                height: '370px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 5,
                },
                position: 'relative',
              }}
            >
              {userRole === 'admin' && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering navigate
                    handleDeleteMovie(movie.id);
                  }}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,1)',
                    },
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              )}

              <CardMedia
                component="img"
                image={movie.image}
                alt={movie.title}
                sx={{
                  height: '300px',
                  width: '100%',
                  objectFit: 'cover',
                }}
                onClick={() => navigate(`/MovieDetails/${movie.title.replace(/\s+/g, '-')}`)}
              />
              <CardContent
                sx={{
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
                onClick={() => navigate(`/MovieDetails/${movie.title.replace(/\s+/g, '-')}`)}
              >
                <Typography variant="h6" component="div" noWrap>
                  {movie.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieReview;
