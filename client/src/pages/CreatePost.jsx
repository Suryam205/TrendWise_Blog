import { useState } from 'react';
import axios from 'axios';
import '../../styles/CreatePost.css'; 
import Navbar from '../components/Navbar';
const API = import.meta.env.VITE_API_BASE_URL;


const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState('');
  const [videos, setVideos] = useState('');
  const [tweets, setTweets] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/posts`, {
        title,
        content,
        author,
        meta: {
          description: content.slice(0, 150),
          ogImage: images.split(',')[0] || ''
        },
        media: {
          images: images.split(',').map((img) => img.trim()),
          videos: videos.split(',').map((vid) => vid.trim()),
          tweets: tweets.split(',').map((tweet) => tweet.trim())
        }
      });

      if (res && res.status === 201) {
        console.log('Post created:', res.data);
        alert('Post created successfully!');
        setTitle('');
        setAuthor('');
        setContent('');
        setImages('');
        setVideos('');
        setTweets('');
      } else {
        console.warn('Unexpected response:', res);
        alert('Failed to create post');
      }

    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="create-post-container">
      <h2 className="create-post-title">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="create-post-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URLs (comma separated)"
          value={images}
          onChange={(e) => setImages(e.target.value)}
        />
        <input
          type="text"
          placeholder="Video URLs (comma separated)"
          value={videos}
          onChange={(e) => setVideos(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tweet URLs (comma separated)"
          value={tweets}
          onChange={(e) => setTweets(e.target.value)}
        />
        <button type="submit">Publish</button>
      </form>
    </div>
    </>
  );
};

export default CreatePost;
