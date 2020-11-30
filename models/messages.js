const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
    },
    sentById: {
        type: String
    },
    recievedById: {
        type: String
    },
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);