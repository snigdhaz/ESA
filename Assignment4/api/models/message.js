var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const MessageSchema = new Schema({
    from: {
        type: Number,
        required: true,
    },
    to: {
        type: Number,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Message", MessageSchema);