var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

var models = require('./api/models/model')
var routes = require('./api/routes/routes')

app.get("/rest/v1",function(req,res){
    res.send("CART API");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://admin:<PASSWORD>@cluster0.4odje.mongodb.net/esa_assignment?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true}).then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.log("ERROR:",err.message);
});

routes(app)

app.listen(port, function(){
    console.log('Server started on port :' + port)
})