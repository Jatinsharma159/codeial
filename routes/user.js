const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controllers');

router.get('/profile',userController.profile);

router.get('/sign-up',userController.signUp);

router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);

router.post('/create-session',passport.authenticate(
    'local',  // Strategy used
    {failureRedirect: '/users/sign-in'},
),userController.createSession)

module.exports = router;