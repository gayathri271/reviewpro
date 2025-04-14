
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
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { onAuthStateChanged } from 'firebase/auth';

const FoodDetails = () => {
  const { title } = useParams();
  const [food, setFood] = useState(null);
  const [foodId, setFoodId] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
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

  const handleCardClick = (review) => {
    setSelectedReview(review);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
    setModalOpen(false);
  };

  return (
    <Box p={4}>
      {food && (
        <Card sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
          <CardMedia component="img" height="300" image={food.image} alt={food.title} />
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {food.title}
            </Typography>
            <Typography>{food.description}</Typography>
          </CardContent>
        </Card>
      )}

      <Box textAlign="center" mb={3}>
        <Button variant="contained" onClick={() => setIsModalOpen(true)} color="primary">
          Add Review
        </Button>
      </Box>

      {/* Review Modal */}
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

      {/* Reviews */}
      <Typography variant="h6" gutterBottom>
        Reviews
      </Typography>

      <Box sx={{ overflowX: 'auto', display: 'flex', gap: 2, pb: 2 }}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card
              key={review.id}
              onClick={() => handleCardClick(review)}
              sx={{
                minWidth: 300,
                maxWidth: 300,
                flexShrink: 0,
                position: 'relative',
                boxShadow: 3,
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': { boxShadow: 6 },
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" noWrap>
                  By: {review.username}
                </Typography>
                <Typography variant="h6" noWrap>
                  {review.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {review.description}
                </Typography>
                <Box mt={1}>
                  <Rating value={parseInt(review.rating)} readOnly />
                </Box>
              </CardContent>
              {userRole === 'admin' && (
                <Box position="absolute" top={5} right={5}>
                  <IconButton
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditReview(review);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteReview(review.id);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              )}
            </Card>
          ))
        ) : (
          <Typography color="textSecondary" sx={{ textAlign: 'center', width: '100%' }}>
            No reviews yet.
          </Typography>
        )}
      </Box>

      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedReview?.title}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle2" color="text.secondary">
            By: {selectedReview?.username}
          </Typography>
          <Typography variant="body1" paragraph sx={{ mt: 1 }}>
            {selectedReview?.description}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Rating value={parseInt(selectedReview?.rating)} readOnly />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FoodDetails;
