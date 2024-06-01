const express = require('express');
const multer = require('multer');
const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');
const Employee = require('../model/employee');

const router = express.Router();

// Configure Multer for file upload
const upload = multer({ dest: 'uploads/' });

// Route for uploading CSV file
router.post('/Uploader', upload.single('csvFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a CSV file' });
    }

    const csvData = [];
    const filePath = path.resolve(req.file.path);
    const fileStream = fs.createReadStream(filePath);

    fileStream
      .pipe(csv.parse({ headers: true }))
      .on('data', (row) => {
        if (row.name && row.email && row.email.trim() !== "") {
          csvData.push(row);
        }
      })
      .on('end', async () => {
        // Remove duplicates based on email
        const uniqueData = [];
        const emailSet = new Set();
        for (const row of csvData) {
          if (!emailSet.has(row.email)) {
            emailSet.add(row.email);
            uniqueData.push(row);
          }
        }

        // Update or insert data
        try {
          for (const data of uniqueData) {
            await Employee.findOneAndUpdate(
              { email: data.email },
              data,
              { upsert: true, new: true, setDefaultsOnInsert: true }
            );
          }
          res.status(200).json({ message: 'CSV data uploaded successfully' });
        } catch (err) {
          console.error('Error inserting data:', err);
          res.status(500).json({ message: 'Error uploading CSV data' });
        } finally {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Error removing file:', err);
            }
          });
        }
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error);
        res.status(500).json({ message: 'Error reading CSV file' });
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error removing file:', err);
          }
        });
      });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ message: 'Error uploading CSV data' });
  }
});

module.exports = router;
