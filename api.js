const express = require('express')
const Joi = require('joi')

const app = express()
app.use(express.json())

const cats = [
    {id: 1, name: 'Pirmas'},
    {id: 2, name: 'Antras'},
    {id: 3, name: 'Trečias'}
]

app.get('/', (req, res) => {
    res.send('Give me all your money!')
})

app.get('/api/cats', (req, res) => {
    res.send(cats)
})

app.get('/api/cats/:id', (req, res) => {
   const cat = cats.find(c => c.id === parseInt(req.params.id))
   if(!cat) return res.status(404).send('Record not found')
   res.send(cat)
})

app.post('/api/cats', (req, res) => {
    //if(!req.body.name || req.body.name.length<3) return res.status(400).send('Bad cat name')
/*
    const schema = joi.object({
        name: joi.string().min(3).required()
    })
    const { error } = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
*/
    const { error } = validateCat(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const cat = {
        id: cats.length + 1,
        name: req.body.name
    }
    cats.push(cat)

    res.send(cats)
})

app.put('/api/cats/:id', (req, res) => {
    const cat = cats.find(c => c.id === parseInt(req.params.id))
    if(!cat) return res.status(404).send('Record not found')

    const { error } = validateCat(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    cat.name = req.body.name
    res.send(cats)
})

app.delete('/api/cats/:id', (req, res) => {
    const cat = cats.find(c => c.id === parseInt(req.params.id))
    if(!cat) return res.status(404).send('Record not found')

    cats.splice(cats.indexOf(cat), 1)
    res.send(cats)
})

function validateCat(cat) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(cat)
}

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server is running on ${port} port`))