var mongoose = require('mongoose');

User = mongoose.model('User');
Product = mongoose.model('Product');
Cart = mongoose.model('Cart');

// GET ../users
exports.get_users = function(req, res){
    User.find({}, function(err, user){
        if(err){
            res.send(err)
        }
        res.json(user);
        console.log(user);
    });
};

// GET ../users/user_id
exports.get_user = function(req,res){
    User.find({user_id:req.params.user_id},function(err,user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
};

// GET ../products
exports.get_products = function(req, res){
    Product.find({}, function(err, product){
        if(err){
            res.send(err);
        }
        res.json(product);
    });
};

// GET ../users/user_id/cart
exports.get_cart = function(req,res){
    Cart.find({user_id:req.params.user_id},function(err,cart){
        if(err){
            res.send(err);
        }
        res.json(cart);
    });
};

exports.put_to_cart = function(req,res){
    Cart.find({user_id: req.params.user_id})
    .exec((err, cart) => {
        console.log(cart)
        if(err){
            return res.status(400).json({err});
        }
        if(cart){
            // Cart.findOneAndUpdate({user_id: req.params.user_id}, {
            //     $push : {
            //         cartItems: req.body.cartItems
            //     }
            //     // { $push: { reviews: built_review }}, function(err, result){
            // },function(err, cart){
            //     console.log("Found");
            //     return res.status(201).json({cart});
            // });
            var array = {
                "productId": req.body.productId,
                "quantity": req.body.quantity,
                "amount": req.body.amount
            }
            Cart.findOneAndUpdate(
                {user_id: req.params.user_id},
                { $push: { cartItems: array}}, function(err, result){
        
                    if(err) console.log(err)
                    res.send(result);
            })
        }

        else{
            var cart = new Cart({
                user_id: req.params.user_id,
                cartItems: [req.body.cartItems]
            });
            cart.save((err,cart) => {
                if(err){
                    return res.status(400).json({err});
                }
                if(cart){
                    return res.status(201).json({cart});
                }
            })
        }
    })
};


  