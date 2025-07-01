const Post = require('../models/Post');
const slugify = require('slugify');

// Create new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, meta, media } = req.body;

    // Basic validation
    if (!title || !content) {
      return res.status(400).json({ 
        error: 'Title and content are required' 
      });
    }

    // Auto-generate slug
    const slug = slugify(title, { lower: true, strict: true });

    const newPost = new Post({
      title,
      slug,
      meta: {
        title: meta?.title || title,
        description: meta?.description || content.slice(0, 150),
        ogTitle: meta?.ogTitle || title,
        ogDescription: meta?.ogDescription || content.slice(0, 150),
        ogImage: meta?.ogImage || ''
      },
      media: {
        images: media?.images || [],
        videos: media?.videos || [],
        tweets: media?.tweets || []
      },
      content
    });

    const savedPost = await newPost.save();
    res.status(201).json({ post: savedPost });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    if (!posts.length) {
      return res.status(404).json({ 
        message: 'No posts found' 
      });
    }
    res.status(200).json({ 
        posts
     });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
        error: 'Failed to fetch posts' 
    });
  }
};

// Get post by slug
exports.getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({
      slug: req.params.slug
    });
    if (!post) {
        return res.status(404).json({
            error: 'Post not found'
        });
    }
    res.status(200).json({
        post
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
        error: 'Server error'
    });
  }
};

