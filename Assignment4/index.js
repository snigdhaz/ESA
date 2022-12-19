var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

var models = require('./api/models/message')
var routes = require('./api/routes/routes')

app.get("/",function(req,res){
    res.send("SMS API");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://dyingiant:<PASSWORD>@cluster0.tnjhy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true}).then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.log("ERROR:",err.message);
});

routes(app)

app.listen(port, function(){
    console.log('Server started on port :' + port)
})
