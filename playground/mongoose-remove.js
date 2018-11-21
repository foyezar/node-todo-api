const { ObjectID } = require('mongodb'),
      { mongoose } = require('./db/mongoose'),
      { Todo }     = require('./models/todo')

// Todo.deleteMany
// Todo.findOneAndDelete
// Todo.findByIdAndDelete

Todo.findByIdAndDelete('8764so75392').then((todo) => {
  console.log(todo)
})