'use strict';


const mongoose = require('mongoose');
const {Schema} = mongoose;

const contactSchema = new Schema({
    username: {
        type: String,
        required: 'Kindly enter the username'
      },
    password:{
        type: String,
        required: 'Kindly enter the password'
      },
    contacts:[{
      name:String,
      number:String,
    }]
})

mongoose.model('contacts', contactSchema);