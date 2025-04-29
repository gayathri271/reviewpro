
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  CssBaseline,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [login, setLogin] = useState({
    email: "guestUser@gmail.com", // User credentials
    password: "123456",
  });
  const navigate = useNavigate();

  const handleDetails = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = login;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      setTimeout(() => navigate("/Dashboard"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const fillGuestCredentials = () => {
    // Pre-fill Guest Admin credentials
    setLogin({
      email: "guestadmin@gmail.com",
      password: "123456",
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ToastContainer position="top-right" autoClose={3000} />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Box
          sx={{
            p: "2px",
            borderRadius: 4,
            transition: "all 0.5s ease",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 3,
              width: "100%",
              backgroundColor: "#ffffff",
              transition: "0.4s ease-in-out",
              "&:hover": {
                boxShadow: "0 0 30px rgba(248, 87, 166, 0.4)",
              },
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                sx={{
                  m: 1,
                  background: "linear-gradient(to right, #f857a6, #ff5858)",
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                fontWeight="bold"
                color="#f857a6"
              >
                Log In
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                variant="outlined"
                margin="normal"
                value={login.email}
                onChange={handleDetails}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                variant="outlined"
                margin="normal"
                value={login.password}
                onChange={handleDetails}
              />

              {/* Login button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  fontWeight: "600",
                  color: "#fff",
                  background: "linear-gradient(to right, #f857a6, #ff5858)",
                  "&:hover": {
                    background: "linear-gradient(to right, #ff6e89, #ff7676)",
                  },
                }}
              >
                Login
              </Button>

              {/* Guest Admin button — new line */}
              <Button
                type="button"
                fullWidth
                variant="outlined"
                sx={{
                  mt: 2,
                  fontWeight: "600",
                  color: "#f857a6",
                  borderColor: "#f857a6",
                  "&:hover": {
                    borderColor: "#ff6e89",
                    color: "#ff6e89",
                  },
                }}
                onClick={fillGuestCredentials}
              >
                Guest Admin
              </Button>

              <Box sx={{ height: 16 }} />
              <Typography variant="body2" align="center" color="text.secondary">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/Signup")}
                  style={{ color: "#f857a6", cursor: "pointer" }}
                >
                  Sign up
                </span>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
