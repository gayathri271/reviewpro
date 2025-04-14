import React, { useEffect, useState } from 'react';
import { ref, push, onValue, get } from 'firebase/database';
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
  TextField,
  Typography,
} from '@mui/material';

const DressReview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dresses, setDresses] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [dressForm, setDressForm] = useState({ title: '', image: '', description: '' });

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
    const dressRef = ref(db, 'dresses');
    onValue(dressRef, (snapshot) => {
      const data = snapshot.val() || {};
      const dressList = Object.entries(data).map(([id, dress]) => ({ id, ...dress }));
      setDresses(dressList);
    });
  }, []);

  const handleAddDress = () => {
    const { title, image, description } = dressForm;
    if (!title || !image || !description) {
      alert('All fields are required');
      return;
    }

    const dressRef = ref(db, 'dresses');
    push(dressRef, dressForm);
    setDressForm({ title: '', image: '', description: '' });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Dress Review System
      </Typography>

      {userRole === 'admin' && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setIsModalOpen(true)}
          sx={{ mb: 3 }}
        >
          + Add Dress
        </Button>
      )}

      {/* Modal for Adding Dress */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Dress</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Dress Title"
            value={dressForm.title}
            onChange={(e) => setDressForm({ ...dressForm, title: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Image URL"
            value={dressForm.image}
            onChange={(e) => setDressForm({ ...dressForm, image: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            multiline
            rows={3}
            value={dressForm.description}
            onChange={(e) => setDressForm({ ...dressForm, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleAddDress();
              setIsModalOpen(false);
            }}
            variant="contained"
          >
            Add Dress
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dress Cards */}
      <Grid container spacing={4} justifyContent="center">
        {dresses.map((dress) => (
          <Grid item key={dress.id}>
            <Card
              sx={{
                width: '500px',
                height: '500px',
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
              onClick={() => navigate(`/DressDetails/${dress.title.replace(/\s+/g, '-')}`)}
            >
              <CardMedia
                component="img"
                image={dress.image}
                alt={dress.title}
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
                  {dress.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DressReview;
