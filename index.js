const { request } = require('express');
const express = require('express');
const app = express()

const morgan = require('morgan')

app.use(express.urlencoded({extended:true}))
app.use(express.json())


let phonelist = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (req) => {
    if (req.method == "POST") {
        return JSON.stringify(req.body)
    }

});

app.get('/api/persons', (req,res) => {
res.send({phonelist})
})

app.get('/info', (req,res) => {
    let count = Object.keys(phonelist).length
    let datetime = new Date();
    res.send(`Phonebook has info for ${count} people<br><br>${datetime}`)
    
})


app.get("/api/persons/:id", (req, res) => {
    const { id } = req.params;
    const person = phonelist.find((person) => person.id === Number(id))
    
     if(!person){
       return res
       .status(404)
       .json({msg: `no peoples with id ${id}`})
    }
    res.send(person)
})
    
app.delete("/api/persons/:id", (req, res) => {
    const { id } = req.params;
    phonelist = phonelist.filter(e => e.id !== id);
    
    if(!person){
        return res
        .status(404)
        .json({msg: `no peoples with id ${id}`})
     }
     res.send(person)
})

let randomizer = function getRandomInt(min, max) {
    min = Math.ceil(5);
    max = Math.floor(100);
    return Math.floor(Math.random() * (max - min) + min)}

app.post("/api/persons", (req, res) => {
    const body = req.body;
    if(!body.name) {
        return res.status(400).json({
            error: "Missing information 'name'"
        });
    } else if (!body.number){
        return res.status(400).json({
            error: "Missing information 'number'"
        });
    } else if (phonelist.find(c => c.name === body.name)){
        return res.status(400).json({
            error: "Name is alredy filled",
        });
    }

    const person = {
        id: randomizer(),
        name: body.name,
        number: body.number,
    };
    res.json(person);

});

app.listen(3001, () => {console.log("Listening on port 3001")})