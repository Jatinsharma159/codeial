const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controllers');

router.get('/',homeController.home);

console.log("Router loaded");

module.exports = router;