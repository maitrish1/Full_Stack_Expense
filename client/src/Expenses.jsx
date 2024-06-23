import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import logo from './assets/logo.png'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
function Expenses() {
  let token = localStorage.getItem("token");
  const loggedInName = localStorage.getItem("name");
  const [expenses, setexpenses] = useState([]);
  const [expense, setexpense] = useState({
    amount: 0,
    description: "",
    category: "Fuel",
  });
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    getAllExpenses();
    checkPremiumStatus()
  }, []);

  async function getAllExpenses() {
    try {
      let temp = await axios.get(
        "http://localhost:8800/expense/getExpense" + "",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setexpenses(temp.data);
    } catch (err) {
      console.log(err);
    }
  }
  function handleChange(e) {
    setexpense({ ...expense, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let body = {
      amount: expense.amount,
      description: expense.description,
      category: expense.category,
    };
    try {
      await axios.post("http://localhost:8800/expense/createExpense", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllExpenses();
      toast.success("New Expense Added.");
      setexpense({
        amount: 0,
        category: "Fuel",
        description: "",
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete("http://localhost:8800/expense/deleteExpense/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllExpenses();
      toast.success("Expense has been deleted");
    } catch (err) {
      console.log(err);
    }
  }

  async function checkPremiumStatus() {
    try {
      const response = await axios.get(
        "http://localhost:8800/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsPremium(response.data.isPremium);
    } catch (err) {
      console.log(err);
    }
  }

  async function handlePayment() {
    try {
      const { data } = await axios.post(
        "http://localhost:8800/premium/createOrder",
        { amount: 100 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: "rzp_test_FIqak2hYq00h6z",
        amount: 10000,
        currency: "INR",
        name: "Expense tracker",
        description: "Test Transaction",
        image: logo,
        order_id: data.orderId,
        handler: async function (response) {
          const result = await axios.post(
            "http://localhost:8800/premium/verifyPayment",
            {
              orderId: data.orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          toast.success(result.data.message);
          checkPremiumStatus(); 
        },
        prefill: {
          name: "Maitrish",
          email: "maitrish@gmail.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3e0f75",
        },
      };

      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        console.error("Razorpay SDK not loaded");
        toast.error("Razorpay SDK not loaded");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Stack flexDirection='row' gap={2}>
      <Typography variant="h4">
        Hello, {loggedInName} {isPremium==='true'? "⭐": ''}
      </Typography>
      {isPremium==='false'? <Button variant="text" onClick={()=> handlePayment()}>Buy Premium</Button> :'' }
      
      </Stack>
      

      <form className="expense-form" onSubmit={handleSubmit}>
        <TextField
          size="small"
          onChange={handleChange}
          value={expense.amount}
          name="amount"
          type="number"
          placeholder="Enter Amount"
        />
        <TextField
          size="small"
          onChange={handleChange}
          value={expense.description}
          name="description"
          placeholder="Describe your expenses."
        />

        <Select
          size="small"
          placeholder="Select Category"
          value={expense.category}
          defaultValue="Fuel"
          onChange={(e) => setexpense({ ...expense, category: e.target.value })}
        >
          <MenuItem value="Fuel">Fuel</MenuItem>
          <MenuItem value="Electricity">Electricity</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Hotel">Hotel</MenuItem>
        </Select>

        <Button variant="contained" type="submit">
          Add Expense
        </Button>
      </form>
     
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.amount}
                </TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDelete(row.id)}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Expenses;
