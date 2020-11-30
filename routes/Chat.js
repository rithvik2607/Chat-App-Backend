const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

const db = admin.firestore();

router.get('/chat/get', (req, res) => {
    activeChats = db.collection('chats').doc(req.body.chatId);
    res.json({

    })
});