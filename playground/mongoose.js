const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/cat_app", { useNewUrlParser: true });

// Merge
// const CatSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   temperament: String
// });

const Cat = mongoose.model('Cat', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 5
  },
  temperament: {
    type: String,
    default: null
  }
});

// adding a new cat to the DB

// const kitty = new Cat({
//   name: 'Mrs. Norris',
//   age: 7,
//   temperament: 'Evil'
// });

// kitty.save().then((err, cat) => {
//   if(err) {
//     console.log('Something went wrong');
//   } else {
//     console.log('Meow!!!');
//     console.log(cat);
//   }
// });

Cat.create({
  name: 'Snow White',
  age: 15,
  temperament: 'Bland'
}).then((doc) => {
  console.log('Saved cat: ', JSON.stringify(doc, undefined, 2));
}).catch((e) => {
  console.log('Unable to save in DB', e);
});

// retrieve all cats from the DB 

Cat.find({}, (err, cats) => {
  if(err) {
    console.log('ERROR!');
    console.log(err);
  } else {
    console.log('ALL THE CATS...');
    console.log(cats);
  }
});