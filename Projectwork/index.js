const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/update-profile', (req, res) => {
    const { studentName, studentId, academicYear, batch, email, gender, bloodGroup, mobileNo } = req.body;
    
   
    res.json({ message: 'Profile updated successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
