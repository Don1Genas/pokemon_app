//Require express
const express = require('express');

const pokemon = require('./models/pokemon');

// Create instance of express/ SETUP
const app = express();
const PORT = 3000;
app.set('view engine', 'ejs')
app.set('views', './views')

//* ======== Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Create home route
app.get('/', (req, res) => {
    res.send('Welcome to the Pokemon App!');
})

// Create pokemon route
app.get('/pokemon', (req, res) => {
    res.render('Index', {data: pokemon})
})

app.get('/pokemon/new', (req, res) => {
    res.render('new', {
        pageTitle: 'New Pokemon',
        pageHeader: 'Create a new Pokemon'
    })
})

app.post('/pokemon', (req, res) => {
    console.log(req.body)
    
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