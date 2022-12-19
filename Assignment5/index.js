const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// IMPORT MODELS
require('./models/Contact');

const app = express();
var string1

// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/node-react-starter`);
// if (process.env.NODE_ENV === 'development') {
var fs = require('fs');

try{
  var contents = fs.readFileSync('info.txt', 'utf8');
  string1=contents
}
catch{
  console.log("could not read from the file");
}
  

// }

// console.log(contents)

// add your database string here


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
// app.use(cookieParser());
// app.use(session({
//   key: 'user_sid',
//   secret: 'somerandonstuffs',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//       expires: 600000
//   }
// }));
//IMPORT ROUTES
require('./routes/contactRoute')(app);


if (process.env.NODE_ENV === 'production') {

  string1=process.env.MONGO_STRING
  app.use(express.static('FrontEnd/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'FrontEnd', 'build', 'index.html'))
  })

}

mongoose.connect(string1,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex: true,useFindAndModify:false},function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to database`);
  }
}); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});