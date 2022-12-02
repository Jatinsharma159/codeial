const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController = require('../controllers/post_controllers');
const Post = require('../model/post')

router.post('/create',postController.create)

module.exports = router;