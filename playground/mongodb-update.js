const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server.')
  }
  console.log('Connected to MongoDB server')

  // db.collection('Todos').findOneAndUpdate({ 
  //   _id: new ObjectID('5bf16690f9c1c549d71e6b0a') 
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result)
  // })

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5bf0ffffb58fb222f8d0866f')
  }, {
    $set: {
      name: 'Sohel'
    },
    $inc: {
      age: 3
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result)
  })

  // db.close()
})