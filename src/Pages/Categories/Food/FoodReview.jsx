// import React, { useEffect, useState } from 'react';
// import { ref, push, onValue, get,remove } from 'firebase/database';
// import { auth, db } from '../../../firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import IconButton from '@mui/material/IconButton'; // ✅ Add this line
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   TextField,
//   Typography,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Footer from '../../Footer/Footer';


// const FoodReview = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [foods, setFoods] = useState([]);
//   const [userRole, setUserRole] = useState(null);
//   const [foodForm, setFoodForm] = useState({ title: '', image: '', description: '' });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const userRef = ref(db, 'users/' + user.uid);
//         const snapshot = await get(userRef);
//         const userData = snapshot.val();
//         setUserRole(userData?.role);
//       } else {
//         setUserRole(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const foodRef = ref(db, 'foods');
//     onValue(foodRef, (snapshot) => {
//       const data = snapshot.val() || {};
//       const foodList = Object.entries(data).map(([id, food]) => ({ id, ...food }));
//       setFoods(foodList);
//     });
//   }, []);

//   const handleAddFood = () => {
//     const { title, image, description } = foodForm;
//     if (!title || !image || !description) {
//       alert('All fields are required');
//       return;
//     }

//     const foodRef = ref(db, 'foods');
//     push(foodRef, foodForm);
//     setFoodForm({ title: '', image: '', description: '' });
//   };
//     // const handleDeleteFood = (foodId) => {
//     //   const confirmDelete = window.confirm('Are you sure you want to delete this FoodItem?');
//     //   if (confirmDelete) {
//     //     const foodRef = ref(db, `foods/${foodId}`);
//     //     remove(foodRef);
//     //   }
//     // };
//     const handleDeleteFood = (foodId) => {
//       const confirmDelete = window.confirm('Are you sure you want to delete this FoodItem?');
//       if (confirmDelete) {
//         const foodRef = ref(db, `foods/${foodId}`);
//         remove(foodRef)
//           .then(() => {
//             toast.success('Food item deleted successfully!');
//           })
//           .catch((error) => {
//             toast.error('Failed to delete food item.');
//             console.error('Delete error:', error);
//           });
//       }
//     };
    
//   return (
//     <>
//   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//   <div className="container-fluid">
//     <a className="navbar-brand" href="/">CritiCore </a>
//     </div>
//     </nav>
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Food Review System
//       </Typography>

//       {userRole === 'admin' && (
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={() => setIsModalOpen(true)}
//           sx={{ mb: 3 }}
//         >
//           + Add Food
//         </Button>
//       )}

//       {/* Modal for Adding Food */}
//       <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>Add New Food</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Food Title"
//             value={foodForm.title}
//             onChange={(e) => setFoodForm({ ...foodForm, title: e.target.value })}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Image URL"
//             value={foodForm.image}
//             onChange={(e) => setFoodForm({ ...foodForm, image: e.target.value })}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Description"
//             multiline
//             rows={3}
//             value={foodForm.description}
//             onChange={(e) => setFoodForm({ ...foodForm, description: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsModalOpen(false)} color="inherit">
//             Cancel
//           </Button>
//           <Button
//             onClick={() => {
//               handleAddFood();
//               setIsModalOpen(false);
//             }}
//             variant="contained"
//           >
//             Add Food
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Food Cards */}
//       <Grid container spacing={4} justifyContent="center">
//         {foods.map((food) => (
// <Grid item key={food.id}>
//   <Box sx={{ position: 'relative' }}> {/* ⬅️ Added this line */}
//     <Card
//       sx={{
//         width: '400px',
//         height: '370px',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         cursor: 'pointer',
//         transition: 'transform 0.3s',
//         '&:hover': {
//           transform: 'scale(1.02)',
//           boxShadow: 5,
//         },
//         margin: 'auto',
//       }}
//       onClick={() => navigate(`/FoodDetails/${food.title.replace(/\s+/g, '-')}`)}
//     >
//       <CardMedia
//         component="img"
//         image={food.image}
//         alt={food.title}
//         sx={{
//           height: '300px',
//           width: '100%',
//           objectFit: 'cover',
//         }}
//       />
//       <CardContent
//         sx={{
//           height: '200px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           textAlign: 'center',
//         }}
//       >
//         <Typography variant="h6" component="div" noWrap>
//           {food.title}
//         </Typography>
//       </CardContent>

//       {/* Delete Icon - stays inside the card now */}
//       {userRole === 'admin' && (
//         <IconButton
//           onClick={(e) => {
//             e.stopPropagation();
//             handleDeleteFood(food.id);
//           }}
//           sx={{
//             position: 'absolute',
//             top: 8,
//             right: 8,
//             backgroundColor: 'rgba(255,255,255,0.7)',
//             '&:hover': {
//               backgroundColor: 'rgba(255,255,255,1)',
//             },
//           }}
//         >
//           <DeleteIcon color="error" />
//         </IconButton>
//       )}
//     </Card>
//   </Box> {/* ⬅️ Close Box here */}
// </Grid>

//         ))}
//       </Grid>
//     </Box>
//     <ToastContainer position="top-right" autoClose={3000} />
//     <Footer />
//     </>
//   );
// };
// export default FoodReview;

import React, { useEffect, useState } from 'react';
import { ref, push, onValue, get, remove } from 'firebase/database';
import { auth, db } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
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
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';

const FoodReview = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foodForm, setFoodForm] = useState({ title: '', image: '', description: '' });
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = ref(db, 'users/' + user.uid);
        const snapshot = await get(userRef);
        const userData = snapshot.val();
        setUserRole(userData?.role);
      } else {
        setUserRole(null);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const foodRef = ref(db, 'foods');
    const unsubscribe = onValue(foodRef, (snapshot) => {
      const data = snapshot.val() || {};
      const foodList = Object.entries(data).map(([id, food]) => ({ id, ...food }));
      setFoods(foodList);
      setLoading(false);
    });
    return () => unsubscribe();
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
      remove(foodRef)
        .then(() => toast.success('Food item deleted successfully!'))
        .catch((error) => {
          toast.error('Failed to delete food item.');
          console.error('Delete error:', error);
        });
    }
  };

  return (
    <>
      <Navbar />
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
              multiline rows={3}
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

        <Grid container spacing={4} justifyContent="center">
          {loading
            ? Array.from(new Array(6)).map((_, idx) => (
                <Grid item key={idx}>
                  <Card sx={{ width: 400, height: 370, margin: 'auto' }}>
                    <Skeleton variant="rectangular" height={300} />
                    <CardContent>
                      <Skeleton height={40} width="60%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : foods.map((food) => (
                <Grid item key={food.id}>
                  <Box sx={{ position: 'relative' }}>
                    <Card
                      sx={{ width: 400, height: 370, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)', boxShadow: 5 }, margin: 'auto' }}
                      onClick={() => navigate(`/FoodDetails/${food.title.replace(/\s+/g, '-')}`)}
                    >
                      <CardMedia
                        component="img"
                        image={food.image}
                        alt={food.title}
                        sx={{ height: 300, width: '100%', objectFit: 'cover' }}
                      />
                      <CardContent sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        <Typography variant="h6" noWrap>
                          {food.title}
                        </Typography>
                      </CardContent>
                      {userRole === 'admin' && (
                        <IconButton
                          onClick={(e) => { e.stopPropagation(); handleDeleteFood(food.id); }}
                          sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255,255,255,0.7)', '&:hover': { backgroundColor: 'rgba(255,255,255,1)' } }}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      )}
                    </Card>
                  </Box>
                </Grid>
              ))}
        </Grid>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </>
  );
};

export default FoodReview;


