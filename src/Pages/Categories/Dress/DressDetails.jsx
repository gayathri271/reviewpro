
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ref, onValue, push, remove, update, get } from 'firebase/database';
// import { db, auth } from '../../../firebase';
// import {Box, Button, Card, CardContent, CardMedia, Typography, Dialog, DialogTitle, DialogContent, DialogActions,TextField, IconButton, Rating, Divider} from '@mui/material';
// import { Delete, Edit } from '@mui/icons-material';
// import { onAuthStateChanged } from 'firebase/auth';
// import Footer from '../../Footer/Footer';
// import { toast } from 'react-toastify';

// const DressDetails = () => {
//   const { title } = useParams();
//   const [dress, setDress] = useState(null);
//   const [dressId, setDressId] = useState('');
//   const [reviews, setReviews] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [reviewForm, setReviewForm] = useState({
//     title: '',
//     description: '',
//     rating: 0,
//   });
//   const [userName, setUserName] = useState('');
//   const [editId, setEditId] = useState(null);
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const userRef = ref(db, 'users/' + user.uid);
//         const snapshot = await get(userRef);
//         const userData = snapshot.val();
//         setUserRole(userData?.role);
//         setUserName(userData?.name || '');
//       }
//     });
//     return () => unsub();
//   }, []);

//   useEffect(() => {
//     const dressRef = ref(db, 'dresses');
//     onValue(dressRef, (snapshot) => {
//       const data = snapshot.val() || {};
//       const matchedDress = Object.entries(data).find(
//         ([, value]) => value.title.toLowerCase().replace(/\s+/g, '-') === title.toLowerCase()
//       );

//       if (matchedDress) {
//         const [id, dressData] = matchedDress;
//         setDress({ id, ...dressData });
//         setDressId(id);

//         const reviewsRef = ref(db, 'reviews/dresses');
//         onValue(reviewsRef, (snap) => {
//           const allReviews = snap.val() || {};
//           const dressReviews = Object.entries(allReviews)
//             .filter(([, review]) => review.dressId === id)
//             .map(([id, review]) => ({ id, ...review }));
//           setReviews(dressReviews);
//         });
//       }
//     });
//   }, [title]);

//   const handleAddOrUpdateReview = () => {
//     const reviewRef = ref(db, 'reviews/dresses');
//     const { title, description, rating } = reviewForm;

//     if (!title || !description || !rating) {
//       toast.error('All fields are required');
//       return ;
//     }

//     const reviewData = {
//       username: userName,
//       title,
//       description,
//       rating,
//       dressId,
//     };

//     if (editId) {
//       const reviewToUpdate = ref(db, `reviews/dresses/${editId}`);
//       update(reviewToUpdate, reviewData)
//       .then(() => toast.success('Review updated successfully!'))
//       .catch(() => toast.error('Failed to update review'));
//     } else {
//       push(reviewRef, reviewData)
//       .then(() => toast.success('Review posted successfully!'))
//       .catch(() => toast.error('Failed to post review'));
//     }

//     setReviewForm({ title: '', description: '', rating: 0 });
//     setEditId(null);
//     setIsModalOpen(false);
//   };

//   const handleEditReview = (review) => {
//     setReviewForm({
//       title: review.title,
//       description: review.description,
//       rating: review.rating,
//     });
//     setEditId(review.id);
//     setIsModalOpen(true);
//   };

//   const handleDeleteReview = (id) => {
//     if (window.confirm('Are you sure you want to delete this review?')) {
//       const reviewToDelete = ref(db, `reviews/dresses/${id}`);
//       remove(reviewToDelete);
//     }
//   };

//   const ratingLabels = {
//     5: 'Excellent',
//     4: 'Good',
//     3: 'Average',
//     2: 'Poor',
//     1: 'Terrible',
//   };
  
//   // Real-time rating breakdown
//   const styledRatingBreakdown = [5, 4, 3, 2, 1].map((rating) => ({
//     label: ratingLabels[rating],
//     count: reviews.filter((r) => parseInt(r.rating) === rating).length,
//   }));
  
//   // Calculate average rating
//   const totalRating = reviews.reduce((acc, r) => acc + parseInt(r.rating), 0);
//   const averageRating = reviews.length ? totalRating / reviews.length : 0;
  

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="/">CritiCore</a>
//         </div>
//       </nav>
//       <Box p={4}>
//         {dress && (
//           <Card sx={{ maxWidth: 1000, mx: 'auto', mb: 4 }}>
//             <CardMedia component="img" height="300" image={dress.image} alt={dress.title} />
//             <CardContent>
//               <Typography variant="h5" fontWeight="bold" gutterBottom>{dress.title}</Typography>
//               <Typography>{dress.description}</Typography>
//             </CardContent>
//           </Card>
//         )}

