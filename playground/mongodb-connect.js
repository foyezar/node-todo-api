// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server.')
  }
  console.log('Connected to MongoDB server')

  // db.collection('Users').insertOne({
  //   name: 'Foyez',
  //   age: 26,
  //   location: 'Cumilla'
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to insert users', err)
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2))
  // console.log(result.ops[0]._id.getTimestamp())
  // })

  db.close()
})