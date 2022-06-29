const db = require('../data/db-config');
const Pets = require('./pets/pets-model');
const server = require('./server');
const request = require('supertest');

const newPet = {name: 'Sugar', type: 'dog', gender: 'female'};

beforeAll(async () =>{
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async () =>{
    await db('pets').truncate();
    await db.seed.run();
})

afterAll(async ()=>{
    await db.destroy();
})

test('sanity check - environment', async () =>{
    expect(process.env.NODE_ENV).toBe('testing');
})

describe('model tests', () =>{
    test('findAll()', async () =>{
        const result = await Pets.findAll();
        expect(result).toHaveLength(4);
        expect(result[0]).toHaveProperty('name', 'Lucky');
    })
    test('findById()', async () =>{
        let result = await Pets.findById(4);
        expect(result.name).toBe('Mabel');
        expect(result.id).toBe(4);
        expect(result.type).toBe('dog')
    })
    test('insert', async () =>{
        let result = await Pets.insert(newPet)
        expect(result.name).toBe('Sugar');
        expect(result.id).toBe(5);
        expect(result).toBeDefined();
        result = await Pets.findAll();
        expect(result).toHaveLength(5);
        expect(result[4].name).toBe('Sugar');
    })
})

describe('server tests', () =>{
    test('get /pets', async () =>{
        let res = await request(server).get('/pets')
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).toHaveLength(4);
    })
    test('get /pets/:id', async ()=>{
        let res = await request(server).get('/pets/4');
        expect(res).toBeDefined();
        expect(res.body.name).toBe("Mabel");
        expect(res.body.id).toBe(4);
        res = await request(server).get('/pets/35');
        expect(res.statusCode).toBe(400)
    })
    test('post /pets', async () =>{
        let res = await request(server).post('/pets').send(newPet);
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe('Sugar');
        expect(res.body.id).toBe(5);
        res = await request(server).get('/pets');
        expect(res.body).toHaveLength(5);
        expect(res.body[4].name).toBe('Sugar');
      
    })
})