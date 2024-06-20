import CardContent from "@mui/material/CardContent";
import { Button, Card, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
function Login() {
  const navigate=useNavigate()
  const [login, setlogin] = useState({
    email: "",
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

  async function handleLogin(e) {
    e.preventDefault();
    try{
      let temp= await axios.post('http://localhost:8800/user/login',login)
      localStorage.setItem('userid',temp.data.id)
      toast.success('Logged In!')
      navigate('/expenses')
  }
  catch(err){
      toast.error(err.response.data.error)
  }
  }
  return (
    <div>
      <Card sx={{ minWidth: 275, p: 2 }}>
        <Typography variant="h4">Login here</Typography>
        <form onSubmit={handleLogin}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
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
              value={login.password}
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
            Login
          </Button>
        </form>
        <Link to="/sign-up"> Don&apos;t have an account? Sign-up here</Link>
      </Card>
    </div>
  );
}

export default Login;
