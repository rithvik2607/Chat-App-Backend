const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chatId: mongoose.Schema.Types.ObjectId,
    name: {
        type: String
    },
    createdAt: {
        timestamp: true
    },
    memberOneId: {
        type: String
    },
    memberTwoId: {
        type: String
    }
});

module.exports = mongoose.model('Chat', chatSchema);