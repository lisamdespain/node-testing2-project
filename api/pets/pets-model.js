const db = require('../../data/db-config');

function findAll() {
    return db('pets');
}

function findById(id){
    return db('pets').where({id}).first();
}

function insert(pet){
    return db('pets').insert(pet).then(([id]) => findById(id))
}

module.exports = {
    findAll,
    findById,
    insert
}