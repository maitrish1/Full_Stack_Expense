const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(cors());

app.listen(8800,(req,res)=>{
    console.log('Server running')
})
