import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Pages/Footer/Footer';

const LaunchPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          height: '90vh',
          backgroundImage:
            'url(https://lirp.cdn-website.com/3d3a8a6e/dms3rep/multi/opt/AdobeStock_375191729-1920w.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          px: 2
        }}
      >
        <Box>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Welcome to CritiCore
          </Typography>
          <Typography variant="h5" mb={4}>
            Real reviews from real people – Food, Films, and Fashion
          </Typography>
          <Button   sx={{
              backgroundColor: '#ff5858',
              '&:hover': {
                backgroundColor: '#e64a4a',
              },
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 520,
              color: '#fff',
              px: 3,
            }} size="large" onClick={() => navigate('/SignUp')}>
            Explore Now
          </Button>
        </Box>
      </Box>


      {/* Why Choose Us Section */}
      <Box sx={{ textAlign: 'center', py: 8, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h4" gutterBottom>Why CritiCore?</Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={3}>
            <Typography variant="h6">🔒 Verified Users</Typography>
            <Typography>All reviews are posted by real users.</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">⭐ Honest Reviews</Typography>
            <Typography>No fake fluff. Only real ratings and stories.</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">⚡ Fast & Simple</Typography>
            <Typography>Easy navigation and smooth interface.</Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Final CTA */}
      <Box sx={{ textAlign: 'center', py: 5 }}>
        <Button variant="outlined"             sx={{
              backgroundColor: '#ff5858',
              '&:hover': {
                backgroundColor: '#e64a4a',
              },
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 520,
              color: '#fff',
              px: 3,
            }} size="large" onClick={() => navigate('/Login')}>
          Join the Community
        </Button>
      </Box>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LaunchPage;
