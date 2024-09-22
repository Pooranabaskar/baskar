// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/formDB');

// Define a schema
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: Number,
    message: String,
});

// Define a model
const Form = mongoose.model('Sample', formSchema, 'sample','sample','sample');

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/index1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index1.html'));
});

app.post('/submit', async (req, res) => {// app.js
    const express = require('express');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');
    const path = require('path');
    
    const app = express();
    
    // Middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));
    
    try {
        const formData = new Form({
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            message: req.body.message,
        });

        await formData.save();
        res.send('Data saved successfully!');
    } catch (err) {
        res.send('There was an error saving your data.');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});