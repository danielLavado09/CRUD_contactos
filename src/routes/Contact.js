'use strict'

var express = require('express');
var Contact = require('../controllers/Contact');
var router = express.Router();

router.post('/save', Contact.save);

router.get('/contacts', Contact.getContacts);

router.delete('/delete/:id', Contact.delete);

router.put('/update/:id', Contact.update);

module.exports = router;