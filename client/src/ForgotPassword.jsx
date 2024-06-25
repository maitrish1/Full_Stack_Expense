import CardContent from "@mui/material/CardContent";
import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function ForgotPassword() {
  const [login, setlogin] = useState({
    name:'',
    email: "",
  });

  function handleChange(e) {
    setlogin({ ...login, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      let temp = await axios.post(
        "http://localhost:8800/user/forgotpassword",
        login
      );
      toast.success(temp.data.message)
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <Card sx={{ minWidth: 275, p: 2 }}>
        <Typography variant="h4">Forgot Password</Typography>
        <form onSubmit={handleLogin}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              required
              size="small"
              onChange={handleChange}
              value={login.name}
              name="name"
              type="text"
              placeholder="Enter your name."
            />
            <TextField
              required
              size="small"
              onChange={handleChange}
              value={login.email}
              name="email"
              type="email"
              placeholder="johndoe@gmail.com"
            />
          </CardContent>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
        <Stack flexDirection="column" gap={1}>
          <Link to="/sign-up"> Sign-up here</Link>
          <Link to="/login"> Login</Link>
        </Stack>
      </Card>
    </div>
  );
}

export default ForgotPassword;
