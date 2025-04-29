import React, { useEffect, useState } from "react";
import { ref, push, onValue, get, remove } from "firebase/database";
import { auth, db } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../Footer/Footer";
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
  Skeleton, // Import Skeleton component
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../../Navbar/Navbar";

const DressReview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dresses, setDresses] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [dressForm, setDressForm] = useState({
    title: "",
    image: "",
    description: "",
  });
  const [loading, setLoading] = useState(true); // Loading state to control the skeleton display

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = ref(db, "users/" + user.uid);
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
    const dressRef = ref(db, "dresses");
    onValue(dressRef, (snapshot) => {
      const data = snapshot.val() || {};
      const dressList = Object.entries(data).map(([id, dress]) => ({
        id,
        ...dress,
      }));
      setDresses(dressList);
      setLoading(false); // Stop loading after data is fetched
    });
  }, []);

  const handleAddDress = () => {
    const { title, image, description } = dressForm;
    if (!title || !image || !description) {
      alert("All fields are required");
      return;
    }

    const dressRef = ref(db, "dresses");
    push(dressRef, dressForm);
    setDressForm({ title: "", image: "", description: "" });
  };

  const handleDeleteDress = (dressId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Dress?"
    );
    if (confirmDelete) {
      const dressRef = ref(db, `dresses/${dressId}`);
      remove(dressRef)
        .then(() => {
          toast.success("Dress item deleted successfully!");
        })
        .catch((error) => {
          toast.error("Failed to delete Dress.");
          console.error("Delete error:", error);
        });
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Clothing Review System
        </Typography>

        {userRole === "admin" && (
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
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add New Dress</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Dress Title"
              value={dressForm.title}
              onChange={(e) =>
                setDressForm({ ...dressForm, title: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Image URL"
              value={dressForm.image}
              onChange={(e) =>
                setDressForm({ ...dressForm, image: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              multiline
              rows={3}
              value={dressForm.description}
              onChange={(e) =>
                setDressForm({ ...dressForm, description: e.target.value })
              }
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
          {loading
            ? // Show skeleton while loading
              Array.from({ length: 4 }).map((_, index) => (
                <Grid item key={index}>
                  <Skeleton variant="rectangular" width={400} height={370} />
                </Grid>
              ))
            : dresses.map((dress) => (
                <Box sx={{ overflowX: "hidden", padding: 1 }}>
                  <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    item
                    key={dress.id}
                  >
                    <Box sx={{ position: "relative" }}>
                      <Card
                        sx={{
                          width: "400px",
                          height: "370px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          transition: "transform 0.3s",
                          "&:hover": {
                            transform: "scale(1.02)",
                            boxShadow: 5,
                          },
                          margin: "auto",
                        }}
                        onClick={() =>
                          navigate(
                            `/DressDetails/${dress.title.replace(/\s+/g, "-")}`
                          )
                        }
                      >
                        {/* Delete Icon - only visible to admin and stays inside the card */}
                        {userRole === "admin" && (
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteDress(dress.id);
                            }}
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              backgroundColor: "rgba(255,255,255,0.7)",
                              "&:hover": {
                                backgroundColor: "rgba(255,255,255,1)",
                              },
                            }}
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                        )}

                        <CardMedia
                          component="img"
                          image={dress.image}
                          alt={dress.title}
                          sx={{
                            height: "300px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <CardContent
                          sx={{
                            height: "200px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" component="div" noWrap>
                            {dress.title}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                </Box>
              ))}
        </Grid>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </>
  );
};

export default DressReview;
