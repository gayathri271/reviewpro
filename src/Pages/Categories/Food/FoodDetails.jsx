
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue, push, remove, update, get } from 'firebase/database';
import { db, auth } from '../../../firebase';
import { Box, Button, Card, CardContent, CardMedia, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Rating, Divider, useMediaQuery, useTheme, Skeleton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { onAuthStateChanged } from 'firebase/auth';
import Footer from '../../Footer/Footer';
import { toast } from 'react-toastify';
import Navbar from '../../Navbar/Navbar';

const FoodDetails = () => {
  const { title } = useParams();
  const [food, setFood] = useState(null);
  const [foodId, setFoodId] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ title: '', description: '', rating: 0 });
  const [userName, setUserName] = useState('');
  const [editId, setEditId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

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
    const foodRef = ref(db, 'foods');
    onValue(foodRef, (snapshot) => {
      const data = snapshot.val() || {};
      const matchedFood = Object.entries(data).find(
        ([, value]) => value.title.toLowerCase().replace(/\s+/g, '-') === title.toLowerCase()
      );
      if (matchedFood) {
        const [id, foodData] = matchedFood;
        setFood({ id, ...foodData });
        setFoodId(id);
        const reviewsRef = ref(db, 'reviews/foods');
        onValue(reviewsRef, (snap) => {
          const allReviews = snap.val() || {};
          const foodReviews = Object.entries(allReviews)
            .filter(([, review]) => review.foodId === id)
            .map(([id, review]) => ({ id, ...review }));
          setReviews(foodReviews);
        });
      }
    });
  }, [title]);

  const handleAddOrUpdateReview = () => {
    const reviewRef = ref(db, 'reviews/foods');
    const { title, description, rating } = reviewForm;
    if (!title || !description || !rating) {
      toast.error('All fields are required');
      return;
    }
    const reviewData = { username: userName, title, description, rating, foodId };
    if (editId) {
      const reviewToUpdate = ref(db, `reviews/foods/${editId}`);
      update(reviewToUpdate, reviewData)
        .then(() => toast.success('Review updated successfully!'))
        .catch(() => toast.error('Failed to update review'));
    } else {
      push(reviewRef, reviewData)
        .then(() => toast.success('Review posted successfully!'))
        .catch(() => toast.error('Failed to post review'));
    }
    setReviewForm({ title: '', description: '', rating: 0 });
    setEditId(null);
    setIsModalOpen(false);
  };

  const handleDeleteReview = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const reviewToDelete = ref(db, `reviews/foods/${id}`);
      remove(reviewToDelete);
    }
  };

  const ratingLabels = { 5: 'Excellent', 4: 'Good', 3: 'Average', 2: 'Poor', 1: 'Terrible' };
  const styledRatingBreakdown = [5,4,3,2,1].map(r => ({ label: ratingLabels[r], count: reviews.filter(x=>+x.rating===r).length }));
  const totalRating = reviews.reduce((acc,r)=>acc+parseInt(r.rating),0);
  const averageRating = reviews.length ? totalRating/reviews.length : 0;

  return (
    <>
      <Navbar />
      <Box p={4}>
        {/* Skeleton loading for food details */}
        {!food ? (
          <Skeleton variant="rectangular" width="100%" height={300} />
        ) : (
          <Card sx={{ maxWidth: 1000, mx: 'auto', mb: 4 }}>
            <CardMedia component="img" height="300" image={food.image} alt={food.title} />
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis' }}>
                {food.title}
              </Typography>
              <Typography sx={{ overflow:'hidden', textOverflow:'ellipsis', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
                {food.description}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">Reviews</Typography>
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

        {/* Skeleton loading for reviews */}
        {reviews.length === 0 ? (
          <Skeleton variant="rectangular" height={100} sx={{ mb: 2 }} />
        ) : (
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            {/* Left Summary Box */}
            <Box sx={{ width: { xs: '100%', md: '30%' }, p: 3, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>All reviews ({reviews.length})</Typography>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Typography variant="h4" fontWeight="bold">{averageRating.toFixed(1)}</Typography>
                <Rating value={averageRating} precision={0.1} readOnly />
                <Typography>({reviews.length})</Typography>
              </Box>
              {styledRatingBreakdown.map((item, index) => (
                <Box key={index} display="flex" alignItems="center" mb={1}>
                  <Typography sx={{ width: 90 }}>{item.label}</Typography>
                  <Box sx={{ flexGrow: 1, mx: 1, height: 10, backgroundColor: '#e0e0e0', borderRadius: 5 }}>
                    <Box sx={{ width: `${(item.count / reviews.length) * 100}%`, height: '100%', backgroundColor: '#00aa6c', borderRadius: 5 }} />
                  </Box>
                  <Typography width={30}>{item.count}</Typography>
                </Box>
              ))}
            </Box>

            {/* Right Review List */}
            <Box sx={{ width: { xs: '100%', md: '65%' }, p: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1, overflowY: 'auto', maxHeight: 500 }}>
              {reviews.length > 0 ? (
                reviews.map(review => (
                  <Box key={review.id} mb={3} position="relative">
                    {userRole === 'admin' && (
                      <Box position="absolute" top={0} right={0}>
                        {/* <IconButton size="small" color="primary" onClick={() => handleEditReview(review)}>
                          <Edit fontSize="small" />
                        </IconButton> */}
                        <IconButton size="small" color="error" onClick={() => handleDeleteReview(review.id)}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                    <Box>
                      <Typography fontWeight="bold">{review.username}</Typography>
                      <Rating value={+review.rating} readOnly size="medium" />
                      <Typography variant="subtitle1" fontWeight="medium" mt={1} sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                        {review.title}
                      </Typography>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-line', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {review.description}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                  </Box>
                ))
              ) : (
                <Typography color="textSecondary" align="center">No reviews yet.</Typography>
              )}
            </Box>
          </Box>
        )}

        {/* Modal */}
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4, p: 2, backgroundColor: '#fff' } }}>
          <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center', pb: 0 }}>{editId ? 'Edit Review' : 'Add Review'}</DialogTitle>
          <DialogContent sx={{ mt: 1 }}>
            <TextField fullWidth margin="normal" label="Review Title" variant="outlined" value={reviewForm.title} onChange={e => setReviewForm({ ...reviewForm, title: e.target.value })} sx={{ borderRadius: 2 }} />
            <TextField fullWidth margin="normal" label="Description" variant="outlined" multiline rows={4} value={reviewForm.description} onChange={e => setReviewForm({ ...reviewForm, description: e.target.value })} sx={{ borderRadius: 2 }} />
            <Box mt={2}><Typography component="legend" fontWeight="medium">Rating</Typography><Rating name="rating" value={+reviewForm.rating} onChange={(e, v) => setReviewForm({ ...reviewForm, rating: v || 0 })} size="large" /></Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
            <Button onClick={() => setIsModalOpen(false)} variant="outlined" sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 500 }}>Cancel</Button>
            <Button onClick={handleAddOrUpdateReview} variant="contained" sx={{ backgroundColor: '#ff5858', '&:hover': { backgroundColor: '#e64a4a' }, borderRadius: 3, textTransform: 'none', fontWeight: 500, color: '#fff', px: 3 }}>{editId ? 'Update' : 'Post a review'}</Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Footer />
    </>
  );
};

export default FoodDetails;


