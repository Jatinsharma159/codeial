const express = require('express');
const passport = require('passport');

const router = express.Router();
const homeController = require('../controllers/home_controllers');

router.get('/',homeController.home);   // Controller calls an action which is essentailly a function
router.post('/post',passport.checkAuthentication,homeController.post);
router.use('/users',require('./user'))

// For any further routes, access from here
// router.use('/routerName',require('./routerFile'))

console.log("Router loaded");

module.exports = router;