//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//           <Typography variant="h6">Reviews</Typography>
//           <Button variant="contained" onClick={() => setIsModalOpen(true)}  sx={{
//               backgroundColor: '#ff5858',
//               '&:hover': {
//                 backgroundColor: '#e64a4a',
//               },
//               borderRadius: 2,
//               textTransform: 'none',
//               fontWeight: 520,
//               color: '#fff',
//               px: 3,
//             }}>
//             Write a Review
//           </Button>
//         </Box>

//          <Box sx={{ display: 'flex', gap: 4, height: '500px' }}>
//                 {/* Left Summary Box */}
//                 <Box
//                   sx={{
//                     width: '30%',
//                     p: 3,
//                     backgroundColor: '#f9f9f9',
//                     borderRadius: 2,
//                     boxShadow: 1,
//                   }}
//                 >
//         <Typography variant="h6" fontWeight="bold" gutterBottom>
//           All reviews ({reviews.length})
//         </Typography>
//         <Box display="flex" alignItems="center" gap={1} mb={1}>
//           <Typography variant="h4" fontWeight="bold">{averageRating.toFixed(1)}</Typography>
//           <Rating value={averageRating} precision={0.1} readOnly />
//           <Typography>({reviews.length})</Typography>
//         </Box>
        
//         {styledRatingBreakdown.map((item, index) => (
//           <Box key={index} display="flex" alignItems="center" mb={1}>
//             <Typography sx={{ width: 90 }}>{item.label}</Typography>
//             <Box sx={{ flexGrow: 1, mx: 1, height: 10, backgroundColor: '#e0e0e0', borderRadius: 5 }}>
//               <Box
//                 sx={{
//                   width: `${(item.count / reviews.length) * 100}%`,
//                   height: '100%',
//                   backgroundColor: '#00aa6c',
//                   borderRadius: 5,
//                 }}
//               />
//             </Box>
//             <Typography width={30}>{item.count}</Typography>
//           </Box>
//         ))}
        
//                 </Box>
        
//                 {/* Right Review List */}
//                 <Box
//                   sx={{
//                     width: '65%',
//                     p: 2,
//                     backgroundColor: '#fff',
//                     borderRadius: 2,
//                     boxShadow: 1,
//                     overflowY: 'auto',
//                   }}
//                 >
//                   {reviews.length > 0 ? (
//           reviews.map((review) => (
//             <Box key={review.id} mb={3} position="relative">
//               {userRole === 'admin' && (
//                 <Box position="absolute" top={0} right={0}>
//                   <IconButton size="small" color="primary" onClick={() => handleEditReview(review)}>
//                     <Edit fontSize="small" />
//                   </IconButton>
//                   <IconButton size="small" color="error" onClick={() => handleDeleteReview(review.id)}>
//                     <Delete fontSize="small" />
//                   </IconButton>
//                 </Box>
//               )}
        
//               <Box>
//                 <Typography fontWeight="bold">{review.username}</Typography>
//                 <Rating value={parseInt(review.rating)} readOnly size="medium" />
//                 <Typography variant="subtitle1" fontWeight="medium" mt={1}>
//                   {review.title}
//                 </Typography>
//                 <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
//                   {review.description}
//                 </Typography>
//               </Box>
        
//               <Divider sx={{ my: 2 }} />
//             </Box>
//           ))
//         ) : (
//           <Typography color="textSecondary" align="center">
//             No reviews yet.
//           </Typography>
//         )}
//                 </Box>
//               </Box>

//               <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth PaperProps={{
//                   sx: {
//                     borderRadius: 4,
//                     p: 2,
//                     backgroundColor: '#fff',
//                   },
//                 }}
//               >
//                 <DialogTitle
//                   sx={{
//                     fontWeight: 'bold',
//                     fontSize: '1.5rem',
//                     textAlign: 'center',
//                     pb: 0,
//                   }}
//                 >
//                   {editId ? 'Edit Review' : 'Add Review'}
//                 </DialogTitle>
              
//                 <DialogContent sx={{ mt: 1 }}>
//                   <TextField
//                     fullWidth
//                     margin="normal"
//                     label="Review Title"
//                     variant="outlined"
//                     value={reviewForm.title}
//                     onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
//                     sx={{ borderRadius: 2 }}
//                   />
              
//                   <TextField
//                     fullWidth
//                     margin="normal"
//                     label="Description"
//                     variant="outlined"
//                     multiline
//                     rows={4}
//                     value={reviewForm.description}
//                     onChange={(e) => setReviewForm({ ...reviewForm, description: e.target.value })}
//                     sx={{ borderRadius: 2 }}
//                   />
              
//                   <Box mt={2}>
//                     <Typography component="legend" fontWeight="medium">
//                       Rating
//                     </Typography>
//                     <Rating
//                       name="rating"
//                       value={parseInt(reviewForm.rating)}
//                       onChange={(e, newValue) => setReviewForm({ ...reviewForm, rating: newValue || 0 })}
//                       size="large"
//                     />
//                   </Box>
//                 </DialogContent>
              
