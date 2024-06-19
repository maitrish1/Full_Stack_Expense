import CardContent from "@mui/material/CardContent";
import { Button, Card, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
function SignUp() {
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

  function handleSignUp(e) {
    e.preventDefault();
    console.log(signup);
  }
  return (
    <div>
      <Card sx={{ minWidth: 275, p: 2 }}>
        <Typography variant="h4">Sign Up here</Typography>
        <form onSubmit={handleSignUp}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              size="small"
              onChange={handleChange}
              value={signup.email}
              name="email"
              type="email"
              placeholder="johndoe@gmail.com"
            />
            <TextField
              size="small"
              onChange={handleChange}
              value={signup.name}
              name="name"
              type="text"
              placeholder="john doe"
            />
            <TextField
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
