'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    relationship: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Contact', ContactSchema);