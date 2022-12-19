var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
            },
            amount: {
                type: Number,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Cart', cartSchema);