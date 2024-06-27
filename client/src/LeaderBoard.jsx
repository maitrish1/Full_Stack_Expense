import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {toast} from 'react-hot-toast'
function LeaderBoard() {
    const [leaders, setleaders] = useState([])
    let token=localStorage.getItem('token')
    useEffect(() => {
        fetchLeaderBoard()
    }, [])

    async function fetchLeaderBoard(){
        try{
            let temp=await axios.get('https://localhost:8800/premium/totalExpenses',{
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
            })
            setleaders(temp.data)
        }
        catch(err){
            toast.error(err.response.data.message)
        }
    }
    
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="right">Total Expenses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaders.map((row) => (
            <TableRow key={row.userId}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="right">{row.totalExpenses}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default LeaderBoard;
