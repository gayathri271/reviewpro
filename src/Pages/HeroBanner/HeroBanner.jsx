
import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { Star } from '@mui/icons-material';

const HeroBanner = () => {
  const burgerIcon = 'https://img.freepik.com/free-vector/hamburger_53876-25481.jpg?t=st=1744795004~exp=1744798604~hmac=ca72dd347010dddedaec223570e36f1ea9333ad77f0ac47a4fa8216d849ec4ac&w=826';
//   const movieIcon = 'https://img.freepik.com/free-vector/cinema-film-production-realistic-transparent-composition-with-isolated-image-clapper-with-empty-fields-vector-illustration_1284-66163.jpg?t=st=1744795802~exp=1744799402~hmac=aae4b38b565d34beecda73fcd75af5aea63baaab5a88f3f8e72978704a25cf5f&w=826';
//   const dressIcon = 'https://img.freepik.com/premium-vector/traditional-womens-attire-india_1183143-500.jpg?w=740';
  const girlIllustration = 'https://img.freepik.com/premium-vector/teenagers-are-playing-with-gadgets-gadget-addiction_995281-14427.jpg?w=826';

  const RatingStars = () => (
    <Box display="flex" gap={0.3} justifyContent="center" mt={0.5}>
      {[...Array(5)].map((_, index) => (
        <Star key={index} sx={{ color: '#facc15', fontSize: '1rem' }} />
      ))}
    </Box>
  );

  const IconCard = ({ icon, alt, style }) => (
    <Paper
      elevation={4}
      sx={{
        width: 90,
        height: 110,
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        ...style,
      }}
    >
      <img src={icon} alt={alt} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 8 }} />
      <RatingStars />
    </Paper>
  );

  return (
    <Box sx={{ bgcolor: '#fdf6ef', py: 8, px: { xs: 4, md: 10 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* Left Section */}
      <Box sx={{ width: '50%', pr: 6 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Discover. <br /> Review. Share.
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Your one-stop hub for genuine reviews on food, movies, and fashion.
        </Typography>
        {/* <Box display="flex" gap={2} mt={3}>
          <Button variant="contained" sx={{ bgcolor: '#1f2937', '&:hover': { bgcolor: '#111827' } }}>
            Explore Reviews
          </Button>
          <Button
            variant="outlined"
            sx={{ borderColor: '#1f2937', color: '#1f2937', '&:hover': { bgcolor: '#1f2937', color: '#fff' } }}
          >
            Add Your Review
          </Button>
        </Box> */}
      </Box>

      {/* Right Section */}
      <Box sx={{ width: '60%', position: 'relative', display: 'flex', justifyContent: 'flex-end' }}>
        <Box sx={{ position: 'relative', width: 400, height: 400 }}>
          {/* Main Girl Illustration */}
          <img
            src={girlIllustration}
            alt="Girl using tablet"
            style={{ width: '100%', height: 'auto', zIndex: 1, borderRadius: 12 }}
          />

          {/* Icon Cards Positioned Around */}
          <IconCard icon={burgerIcon} alt="Burger" style={{ top: -20, left: -30 }} />
          {/* <IconCard icon={movieIcon} alt="Movie" style={{ top: -30, right: -30 }} /> 
           <IconCard icon={dressIcon} alt="Dress" style={{ bottom: -5, left: -40 }} /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default HeroBanner;
