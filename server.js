//Require express
const express = require('express');

// Create instance of express
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the Pokemon App!');
})


// App Listener
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})