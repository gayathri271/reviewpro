
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue, push, remove, update, get } from 'firebase/database';
import { db, auth } from '../../../firebase';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Rating,
  Divider,
  useMediaQuery,
  useTheme,
  Skeleton,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { onAuthStateChanged } from 'firebase/auth';
import Footer from '../../Footer/Footer';
import { toast } from 'react-toastify';
import Navbar from '../../Navbar/Navbar';

const MovieDetails = () => {
  const { title } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieId, setMovieId] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ title: '', description: '', rating: 0 });
  const [userName, setUserName] = useState('');
  const [editId, setEditId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loadingMovie, setLoadingMovie] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLarge = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = ref(db, 'users/' + user.uid);
        const snapshot = await get(userRef);
        const userData = snapshot.val();
        setUserRole(userData?.role);
        setUserName(userData?.name || '');
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const movieRef = ref(db, 'movies');
    onValue(movieRef, (snapshot) => {
      const data = snapshot.val() || {};
      const matched = Object.entries(data).find(
        ([, v]) => v.title.toLowerCase().replace(/\s+/g, '-') === title.toLowerCase()
      );
      if (matched) {
        const [id, mdata] = matched;
        setMovie({ id, ...mdata });
        setMovieId(id);
        setLoadingMovie(false);
        const reviewsRef = ref(db, 'reviews/movies');
        onValue(reviewsRef, (snap) => {
          const all = snap.val() || {};
          const list = Object.entries(all)
            .filter(([, r]) => r.movieId === id)
            .map(([rid, r]) => ({ id: rid, ...r }));
          setReviews(list);
          setLoadingReviews(false);
        });
      }
    });
  }, [title]);

  const handleAddOrUpdateReview = () => {
    const reviewRef = ref(db, 'reviews/movies');
    const { title, description, rating } = reviewForm;
    if (!title || !description || !rating) {
      toast.error('All fields are required');
      return;
    }
    const data = { username: userName, title, description, rating, movieId };
    if (editId) {
      update(ref(db, `reviews/movies/${editId}`), data)
        .then(() => toast.success('Review updated successfully!'))
        .catch(() => toast.error('Failed to update review'));
    } else {
      push(reviewRef, data)
        .then(() => toast.success('Review posted successfully!'))
        .catch(() => toast.error('Failed to post review'));
    }
    setReviewForm({ title: '', description: '', rating: 0 });
    setEditId(null);
    setIsModalOpen(false);
  };

  const handleDeleteReview = (rid) => {
    if (window.confirm('Delete this review?')) remove(ref(db, `reviews/movies/${rid}`));
  };

  const ratingLabels = { 5: 'Excellent', 4: 'Good', 3: 'Average', 2: 'Poor', 1: 'Terrible' };
  const breakdown = [5, 4, 3, 2, 1].map((r) => ({
    label: ratingLabels[r],
    count: reviews.filter((x) => +x.rating === r).length,
  }));
  const total = reviews.reduce((a, r) => a + parseInt(r.rating), 0);
  const avg = reviews.length ? total / reviews.length : 0;

  return (
    <>
      <Navbar />

      <Box p={isSmall ? 2 : isMedium ? 3 : 4}>
        {loadingMovie ? (
          <Skeleton variant="rectangular" height={300} sx={{ maxWidth: 1000, mx: 'auto', mb: 4, borderRadius: 2 }} />
        ) : movie && (
          <Card sx={{ maxWidth: 1000, mx: 'auto', mb: 4 }}>
            <CardMedia
              component="img"
              height={isSmall ? 180 : isMedium ? 250 : 300}
              image={movie.image}
              alt={movie.title}
            />
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom noWrap>
                {movie.title}
              </Typography>
              <Typography sx={{
                overflow: 'hidden', textOverflow: 'ellipsis',
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'
              }}>
                {movie.description}
              </Typography>
            </CardContent>
          </Card>
        )}

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Reviews</Typography>
                    <Button
            variant="contained"
            onClick={() => setIsModalOpen(true)}
            disabled={userRole === 'admin'}   // 👈 disables for admin
            sx={{
              backgroundColor: '#ff5858',
              '&:hover': {
                backgroundColor: '#e64a4a',
              },
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 520,
              color: '#fff',
              px: 3,
              opacity: userRole === 'admin' ? 0.6 : 1,  // Optional: dimmed look for disabled
            }}
          >
            Write a Review
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box sx={{ width: { xs: '100%', md: '30%' }, p: 3, bgcolor: '#f9f9f9', borderRadius: 2, boxShadow: 1 }}>
            {loadingReviews ? (
              <>
                <Skeleton variant="text" width="80%" height={40} />
                <Skeleton variant="rectangular" width="100%" height={100} sx={{ my: 1, borderRadius: 1 }} />
                <Skeleton variant="rectangular" width="100%" height={100} sx={{ my: 1, borderRadius: 1 }} />
              </>
            ) : (
              <>
                <Typography variant="h6" fontWeight="bold" gutterBottom>All reviews ({reviews.length})</Typography>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Typography variant="h4" fontWeight="bold">{avg.toFixed(1)}</Typography>
                  <Rating value={avg} precision={0.1} readOnly />
                  <Typography>({reviews.length})</Typography>
                </Box>
                {breakdown.map((it, i) => (
                  <Box key={i} display="flex" alignItems="center" mb={1}>
                    <Typography sx={{ width: 90 }}>{it.label}</Typography>
                    <Box sx={{ flexGrow: 1, mx: 1, height: 10, bgcolor: '#e0e0e0', borderRadius: 5 }}>
                      <Box sx={{ width: `${(it.count / reviews.length) * 100}%`, height: '100%', bgcolor: '#00aa6c', borderRadius: 5 }} />
                    </Box>
                    <Typography width={30}>{it.count}</Typography>
                  </Box>
                ))}
              </>
            )}
          </Box>

          <Box sx={{ width: { xs: '100%', md: '65%' }, p: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 1, overflowY: 'auto', maxHeight: 500 }}>
            {loadingReviews ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Box key={i} mb={3}>
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="100%" />
                  <Divider sx={{ my: 2 }} />
                </Box>
              ))
            ) : reviews.length > 0 ? reviews.map(r => (
              <Box key={r.id} mb={3} position="relative">
                {userRole === 'admin' && (
                  <Box position="absolute" top={0} right={0}>
                    <IconButton size="small" color="error" onClick={() => handleDeleteReview(r.id)}><Delete fontSize="small" /></IconButton>
                  </Box>
                )}
                <Typography fontWeight="bold">{r.username}</Typography>
                <Rating value={+r.rating} readOnly size="small" />
                <Typography variant="subtitle1" fontWeight="medium" mt={1} noWrap>{r.title}</Typography>
                <Typography variant="body2" sx={{
                  whiteSpace: 'pre-line', overflow: 'hidden', textOverflow: 'ellipsis',
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'
                }}>{r.description}</Typography>
                <Divider sx={{ my: 2 }} />
              </Box>
            )) : <Typography align="center" color="textSecondary">No reviews yet.</Typography>}
          </Box>
        </Box>

        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4, p: 2, bgcolor: '#fff' } }}>
          <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center', pb: 0 }}>{editId ? 'Edit Review' : 'Add Review'}</DialogTitle>
          <DialogContent sx={{ mt: 1 }}>
            <TextField fullWidth margin="normal" label="Review Title" variant="outlined"
              value={reviewForm.title} onChange={e => setReviewForm({ ...reviewForm, title: e.target.value })} />
            <TextField fullWidth margin="normal" label="Description" variant="outlined" multiline rows={4}
              value={reviewForm.description} onChange={e => setReviewForm({ ...reviewForm, description: e.target.value })} />
            <Box mt={2}>
              <Typography component="legend" fontWeight="medium">Rating</Typography>
              <Rating name="rating" value={+reviewForm.rating} onChange={(e, v) => setReviewForm({ ...reviewForm, rating: v || 0 })} />
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
            <Button onClick={() => setIsModalOpen(false)} variant="outlined" sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 500 }}>Cancel</Button>
            <Button onClick={handleAddOrUpdateReview} variant="contained"
              sx={{ bgcolor: '#ff5858', '&:hover': { bgcolor: '#e64a4a' }, borderRadius: 3, textTransform: 'none', fontWeight: 500, color: '#fff', px: 3 }}>
              {editId ? 'Update' : 'Post a review'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Footer />
    </>
  );
};

export default MovieDetails;
