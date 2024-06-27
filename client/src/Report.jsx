import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import moment from "moment";

function Report() {
  let token = localStorage.getItem("token");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const loggedInName = localStorage.getItem("name");
  const [expenses, setexpenses] = useState([]);
  const [timeline, settimeline] = useState("Month");

  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    checkPremiumStatus();
  }, []);

  useEffect(() => {
    if (isPremium === "true") {
      getAllExpenses();
    } else if (isPremium === "false") {
      toast.error("You are not a premium user.");
    }
  }, [isPremium]);

  async function getAllExpenses() {
    try {
      let temp = await axios.get("http://localhost:8800/expense/getExpense", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setexpenses(temp.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function checkPremiumStatus() {
    try {
      const response = await axios.get("http://localhost:8800/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsPremium(response.data.isPremium);
    } catch (err) {
      console.log(err);
    }
  }

  function filterExpenses(timeFrame) {
    const now = moment();
    let filteredExpenses = expenses;

    switch (timeFrame) {
      case "daily":
        filteredExpenses = expenses.filter((expense) =>
          moment(expense.createdAt).isSame(now, "day")
        );
        break;
      case "weekly":
        filteredExpenses = expenses.filter((expense) =>
          moment(expense.createdAt).isSame(now, "week")
        );
        break;
      case "monthly":
        filteredExpenses = expenses.filter((expense) =>
          moment(expense.createdAt).isSame(now, "month")
        );
        break;
      default:
        break;
    }

    return filteredExpenses;
  }

  function calculateTotalAmount(expenses) {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  const displayedExpenses = filterExpenses(timeline);
  const totalAmount = calculateTotalAmount(displayedExpenses);

  async function handleDownload() {
    let body={displayedExpenses,timeline}
    try{
      let temp=await axios.post("http://localhost:8800/expense/downloadExpense", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let a=document.createElement('a')
      a.href=temp.data.fileurl
      a.download=temp.data.fileurl
      a.click()
      toast.success('Download successful!')
    }
    catch(err){
      toast.error('There was something wrong.')
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Stack flexDirection="row" gap={2}>
        <Typography variant="h4">
          Hello, {loggedInName} {isPremium === "true" ? "⭐" : ""}
        </Typography>
        <Select
          size="small"
          label="Select timeline"
          value={timeline}
          onChange={(e) => settimeline(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
        <Button onClick={handleDownload}>Download Expenses</Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Expense</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedExpenses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {new Date(row.createdAt).toLocaleString()}
                </TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
        rowsPerPageOptions={[5,10, 25, 100]}
        component="div"
        count={expenses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </TableContainer>
      Total Amount - {totalAmount}
    </Box>
  );
}

export default Report;
