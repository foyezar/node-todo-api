require('./config/config')
const express      = require('express'),
      bodyParser   = require('body-parser')

const _            = require('lodash'),
      { ObjectID } = require('mongodb'),
      { mongoose } = require('./db/mongoose'),
      { Todo }     = require('./models/todo'),
      { User }     = require('./models/user'),
      { authenticate } = require('./midleware/authenticate')


const app = express()

const port = process.env.PORT

// middleware
app.use(bodyParser.json())

app.post('/todos', authenticate, (req, res) => {
  Todo.create({
    text: req.body.text,
    _creator: req.user._id
  }).then((doc) => {
    res.send(doc)
  }).catch(e => {
    res.status(400).send(e)
  })
})

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then(todos => {
    res.send({ todos })
  }).catch(e => res.status(400).send(e))
})

app.get('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id
  
  if(!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then(todo => {
    if (!todo) {
      return res.status(404).send()
    }

    res.send({ todo })
  }).catch(e => res.status(400).send())
})

app.delete('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id

  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  Todo.findOneAndDelete({
    _id: id,
    _creator: req.user._id
  }).then(todo => {
    if (!todo) {
      return res.status(404).send()
    }

    res.send({ todo })
  }).catch(e => res.status(400).send())
})

app.patch('/todos/:id', authenticate, (req, res) => {
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

  Todo.findOneAndUpdate({
    _id: id, 
    _creator: req.user._id
  }, { 
    $set: body 
  }, { 
    new: true 
  }).then(todo => {
    if (!todo) {
      return res.status(404).send()
    }

    res.send({ todo })
  }).catch(e => res.status(400).send())
})

app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password'])
  const user = new User(body)

  user.save()
    .then(() =>  user.generateAuthToken())
    .then(token => res.header('x-auth', token).send(user))
    .catch(e => res.status(400).send(e))
})

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
})

app.post('/users/login', (req, res) => {
  const body =  _.pick(req.body, ['email', 'password'])

  User.findByCredentials(body.email, body.password)
    .then(user => user.generateAuthToken().then(token => res.header('x-auth', token).send(user)))
    // .then(user => user.generateAuthToken())
    // .then(token => res.header('x-auth', token).send(user))
    .catch(e => res.status(400).send())
})

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token)
    .then(() => res.status(200).send())
    .catch(() => res.status(400).send())
})

app.listen(port, () => console.log(`Server has started on ${port}`))

module.exports = { app }