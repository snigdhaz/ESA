var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartItemSchema = new Schema({
    productId: String,
    productName: String,
    quantity: Number,
    amount: Number
});

module.exports = mongoose.model('CartItem', cartItemSchema);