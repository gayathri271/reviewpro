
// import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../../firebase"; // ✅ make sure 'db' is exported from firebase.js
// import { ref, set } from "firebase/database"; // ✅ Realtime Database
// import { useNavigate } from "react-router-dom";

// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Avatar,
//   CssBaseline,
//   Paper,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";


// const schema = yup.object().shape({
//   name: yup.string().required("Name is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
// });

// const Signup = () => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({ resolver: yupResolver(schema) });

  
//   const onSubmit = async (data) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         data.email,
//         data.password
//       );

//       const user = userCredential.user;

//       console.log(user);
      

//       if (user && user.uid) {
//         set(ref(db, 'users/' + user.uid), {
//           role:"user",
//           email: user.email,
//           name: data.name,
//           uid: user.uid
//         });
//       } else {
//         console.error("User UID is undefined. Cannot write to database.");
//       }
//       alert("Signup successful!");
//       navigate("/Login");
//     } catch (error) {
//       alert(error.message);
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
//           bgcolor: "background.default",
//         }}
//       >
//         <Paper
//           elevation={10}
//           sx={{
//             p: 4,
//             borderRadius: 4,
//             width: "100%",
//             backgroundColor: "#fdf2f8",
//           }}
//         >
//           <Box display="flex" flexDirection="column" alignItems="center">
//             <Avatar
//               sx={{
//                 m: 1,
//                 background: "linear-gradient(to right, #f857a6, #ff5858)",
//               }}
//             >
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
//               Create Account
//             </Typography>
//           </Box>

//           <Box
//             component="form"
//             onSubmit={handleSubmit(onSubmit)}
//             sx={{ mt: 3 }}
//           >
//             <TextField
//               fullWidth
//               label="Name"
//               type="text"
//               variant="outlined"
//               margin="normal"
//               {...register("name")}
//               error={!!errors.name}
//               helperText={errors.name?.message}
//             />
//             <TextField
//               fullWidth
//               label="Email"
//               type="email"
//               variant="outlined"
//               margin="normal"
//               {...register("email")}
//               error={!!errors.email}
//               helperText={errors.email?.message}
//             />
//             <TextField
//               fullWidth
//               label="Password"
//               type="password"
//               variant="outlined"
//               margin="normal"
//               {...register("password")}
//               error={!!errors.password}
//               helperText={errors.password?.message}
//             />

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               disabled={isSubmitting}
//               sx={{
//                 mt: 3,
//                 mb: 2,
//                 background: "linear-gradient(to right, #f857a6, #ff5858)",
//                 color: "#fff",
//                 fontWeight: 600,
//                 "&:hover": {
//                   background: "linear-gradient(to right, #ff6e89, #ff7676)",
//                 },
//               }}
//             >
//               {isSubmitting ? "Signing Up..." : "Sign Up"}
//             </Button>

//             <Typography variant="body2" align="center" color="text.secondary">
//               Already have an account?{" "}
//               <span
//                 onClick={() => navigate("/Login")}
//                 style={{ color: "#f857a6", cursor: "pointer" }}
//               >
//                 Log in
//               </span>
//             </Typography>
//           </Box>
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default Signup;





import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  CssBaseline,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";



const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      if (user && user.uid) {
        await set(ref(db, 'users/' + user.uid), {
          role: "user",
          email: user.email,
          name: data.name,
          uid: user.uid,
        });

        // toast.success("Signup successful! 🎉", { autoClose: 2000 });
        toast.success("Account created successfully. Happy to have you!", { autoClose: 2000 });
        setTimeout(() => {
          navigate("/Login");
        }, 2500); // wait for toast to show
      } else {
        toast.error("User ID not found. Please try again.");
      }
    } catch (error) {
      toast.error(error.message || "Signup failed.");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ToastContainer position="top-right" theme="light" />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
>

      
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 4,
            width: "100%",
            backgroundColor: "#fdf2f8",
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
            <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
              Create Account
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <TextField
              fullWidth
              label="Name"
              type="text"
              variant="outlined"
              margin="normal"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              sx={{
                mt: 3,
                mb: 2,
                background: "linear-gradient(to right, #f857a6, #ff5858)",
                color: "#fff",
                fontWeight: 600,
                "&:hover": {
                  background: "linear-gradient(to right, #ff6e89, #ff7676)",
                },
              }}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>

            <Typography variant="body2" align="center" color="text.secondary">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/Login")}
                style={{ color: "#f857a6", cursor: "pointer" }}
              >
                Log in
              </span>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup;
