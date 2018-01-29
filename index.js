const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Hello, Main Page.');
});

app.get('/register', (req, res) => {
    res.send('Hello, Register Page.');
});

app.get('/login', (req, res) => {
    res.send('Hello, Login Page.');
});

app.get('/profile', (req, res) => {
    res.send('Hello, Profile Page.');
});

app.listen(PORT, () => { console.log(`Server runs at ${PORT}`) });