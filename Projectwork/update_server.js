const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Add body-parser middleware
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Add body-parser middleware for parsing POST request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/edit-details', (req, res) => {
  res.sendFile(path.join(__dirname, 'edit_profile.html'));
});

app.post('/update-profile', (req, res) => {
    // You can process the form data here and send a response back to the client
    const formData = req.body;
    // Perform the necessary updates or database operations
    // Respond with a success or error message

    // For this example, we'll simply respond with a success message
    res.json({ message: 'Profile updated successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});