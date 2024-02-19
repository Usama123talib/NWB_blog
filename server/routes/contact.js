// app.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/api/messages', async (req, res) => {
    try {
        const { firstName, lastName, email, message } = req.body;
        const newMessage = await Message.create({ firstName, lastName, email, message });

        // res.status(201).json({message: 'User Created', newMessage})
        // await newMessage.save();
        // res.status(201).json({ message: 'Message saved successfully' });
        res.render('contact', newMessage);

    } catch (err) {
        res.status(500).json({ error: 'Failed to save message' });
    }
});

module.exports = router;
