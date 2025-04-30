import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  useMediaQuery,
  // useTheme,
  Skeleton,
} from "@mui/material";
import { Star } from "@mui/icons-material";

const HeroBanner = ({ onExploreClick }) => {
  const burgerIcon =
    "https://img.freepik.com/free-vector/hamburger_53876-25481.jpg";
  const girlIllustration =
    "https://img.freepik.com/premium-vector/teenagers-are-playing-with-gadgets-gadget-addiction_995281-14427.jpg";

  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:769px) and (max-width:1024px)"
  );
  // const isLargeScreen = useMediaQuery(
  //   "(min-width:1025px) and (max-width:1440px)"
  // );
  // const isExtraLargeScreen = useMediaQuery("(min-width:1441px)");

  const RatingStars = () => (
    <Box display="flex" gap={0.3} justifyContent="center" mt={0.5}>
      {[...Array(5)].map((_, index) => (
        <Star key={index} sx={{ color: "#facc15", fontSize: "1rem" }} />
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        ...style,
      }}
    >
      {loading ? (
        <>
          <Skeleton variant="rectangular" width={50} height={50} />
          <Skeleton variant="text" width="60%" height={20} />
        </>
      ) : (
        <>
          <img
            src={icon}
            alt={alt}
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
          <RatingStars />
        </>
      )}
    </Paper>
  );

  return (
    <Box
      sx={{
        bgcolor: "#fdf6ef",
        py: isSmallScreen ? 5 : 8,
        px: isSmallScreen ? 2 : { xs: 4, md: 10 },
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          width: isSmallScreen ? "100%" : "50%",
          pr: isSmallScreen ? 0 : 6,
        }}
      >
        {loading ? (
          <>
            <Skeleton variant="text" width="80%" height={50} />
            <Skeleton variant="text" width="100%" height={30} sx={{ mb: 2 }} />
            <Skeleton
              variant="rectangular"
              width={150}
              height={40}
              sx={{ mr: 2, mb: 2 }}
            />
            <Skeleton variant="rectangular" width={150} height={40} />
          </>
        ) : (
          <>
            <Typography
              variant={isSmallScreen ? "h5" : isMediumScreen ? "h4" : "h3"}
              fontWeight="bold"
              gutterBottom
            >
              Discover. <br /> Review. Share.
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              paragraph
              sx={{ fontSize: isSmallScreen ? "0.9rem" : "1rem" }}
            >
              Your one-stop hub for genuine reviews on food, movies, and
              fashion.
            </Typography>
            <Box
              display="flex"
              gap={2}
              mt={3}
              flexDirection={isSmallScreen ? "column" : "row"}
            >
              <Button
                variant="contained"
                sx={{ bgcolor: "#1f2937", "&:hover": { bgcolor: "#111827" } }}
                onClick={onExploreClick}
              >
                Explore Reviews
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#1f2937",
                  color: "#1f2937",
                  "&:hover": { bgcolor: "#1f2937", color: "#fff" },
                }}
                onClick={onExploreClick}
              >
                Add Your Review
              </Button>
            </Box>
          </>
        )}
      </Box>

      {/* Right Section */}

      <Box
        sx={{
          width: { xs: "100%", sm: "60%" },
          mt: { xs: 5, sm: 0 },
          position: "relative",
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-end" },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: 250, sm: 300, md: 400 },
            height: { xs: 250, sm: 300, md: 400 },
            mx: "auto",
            pb: 3,
          }}
        >
          {loading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{ borderRadius: 2 }}
            />
          ) : (
            <img
              src={girlIllustration}
              alt="Girl using tablet"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 12,
                objectFit: "cover",
              }}
            />
          )}
          <IconCard
            icon={burgerIcon}
            alt="Burger"
            style={{
              position: "absolute",
              top: -20,
              left: window.innerWidth <= 320 ? 0 : -30,
              borderRadius: 2,
            }}
          />
        </Box>
      </Box>
    </Box>
    // </Box>
  );
};

export default HeroBanner;
