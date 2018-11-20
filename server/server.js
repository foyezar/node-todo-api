const express      = require('express'),
      bodyParser   = require('body-parser')

const { ObjectID } = require('mongodb'),
      { mongoose } = require('./db/mongoose'),
      { Todo }     = require('./models/todo'),
      { User }     = require('./models/user')


const app = express()

// middleware
app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  Todo.create({
    text: req.body.text
  }).then((doc) => {
    res.send(doc)
  }).catch(e => {
    res.status(400).send(e)
  })
})

app.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    res.send({ todos })
  }).catch(e => res.status(400).send(e))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  
  if(!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  Todo.findById(id).then(todo => {
    if (!todo) {
      return res.status(404).send
    }

    res.send({ todo })
  }).catch(e => res.status(400).send())
})

app.listen(3000, () => console.log('Server has started'))

module.exports = { app }