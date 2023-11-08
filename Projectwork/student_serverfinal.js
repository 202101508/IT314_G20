const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));


app.get('/student-details', (req, res) => {
  res.sendFile(path.join(__dirname, 'student_details.html'));
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
