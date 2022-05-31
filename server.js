//Require express
const express = require('express');

const pokemon = require('./models/pokemon');

// Create instance of express
const app = express();
const PORT = 3000;

// Create home route
app.get('/', (req, res) => {
    res.send('Welcome to the Pokemon App!');
})

// Create pokemon route
app.get('/pokemon', (req, res) => {
    res.send(pokemon)
})


// App Listener
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})