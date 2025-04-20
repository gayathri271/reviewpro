
// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";
// import {
//   Container,
//   Box,
//   Avatar,
//   Typography,
//   TextField,
//   Button,
//   CssBaseline,
//   Paper,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [login, setLogin] = useState({ email: "", password: "" });
//   const navigate=useNavigate()

//   const handleDetails = (e) => {
//     setLogin({ ...login, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { email, password } = login;
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       alert("Logged in successfully");
//       navigate("/Dashboard");
//     } catch (err) {
//       console.error(err);
//       alert("Login failed. Please check your credentials.");
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           px: 2,
//         }}
//       >
//         <Box
//           sx={{
//             p: "2px",
//             borderRadius: 4,
//             transition: "all 0.5s ease",
//           }}
//         >
//           <Paper
//             elevation={6}
//             sx={{
//               p: 4,
//               borderRadius: 3,
//               width: "100%",
//               backgroundColor: "#ffffff",
//               transition: "0.4s ease-in-out",
//               "&:hover": {
//                 boxShadow: "0 0 30px rgba(248, 87, 166, 0.4)", // peachy coral hover glow
//               },
//             }}
//           >
//             <Box display="flex" flexDirection="column" alignItems="center">
//               <Avatar
//                 sx={{
//                   m: 1,
//                   background: "linear-gradient(to right, #f857a6, #ff5858)",
//                 }}
//               >
//                 <LockOutlinedIcon />
//               </Avatar>
//               <Typography component="h1" variant="h5" fontWeight="bold" color="#f857a6">
//                 Log In
//               </Typography>
//             </Box>

//             <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
//               <TextField
//                 label="Email"
//                 name="email"
//                 type="email"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//                 onChange={handleDetails}
//               />
//               <TextField
//                 label="Password"
//                 name="password"
//                 type="password"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//                 onChange={handleDetails}
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{
//                   mt: 2,
//                   fontWeight: "600",
//                   color: "#fff",
//                   background: "linear-gradient(to right, #f857a6, #ff5858)",
//                   "&:hover": {
//                     background: "linear-gradient(to right, #ff6e89, #ff7676)",
//                   },
//                 }}
//               >
//                 Login
//               </Button>
//             </Box>
//           </Paper>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Login;

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
  const [login, setLogin] = useState({ email: "", password: "" });
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
      setTimeout(() => navigate("/Dashboard"), 2000); // delay to show toast
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please check your credentials.");
    }
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
                onChange={handleDetails}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                variant="outlined"
                margin="normal"
                onChange={handleDetails}
              />
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
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

