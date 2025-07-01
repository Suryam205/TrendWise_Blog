const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  meta: {
    title: String,
    description: String,
    ogTitle: String,
    ogDescription: String,
    ogImage: String,
  },
  media: {
    images: [String],      
    tweets: [String],     
    videos: [String],      
  },
  content: {
    type: String,
    required: true,
  },
  author: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Post = mongoose.model('Post', postSchema);
module.exports = Post;
