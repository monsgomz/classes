const express = require("express");
 const pokemonJson = require('./pokemon.js');

const app = express();
app.use(express.json());

app.post('/api/pokemon', (req, res) => {
  const {name, type, abilities} = req.body
  const newPokemon = {
    id: Date.now(),
    name,
    type,
    abilities
  }
  pokemonJson.push(newPokemon)
  res.status(201).send({data: newPokemon})
});

app.get("/api/pokemon", (req, res) => {
  res.json({ data: pokemonJson });
});

app.get('/api/pokemon/:pokid', (req, res) => {
  const pokemon = pokemonJson.find(pokemon => pokemon.id === parseInt(req.params.pokid))
  res.send({data: pokemon})
});

app.post('/api/pokemon', (req, res) => {
  const {name, type, abilities} = req.body
  const newPokemon = {
    id: Date.now(),
    name,
    type,
    abilities
  }
  pokemonJson.push(newPokemon)
  res.status(201).send({data: newPokemon})
})

app.put('/api/pokemon/:pkid', (req, res) => {
  const id = parseInt(req.params.pkid)
  const index = pokemonJson.findIndex(pokemon => pokemon.id === id)
  if (index < 0) {
    res.status(404).send({
      errors: [
        {
          status: 'Not found',
          code: '404',
          title: 'Resource does not exist',
          description: `We could not find a pokemon with id: ${id}`
        }
      ]
    })
  } else {
    const {name, type, abilities} = req.body
    const updatePokemon = {id, type, name, abilities}
    pokemonJson[index] = updatePokemon
    res.send({data: updatePokemon})
  }
});

app.patch('/api/pokemon/:pkid', (req, res) => {
  const id = parseInt(req.params.pkid)
  const index = pokemonJson.findIndex(pokemon => pokemon.id === id)
  if (index < 0) {
    res.status(404).send({
      errors: [
        {
          status: 'Not found',
          code: '404',
          title: 'Resource does not exist',
          description: `We could not find a pokemon with id: ${id}`
        }
      ]
    })
  } else {
    const {id, ...theRest} = req.body
    const updatePokemon = Object.assign({}, pokemonJson[index], theRest)
    pokemonJson[index] = updatePokemon
    res.send({data: updatePokemon})
  }
});

app.delete('/api/pokemon/:pkid', (req, res) => {
  const pokemon = pokemonJson.findIndex(pokemon => pokemon.id === parseInt(req.params.pkid));
        
    if(pokemon < 0){
        res.status(404).send({
      errors: [
        {
          status: 'Not found',
          code: '404',
          title: 'Resource does not exist',
          description: `We could not find a pokemon with id: ${req.params.pkid}`
        }
      ]
    })
    }else{
        pokemonJson.splice(pokemon, 1);
        res.json({
            data: pokemon,
        });
    }
});

app.listen(3001, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Server is running in 3001");
});