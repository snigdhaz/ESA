
// import md5 from 'md5';
'use strict';
var mongoose = require('mongoose'),


Contact = mongoose.model('contacts');



exports.addContact = function (req, res, next){
  console.log("add new contact request")
  console.log(req.body)
  var contact = {"name": req.body.name, "number": req.body.number};
  Contact.findOneAndUpdate({username: req.params.username}, {$push: {contacts: contact}},function(err, user) {
  if (err)
    res.send(err);
  res.json(user);
  });
};

exports.deleteContact =function (req,res){
  console.log("delete contact request")
  var contact = {"name": req.body.name, "number": req.body.number};
  Contact.findOneAndUpdate({username: req.params.username}, {$pull: {contacts: contact}},function(err, user) {
  if (err)
    res.send(err);
  res.json(user);
  });

}

exports.update_contact=function(req,res){
 console.log("update request")
 
};



exports.list_all_users = function(req, res) {
  Contact.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};




exports.create_a_user = function(req, res) {
  var new_user = new Contact(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.read_a_user = function(req, res) {
  Contact.find({username:req.params.username,password:req.params.password}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.list_a_user = function(req, res) {
  Contact.find({username:req.params.username}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.update_a_user = function(req, res) {
  Contact.findOneAndUpdate({productId: req.params.username}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.delete_a_user = function(req, res) {


  Contact.remove({
    username: req.params.username
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'Contact successfully deleted' });
  });
};


