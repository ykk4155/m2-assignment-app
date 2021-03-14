const path = require('path');
const auth = require('http-auth');
const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
});
const express = require('express');
const mongoose = require('mongoose');
const { check,validationResult } = require('express-validator');
const registration = require('../models/registration');
const router = express.Router();
const Registration = mongoose.model('Registration');
router.get('/', function(req, res){
    res.render('form', {title: 'Registration form'});
});
router.get('/registrations', basic.check((req, res) => {
    RegistrationModel.find()
        .then((registrations) => {
            res.render('index', { title: 'Listing registrations', registrations })
        })
        .catch(() => { res.send('sorry! something went wrong');})
}));
router.post('/', [
    check('name')
        .isLength({ min: 1 })
        .withMessage('Please enter a name'),
    check('email')
        .isLength({ min: 1 })
    .withMessage('Please enter an emaill'),
],
    function (req, res) {
        //  console.log(req.body);
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const registration = new Registration(req.body);
            registration.save()
                .then(() => {
                    res.send('thank you for your registration');
                })
                .catch((err) => {
                    console.log(err);
                    res.send('Sorry! something went wrong');
                });
        }
            else {
            res.render('form', {
                title: 'registration form',
                errors: errors.array(),
                data: req.body,
            });
        }
    }
);
module.exports = router;
