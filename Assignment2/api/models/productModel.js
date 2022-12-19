var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productModel: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availableQuantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);