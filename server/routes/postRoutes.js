const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPostBySlug } = require('../controllers/postController');

router.post('/posts', createPost);
router.get('/posts', getPosts);
router.get('/posts/:slug', getPostBySlug);


module.exports = router;
