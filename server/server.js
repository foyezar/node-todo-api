const express      = require('express'),
      bodyParser   = require('body-parser')

const _            = require('lodash'),
      { ObjectID } = require('mongodb'),
      { mongoose } = require('./db/mongoose'),
      { Todo }     = require('./models/todo'),
      { User }     = require('./models/user')


const app = express()

const port = process.env.PORT || 3000

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
      return res.status(404).send()
    }

    res.send({ todo })
  }).catch(e => res.status(400).send())
})

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id

  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  Todo.findByIdAndDelete(id).then(todo => {
    if (!todo) {
      return res.status(404).send()
    }

    res.send({ todo })
  }).catch(e => res.status(400).send())
})

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed'])

  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then(todo => {
    if (!todo) {
      return res.status(404).send()
    }

    res.send({ todo })
  }).catch(e => res.status(400).send())
})

app.listen(port, () => console.log(`Server has started on ${port}`))

module.exports = { app }