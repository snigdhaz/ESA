var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user_id: String,
    username: String 
})

var productSchema = new Schema({
    productId: String,
    category: String,
    productName: String,
    productModel: String,
    price: Number,
    availableQuantity: Number
})

var cartSchema = new Schema({
    user_id: String,
    productId: String,
    productName: String,
    amount: Number,
    quantity: Number
})

module.exports = mongoose.model('User', userSchema)
module.exports = mongoose.model('Product', productSchema)
module.exports = mongoose.model('Cart', cartSchema)