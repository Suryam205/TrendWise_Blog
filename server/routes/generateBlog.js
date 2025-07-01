const express = require('express');
const router = express.Router();
const fetchTrendingTopics = require('../utils/fetchTrendingTopics');
const generateBlogPost = require('../utils/generateBlogPost');
const Post = require('../models/Post');

router.post('/', async (req, res) => {
  try {
  

    const topics = await fetchTrendingTopics();
    if (!topics.length) return res.status(404).json({ error: 'No topics found' });

    const newPosts = [];

    for (const topic of topics) {
      const slug = topic.title.toLowerCase().replace(/\s+/g, '-');
      const existing = await Post.findOne({ slug });
      if (existing) {
        console.log(` Skipped: ${slug} (already exists)`);
        continue;
      }

      const blog = await generateBlogPost(topic.title);
      if (!blog) {
        console.log(`Skipped: ${topic.title} (blog generation failed)`);
        continue;
      }

      const newPost = new Post({
        title: blog.title,
        slug,
        meta: blog.meta,
        media: {
          images: [topic.image || 'https://placehold.co/600x400?text=TrendWise'],
          videos: [],
          tweets: []
        },
        content: blog.content,
      });

      const saved = await newPost.save();
      newPosts.push(saved);
      
    }

    if (newPosts.length) {
      return res.status(201).json({ message: 'New posts created', posts: newPosts });
    } else {
      return res.status(200).json({ message: 'No new trending topics to post' });
    }

  } catch (err) {
    console.error("Blog generation error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
