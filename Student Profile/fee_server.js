const express = require('express');
const app = express();

const feeReceipts = {
  "spring_2023": { semester: 'Spring 2023', amount: 1000, receiptNumber: 'SPRING123' },
  "summer_2023": { semester: 'Summer 2023', amount: 900, receiptNumber: 'SUMMER456' },
  "fall_2023": { semester: 'Fall 2023', amount: 1100, receiptNumber: 'FALL789' },
  // Add more fee receipt data for other semesters
};

app.use(express.static('public')); // Serve static HTML and JS files from the 'public' folder

// Endpoint to fetch the list of available semesters
app.get('/semesters', (req, res) => {
  const semesters = Object.keys(feeReceipts); // Get the list of available semesters
  res.json(semesters);
});

app.get('/fee-receipt/:semester', (req, res) => {
  const semester = req.params.semester;

  // Find the fee receipt data for the requested semester
  const selectedReceipt = feeReceipts[semester];

  if (selectedReceipt) {
    res.json(selectedReceipt); // Send the receipt data as JSON
  } else {
    res.status(404).json({ error: 'Fee receipt not found for the specified semester' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
