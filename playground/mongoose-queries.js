const { ObjectID } = require('mongodb'),
      { mongoose } = require('./db/mongoose'),
      { Todo }     = require('./models/todo')


// Todo.create({
//   text: 'Test todo 2'
// }).then((doc) => {
//   console.log('Saved cat: ', JSON.stringify(doc, undefined, 2));
// }).catch((e) => {
//   console.log('Unable to save in DB', e);
// });

const id = '5bf3b1ea32c7f4121899dddb'

if (!ObjectID.isValid(id)) {
  console.log('Id not valid')
}

// =============================================
//    MONGOOSE QUERIES
// =============================================

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos: ', JSON.stringify(todos, undefined, 2))
// })

// Todo.findOne({
//   completed: false
// }).then((todo) => {
//   console.log('Todo: ', JSON.stringify(todo, undefined, 2))
// })

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found')
  }

  console.log('Todo By Id: ', JSON.stringify(todo, undefined, 2))
}).catch(e => console.log(e))