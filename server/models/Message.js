// models/Message.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MessageSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    message: String
});


module.exports = mongoose.model('Message', MessageSchema);
