const express = require('express');
const Pets = require('./pets/pets-model');

const server = express();
server.use(express.json());

server.get('/pets', (req, res) =>{
    Pets.findAll()
    .then(pets =>{
        res.status(200).json(pets);
    })
    .catch(err =>{
        res.status(500).json(err)
    })
})

server.get('/pets/:id', async (req, res) =>{
    try{
    const result = await Pets.findById(req.params.id)
    if (result == null){
        res.status(400).json({message: 'no pet found'})
        return;
    } 
        res.status(200).json(result)
}
   catch(err) {
        res.status(500).json(err)
    }
}
)

server.post('/pets', (req, res) =>{
    Pets.insert(req.body)
    .then(newPet =>{
        res.status(201).json(newPet)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
})


module.exports = server;