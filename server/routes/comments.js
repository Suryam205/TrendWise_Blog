const express = require('express');
const Comment = require('../models/comment');
const Post = require('../models/Post');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // JWT middleware


router.post('/:postId', authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    const { postId } = req.params;

    const comment = new Comment({
      postId,
      userId: req.user.id,
      name: req.user.name,
      message,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post comment' });
  }
});

// Fetch comments for a post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// DELETE 
router.delete('/:commentId', authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    console.log('Comment:', comment);
    console.log('User ID:', req.user.id);
    console.log('Comment User ID:', comment.userId.toString());
    if (!comment.userId.equals(req.user.id))
      return res.status(403).json({ error: 'Unauthorized' });

    await comment.deleteOne();
    console.log('Comment deleted:', comment);
    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
