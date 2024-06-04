const express = require('express');
const multer = require('multer');
const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');
const Employee = require('../model/employee');

const router = express.Router();

// Configure Multer for file upload
const upload = multer({ dest: 'uploads/' });

router.post('/Uploader', upload.single('csvFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a CSV file' });
    }

    const filePath = path.resolve(req.file.path);
    const fileStream = fs.createReadStream(filePath);
    const csvData = [];

    fileStream
      .pipe(csv.parse({ headers: true }))
      .on('data', async (row) => {
        try {
          // Validate row data
          if (row.employeeid && row.name && row.email && row.tier && row.experience && row.skills && row.location) {
            // Parse skills field as JSON
            row.skills = JSON.parse(row.skills);

            // Insert or update employee data
            await Employee.findOneAndUpdate(
              { $or: [{ employeeid: row.employeeid }, { email: row.email }] },
              row,
              { upsert: true, new: true, setDefaultsOnInsert: true }
            );
          } else {
            console.warn('Invalid data found in CSV row:', row);
          }
        } catch (error) {
          console.error('Error processing CSV row:', error);
        }
      })
      .on('end', () => {
        res.status(200).json({ message: 'CSV data uploaded successfully' });
        // Remove the uploaded CSV file
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error removing file:', err);
          }
        });
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error);
        res.status(500).json({ message: 'Error reading CSV file' });
        // Remove the uploaded CSV file in case of error
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