// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tharaka', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a schema for login attempts
const loginAttemptSchema = new mongoose.Schema({
    username: String,
    timestamp: { type: Date, default: Date.now }
});

const LoginAttempt = mongoose.model('LoginAttempt', loginAttemptSchema);

// Endpoint to record login attempts
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Simple authentication logic (for demonstration purposes)
    if (username === "parent" && password === "password") {
        const loginAttempt = new LoginAttempt({ username });
        await loginAttempt.save();
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid username or password');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