//                 <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
//                   <Button
//                     onClick={() => setIsModalOpen(false)}
//                     variant="outlined"
//                     sx={{
//                       borderRadius: 3,
//                       textTransform: 'none',
//                       fontWeight: 500,
//                     }}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     onClick={handleAddOrUpdateReview}
//                     variant="contained"
//                     sx={{
//                       backgroundColor: '#ff5858',
//                       '&:hover': {
//                         backgroundColor: '#e64a4a',
//                       },
//                       borderRadius: 3,
//                       textTransform: 'none',
//                       fontWeight: 500,
//                       color: '#fff',
//                       px: 3,
//                     }}
//                   >
//                     {editId ? 'Update' : 'Post a review'}
//                   </Button>
//                 </DialogActions>
//               </Dialog>
//       </Box>
//       <Footer />
//     </>
//   );
// };

// export default DressDetails;






import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue, push, remove, update, get } from 'firebase/database';
import { db, auth } from '../../../firebase';
import { Box, Button, Card, CardContent, CardMedia, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Rating, Divider, Skeleton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { onAuthStateChanged } from 'firebase/auth';
import Footer from '../../Footer/Footer';
import { toast } from 'react-toastify';
import Navbar from '../../Navbar/Navbar';

const DressDetails = () => {
  const { title } = useParams();
  const [dress, setDress] = useState(null);
  const [dressId, setDressId] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    title: '',
    description: '',
    rating: 0,
  });
  const [userName, setUserName] = useState('');
  const [editId, setEditId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  // Loading state

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
    const dressRef = ref(db, 'dresses');
    onValue(dressRef, (snapshot) => {
      const data = snapshot.val() || {};
      const matchedDress = Object.entries(data).find(
        ([, value]) => value.title.toLowerCase().replace(/\s+/g, '-') === title.toLowerCase()
      );

      if (matchedDress) {
        const [id, dressData] = matchedDress;
        setDress({ id, ...dressData });
        setDressId(id);

        const reviewsRef = ref(db, 'reviews/dresses');
        onValue(reviewsRef, (snap) => {
          const allReviews = snap.val() || {};
          const dressReviews = Object.entries(allReviews)
            .filter(([, review]) => review.dressId === id)
            .map(([id, review]) => ({ id, ...review }));
          setReviews(dressReviews);
          setIsLoading(false);  // Set loading to false after fetching reviews
        });
      }
    });
  }, [title]);

  const handleAddOrUpdateReview = () => {
    const reviewRef = ref(db, 'reviews/dresses');
    const { title, description, rating } = reviewForm;

    if (!title || !description || !rating) {
      toast.error('All fields are required');
      return ;
    }

    const reviewData = {
      username: userName,
      title,
      description,
      rating,
      dressId,
    };

    if (editId) {
      const reviewToUpdate = ref(db, `reviews/dresses/${editId}`);
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

  // const handleEditReview = (review) => {
  //   setReviewForm({
  //     title: review.title,
  //     description: review.description,
  //     rating: review.rating,
  //   });
  //   setEditId(review.id);
  //   setIsModalOpen(true);
  // };

  const handleDeleteReview = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const reviewToDelete = ref(db, `reviews/dresses/${id}`);
      remove(reviewToDelete);
    }
  };

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
    <>
      <Navbar />
      <Box p={4}>
        {dress && (
          <Card sx={{ maxWidth: 1000, mx: 'auto', mb: 4 }}>
            <CardMedia component="img" height="300" image={dress.image} alt={dress.title} />
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>{dress.title}</Typography>
              <Typography>{dress.description}</Typography>
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

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, height: '500px' }}>
          {/* Left Summary Box */}
          <Box
            sx={{
              width: { xs: '100%', md: '30%' },
              p: 3,
              backgroundColor: '#f9f9f9',
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              All reviews ({reviews.length})
            </Typography>
            {isLoading ? (
              <>
                <Skeleton variant="text" width="60%" height={30} sx={{ mb: 1 }} />
                <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
              </>
            ) : (
              <>
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
              </>
            )}
          </Box>

          {/* Right Review List */}
          <Box
            sx={{
              width: { xs: '100%', md: '65%' },
              p: 2,
              backgroundColor: '#fff',
              borderRadius: 2,
              boxShadow: 1,
              overflowY: 'auto',
            }}
          >
            {isLoading ? (
              <>
                <Skeleton variant="rectangular" height={100} width="100%" sx={{ mb: 3 }} />
                <Skeleton variant="rectangular" height={100} width="100%" sx={{ mb: 3 }} />
                <Skeleton variant="rectangular" height={100} width="100%" sx={{ mb: 3 }} />
              </>
            ) : (
              reviews.length > 0 ? (
                reviews.map((review) => (
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
              )
            )}
          </Box>
        </Box>
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

export default DressDetails;


