
import React, { useEffect, useState } from 'react';
import { ref, push, onValue, get,remove } from 'firebase/database';
import { auth, db } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton'; // ✅ Add this line
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
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const FoodReview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foods, setFoods] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [foodForm, setFoodForm] = useState({ title: '', image: '', description: '' });

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
    const foodRef = ref(db, 'foods');
    onValue(foodRef, (snapshot) => {
      const data = snapshot.val() || {};
      const foodList = Object.entries(data).map(([id, food]) => ({ id, ...food }));
      setFoods(foodList);
    });
  }, []);

  const handleAddFood = () => {
    const { title, image, description } = foodForm;
    if (!title || !image || !description) {
      alert('All fields are required');
      return;
    }

    const foodRef = ref(db, 'foods');
    push(foodRef, foodForm);
    setFoodForm({ title: '', image: '', description: '' });
  };
    const handleDeleteFood = (foodId) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this FoodItem?');
      if (confirmDelete) {
        const foodRef = ref(db, `foods/${foodId}`);
        remove(foodRef);
      }
    };
    


  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Food Review System
      </Typography>

      {userRole === 'admin' && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setIsModalOpen(true)}
          sx={{ mb: 3 }}
        >
          + Add Food
        </Button>
      )}

      {/* Modal for Adding Food */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Food</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Food Title"
            value={foodForm.title}
            onChange={(e) => setFoodForm({ ...foodForm, title: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Image URL"
            value={foodForm.image}
            onChange={(e) => setFoodForm({ ...foodForm, image: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            multiline
            rows={3}
            value={foodForm.description}
            onChange={(e) => setFoodForm({ ...foodForm, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleAddFood();
              setIsModalOpen(false);
            }}
            variant="contained"
          >
            Add Food
          </Button>
        </DialogActions>
      </Dialog>

      {/* Food Cards */}
      <Grid container spacing={4} justifyContent="center">
        {foods.map((food) => (
          <Grid item key={food.id}>
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
                margin: 'auto', // center cards if grid is smaller
              }}
              onClick={() => navigate(`/FoodDetails/${food.title.replace(/\s+/g, '-')}`)}
            >
              
              {userRole === 'admin' && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering navigate
                    handleDeleteFood(food.id);
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
                image={food.image}
                alt={food.title}
                sx={{
                  height: '300px',
                  width: '100%',
                  objectFit: 'cover',
                }}
              />
              <CardContent
                sx={{
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6" component="div" noWrap>
                  {food.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FoodReview;
