import CardContent from "@mui/material/CardContent";
import { Button, Card, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
function ResetPassword() {
  let {id}=useParams()
  let navigate=useNavigate()
  const [login, setlogin] = useState({
    password:'',
  });

  useEffect(() => {
    verifyToken()
  }, [id])
  
  async function verifyToken(){
    try{
      let temp=await axios.get('https://localhost:8800/user/resetpassword/'+id)
      toast.success(temp.data.message)
    }
    catch(err){
      console.log(err)
    }
  }
  function handleChange(e) {
    setlogin({ ...login, [e.target.name]: e.target.value });
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    try {
      let temp = await axios.post(
        "https://localhost:8800/user/resetpassword/"+id,
        login
      );
      toast.success(temp.data.message)
      navigate('/login')
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <Card sx={{ minWidth: 275, p: 2 }}>
        <Typography variant="h4">Reset Password</Typography>
        <form onSubmit={handleResetPassword}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              required
              size="small"
              onChange={handleChange}
              value={login.password}
              name="password"
              type="text"
              placeholder="Password"
            />
          </CardContent>
          <Button variant="contained" type="submit">
            Reset
          </Button>
        </form>
        
      </Card>
    </div>
  );
}

export default ResetPassword;
