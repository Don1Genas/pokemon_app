//Require express
const express = require('express');
const pokemon = require('./models/pokemon');
require('dotenv').config();// configeration for dotenv
const mongoose = require('mongoose');
const PokemonModel = require('./models/PokemonModel')

// Create instance of express/ SETUP
const app = express();
const PORT = 3000;
app.set('view engine', 'ejs')
app.set('views', './views')

//* ======== Middleware
app.use(express.json())// parse the query into json
app.use(express.urlencoded({extended: false})) //parse into javascript

// Create home route
app.get('/', (req, res) => {
    res.send('Welcome to the Pokemon App!');
})

// Create pokemon route
app.get('/pokemon', async (req, res) => {
    
   try {
    // fetch data from db
   const pokemons = await PokemonModel.find();
       
   res.render('Index', {data: pokemons});

   }  catch(error) {
       console.log(error);
   }
});

app.get('/pokemon/new', (req, res) => {
    res.render('new', {
        pageTitle: 'New Pokemon',
        pageHeader: 'Create a new Pokemon'
    })
})

//Post Request Handler
app.post('/pokemon', async(req, res) => {
    //console.log(req.body)
    const newPokemon = req.body // create a newPokemon variable
    // Add a img property to the object
    newPokemon.img = `http://img.pokemondb.net/artwork/${req.body.name.toLowerCase()}`
    
    console.log(newPokemon);

    //Save the new pokemon to the DB
    await PokemonModel.create(newPokemon, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.redirect('/pokemon')
        console.log(result);
    })
    
})


// app.get*"pokemon/:id", (req, res) =>{
//     res.render("show", {pokemon: pokemon[req.params.id]})

app.get('/pokemon/:id', async (req, res) => {
    // console.log(req.params);
    // // res.send(req.params.id)
    // const result = pokemon.filter(item => item.id === Number(req.params.id))

    try {
        console.log(req.params.id);
        const pokemon = await PokemonModel.findById(req.params.id)
        console.log('POKEMON FOUND', pokemon);
        res.render('Show', {
            data: pokemon 
           
        });
    } catch (error) {
        console.log(error);
    }
    
})


// App Listener
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    mongoose.connect(process.env.MONGODB_URI)//A way of connecting to MONGO BD
    console.log('MongoDb connected!');
})