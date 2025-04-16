
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue, push, remove, update, get } from 'firebase/database';
import { db, auth } from '../../../firebase';
import { Box, Button, Card, CardContent, CardMedia,Typography,Dialog,DialogTitle,DialogContent,DialogActions,TextField,IconButton,Rating,Divider,} from '@mui/material';
import {BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid,} from 'recharts';

import { Delete, Edit } from '@mui/icons-material';
import { onAuthStateChanged } from 'firebase/auth';

const FoodDetails = () => {
  const { title } = useParams();
  const [food, setFood] = useState(null);
  const [foodId, setFoodId] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    username: '',
    title: '',
    description: '',
    rating: 0,
  });
  const [editId, setEditId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = ref(db, 'users/' + user.uid);
        const snapshot = await get(userRef);
        const userData = snapshot.val();
        setUserRole(userData?.role);
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
    const { username, title, description, rating } = reviewForm;
  
    if (!username || !title || !description || !rating) {
      return alert('All fields are required');
    }
  
    if (editId) {
      const reviewToUpdate = ref(db, `reviews/foods/${editId}`);
      update(reviewToUpdate, { ...reviewForm, foodId });
    } else {
      push(reviewRef, { ...reviewForm, foodId });
    }
  
    setReviewForm({ username: '', title: '', description: '', rating: 0 });
    setEditId(null);
    setIsModalOpen(false);
  };


  const handleEditReview = (review) => {
    setReviewForm({
      username: review.username,
      title: review.title,
      description: review.description,
      rating: review.rating,
    });
    setEditId(review.id);
    setIsModalOpen(true);
  };

  const handleDeleteReview = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const reviewToDelete = ref(db, `reviews/foods/${id}`);
      remove(reviewToDelete);
    }
  };

  // Ratings grouped by label
const ratingLabels = {
  5: 'Excellent',
  4: 'Good',
  3: 'Average',
  2: 'Poor',
  1: 'Terrible',
};

// Real-time rating breakdown
const styledRatingBreakdown = [5, 4, 3, 2, 1].map((rating) => ({
  label: ratingLabels[rating],
  count: reviews.filter((r) => parseInt(r.rating) === rating).length,
}));

// Calculate average rating
const totalRating = reviews.reduce((acc, r) => acc + parseInt(r.rating), 0);
const averageRating = reviews.length ? totalRating / reviews.length : 0;


  return (
    <Box p={4}>
      {food && (
        <Card sx={{ maxWidth: 1000, mx: 'auto', mb: 4 }}>
          <CardMedia component="img" height="300" image={food.image} alt={food.title} />
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {food.title}
            </Typography>
            <Typography>{food.description}</Typography>
          </CardContent>
        </Card>
      )}

      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">Reviews</Typography>
        <Button variant="contained" onClick={() => setIsModalOpen(true)} color="primary">
          Write a Review
        </Button>
      </Box>

      {/* Two-part layout */}
      <Box sx={{ display: 'flex', gap: 4, height: '500px' }}>
        {/* Left Summary Box */}
        <Box
          sx={{
            width: '30%',
            p: 3,
            backgroundColor: '#f9f9f9',
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
<Typography variant="h6" fontWeight="bold" gutterBottom>
  All reviews ({reviews.length})
</Typography>
<Box display="flex" alignItems="center" gap={1} mb={1}>
  <Typography variant="h4" fontWeight="bold">{averageRating.toFixed(1)}</Typography>
  <Rating value={averageRating} precision={0.1} readOnly />
  <Typography>({reviews.length})</Typography>
</Box>

{styledRatingBreakdown.map((item, index) => (
  <Box key={index} display="flex" alignItems="center" mb={1}>
    <Typography sx={{ width: 90 }}>{item.label}</Typography>
    <Box sx={{ flexGrow: 1, mx: 1, height: 10, backgroundColor: '#e0e0e0', borderRadius: 5 }}>
      <Box
        sx={{
          width: `${(item.count / reviews.length) * 100}%`,
          height: '100%',
          backgroundColor: '#00aa6c',
          borderRadius: 5,
        }}
      />
    </Box>
    <Typography width={30}>{item.count}</Typography>
  </Box>
))}

        </Box>

        {/* Right Review List */}
        <Box
          sx={{
            width: '65%',
            p: 2,
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 1,
            overflowY: 'auto',
          }}
        >
          {reviews.length > 0 ? (
  reviews.map((review) => (
    <Box key={review.id} mb={3} position="relative">
      {userRole === 'admin' && (
        <Box position="absolute" top={0} right={0}>
          <IconButton size="small" color="primary" onClick={() => handleEditReview(review)}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => handleDeleteReview(review.id)}>
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      )}

      <Box>
        <Typography fontWeight="bold">{review.username}</Typography>
        <Rating value={parseInt(review.rating)} readOnly size="medium" />
        <Typography variant="subtitle1" fontWeight="medium" mt={1}>
          {review.title}
        </Typography>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
          {review.description}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />
    </Box>
  ))
) : (
  <Typography color="textSecondary" align="center">
    No reviews yet.
  </Typography>
)}
        </Box>
      </Box>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Edit Review' : 'Add Review'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Your Name"
            value={reviewForm.username}
            onChange={(e) => setReviewForm({ ...reviewForm, username: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Review Title"
            value={reviewForm.title}
            onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            multiline
            rows={3}
            value={reviewForm.description}
            onChange={(e) => setReviewForm({ ...reviewForm, description: e.target.value })}
          />
          <Box mt={2}>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="rating"
              value={parseInt(reviewForm.rating)}
              onChange={(e, newValue) =>
                setReviewForm({ ...reviewForm, rating: newValue || 0 })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddOrUpdateReview} variant="contained">
            {editId ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FoodDetails;


