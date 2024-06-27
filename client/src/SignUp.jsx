import CardContent from "@mui/material/CardContent";
import { Button, Card, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import toast from "react-hot-toast";

function SignUp() {
    const navigate = useNavigate()
  const [signup, setsignup] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  function handleChange(e) {
    setsignup({ ...signup, [e.target.name]: e.target.value });
  }

  async function handleSignUp(e) {
    e.preventDefault();
    try{
        await axios.post('https://localhost:8800/user/users',signup)
        toast.success('Your profile is successfully created!')
        navigate('/login')
    }
    catch(err){
        toast.error('Email is already present')
    }
  }
  return (
    <div>
      <Card sx={{ minWidth: 275, p: 2 }}>
        <Typography variant="h4">Sign Up here</Typography>
        <form onSubmit={handleSignUp}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField required
              size="small"
              onChange={handleChange}
              value={signup.email}
              name="email"
              type="email"
              placeholder="johndoe@gmail.com"
            />
            <TextField required
              size="small"
              onChange={handleChange}
              value={signup.name}
              name="name"
              type="text"
              placeholder="john doe"
            />
            <TextField required
              size="small"
              onChange={handleChange}
              value={signup.password}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </CardContent>
          <Button variant="contained" type="submit">
            Sign Up
          </Button>
        </form>
        <Link to="/Login"> Already have an account? Login here</Link>
      </Card>
    </div>
  );
}

export default SignUp;
