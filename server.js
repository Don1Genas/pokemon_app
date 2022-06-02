//Require express
const express = require('express');

const pokemon = require('./models/pokemon');

// Create instance of express
const app = express();
const PORT = 3000;


//Setup view engine
app.set('view engine', 'ejs')
app.set('views', './views')

// Create home route
app.get('/', (req, res) => {
    res.send('Welcome to the Pokemon App!');
})

// Create pokemon route
app.get('/pokemon', (req, res) => {
    res.render('Index', {data: pokemon})
})

// app.get*"pokemon/:id", (req, res) =>{
//     res.render("show", {pokemon: pokemon[req.params.id]})

app.get('/pokemon/:id', (req, res) => {
    // console.log(req.params);
    // // res.send(req.params.id)
    // const result = pokemon.filter(item => item.id === Number(req.params.id))
    res.render('Show', {data: pokemon, index: req.params.id} );
})


// App Listener
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})