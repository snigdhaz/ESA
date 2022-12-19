var mongoose = require('mongoose')
var cache = require('memory-cache')
var jwt = require('jsonwebtoken')

var rateLimit = require("express-rate-limit")

exports.authentication = function(req,res){
    //Mock user
    var user = {
        id: 01,
        username: 'test_user'
    }

    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });
}

exports.createLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, //1 hour
    max: 50, // limit 50
    message: "Limit Reached"
})

exports.verifyToken = function(req,res,next){
    //Get auth header
    var bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader != 'undefined'){
        
        var bearer = bearerHeader.split(' ');
        var bearerToken = bearer[1];
        
        req.token = bearerToken;
        
        next();
    } else {
        res.sendStatus(403);
    }
}

Message = mongoose.model('Message');

let cacheKeys = new Map();

exports.inbound = function(req,res){
    
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        
        if(err){
            res.sendStatus(403);
        } else {

            let  { from , to , text  } = req.body

            if(from){
                if (from.toString().length < 6 || from.toString().length > 16) {
                    res.status(400).json({
                        "message": "",
                        "error": "parameter 'from' is invalid"
                    })
                    return
                }
            } else {
                res.status(400).json({
                    "message": "",
                    "error": "parameter 'from' is missing"
                })
                return

            }

            if (to) {
                if (to.toString().length < 6 || to.toString().length > 16) {
                    res.status(400).json({
                        "message": "",
                        "error": "parameter 'to' is invalid"
                    })
                    return ;
                }
            } else {
                res.status(400).json({
                    "message": "",
                    "error": "parameter 'to' is missing"
                })
                return ;
            } 

            if (text) {
                if (text.length < 1 || text.length > 120) {
                    res.status(400).json({
                        "message": "",
                        "error": "parameter 'text' is invalid"
                    })
                    return
                }
            } else {
                res.status(400).json({
                    "message": "",
                    "error": "parameter 'text' is missing"
                })
                return ;
            }

            if (text.includes("STOP") || text.includes("STOP\n") || text.includes("STOP\r") || text.includes("STOP\r\n")) {
                cache.put(from, to, 1.44e+7) 
                cacheKeys[from] = to

                console.log(cacheKeys)

                return;
            }

            var message = Message({
                from : from,
                to : to,
                text : text.toString()
            })

            message.save((inboundError) => {
                if (inboundError) {
                    res.status(500).json({
                        "message": "",
                        "error": "unknown failure"
                    });
                    console.log(inboundError)
                } else {
                    res.status(201).json({
                        "message": "inbound sms is ok",
                        "error": "",
                        authData
                    });
                }
            });   
        }
    })

}

exports.outbound = function(req,res){

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        
        if(err){
            res.sendStatus(403);
        } else {

            let  { from , to , text  } = req.body

            if(from){
                if (from.toString().length < 6 || from.toString().length > 16) {
                    res.status(400).json({
                        "message": "",
                        "error": "parameter 'from' is invalid"
                    })
                    return
                }
            } else {
                res.status(400).json({
                    "message": "",
                    "error": "parameter 'from' is missing"
                })
                return
        
            }
        
            if (to) {
                if (to.toString().length < 6 || to.toString().length > 16) {
                    res.status(400).json({
                        "message": "",
                        "error": "parameter 'to' is invalid"
                    })
                    return ;
                }
            } else {
                res.status(400).json({
                    "message": "",
                    "error": "parameter 'to' is missing"
                })
                return ;
            } 
        
            if (text) {
                if (text.length < 1 || text.length > 120) {
                    res.status(400).json({
                        "message": "",
                        "error": "parameter 'text' is invalid"
                    })
                    return
                }
            } else {
                res.status(400).json({
                    "message": "",
                    "error": "parameter 'text' is missing"
                })
                return ;
            }
        
            if (cacheKeys[from] == to) {
                res.status(406).json({
                    "message": "",
                    "error": "sms from " + from + " to " + to + " is blocked by STOP request"
                })
                return
            } 
            var message = Message({
                from : from,
                to : to,
                text : text.toString()
            })
        
            message.save((outboundError) => {
                if (outboundError) {
                    res.status(500).json({
                        "message": "",
                        "error": "unknown failure"
                    });
                    console.log(outboundError)
                } else {
                    res.status(201).json({
                        "message": "outbound sms is ok",
                        "error": "",
                        authData
                    });
                }
            });
        }
    });
}
