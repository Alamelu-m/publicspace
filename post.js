const express = require('express');
const { getPosts, createPost } = require('../controllers/posts');
const { protect } = require('./middleware/auth');

const router = express.Router();

router.route('/')
    .get(getPosts)
    .post(protect, createPost);

module.exports = router;
