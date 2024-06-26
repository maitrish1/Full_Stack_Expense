const Expense = require('../models/Expense.js');
const User = require('../models/User.js');
const AWS=require('aws-sdk')
exports.createExpense = async (req, res) => {
    const { description, amount, category } = req.body;
    const userId = req.user.id;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const expense = await Expense.create({
            description,
            amount,
            category,
            userId
        });

        res.status(201).json(expense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserExpenses = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const expenses = await Expense.findAll({
            where: { userId }
        });

        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const expense = await Expense.findOne({ where: { id, userId } });
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        await expense.destroy();
        res.status(200).json('Expense has been deleted.');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.downloadExpense = async (req, res) => {
    const objectToCsv = function (data) {
      const csvRows = [];
      const headers = Object.keys(data[0]);
      csvRows.push(headers.join(','));
  
      for (const row of data) {
        const values = headers.map(header => {
          const val = row[header];
          return `"${val}"`;
        });
  
        csvRows.push(values.join(','));
      }
  
      return csvRows.join('\n');
    };
  
    const uploadToAWSS3 = (data, filename) => {
      return new Promise((resolve, reject) => {
        let s3bucket = new AWS.S3({
          accessKeyId: process.env.IAM_USER_KEY,
          secretAccessKey: process.env.IAM_SECRET_KEY,
        });
  
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: filename,
          Body: data,
          ACL:"public-read"
        };
  
        s3bucket.upload(params, (err, data) => {
          if (err) {
            console.log('something went wrong', err);
            reject(err);
          } else {
            resolve(data.Location); 
          }
        });
      });
    };
  
    const csvData = objectToCsv(req.body.displayedExpenses);
    try {
      const filename = req.body.timeline + new Date()+'.csv'
      const fileurl = await uploadToAWSS3(csvData, filename);
      res.json({ fileurl });
    } catch (er) {
      return res.status(500).json({ error: er.message });
    }
  };