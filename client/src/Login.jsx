import CardContent from "@mui/material/CardContent";
import { Button, Card, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
function Login() {
  const [login, setlogin] = useState({
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
    setlogin({ ...login, [e.target.name]: e.target.value });
  }

  function handleLogin(e) {
    e.preventDefault()
    console.log(login);
  }
  return (
    <div>
      <Card sx={{ minWidth: 275, p:2 }}>
        <Typography variant="h4">Login here</Typography>
        <form onSubmit={handleLogin}>
          <CardContent sx={{display:'flex', flexDirection:'column', gap:2 }}>
            <TextField
              size="small"
              onChange={handleChange}
              value={login.email}
              name="email"
              type="email"
              placeholder="johndoe@gmail.com"
            />
            <TextField
              size="small"
              onChange={handleChange}
              value={login.name}
              name="name"
              type="text"
              placeholder="john doe"
            />
            <TextField
              size="small"
              onChange={handleChange}
              value={login.password}
              name="password"
              type={showPassword?'text':'password'}
              placeholder="Password"
              InputProps={{
                endAdornment: <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
              }}
            />
          </CardContent>
            <Button variant="contained" type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
}

export default Login;
