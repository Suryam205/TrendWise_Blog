import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/GetPost.css';

const GetPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAndGeneratePosts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/posts');
      const postsData = res.data.posts || [];

      if (postsData.length === 0) {
        await axios.post('http://localhost:4000/api/generate-blog');
        const res2 = await axios.get('http://localhost:4000/api/posts');
        setPosts(res2.data.posts || []);
      } else {
        setPosts(postsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (error) {
      console.error('Failed to generate or fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchAndGeneratePosts();
    const interval = setInterval(fetchAndGeneratePosts, );//5 * 60 * 1000
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="loading-message">📰 Loading trending blogs...</div>;
  }

  return (
    <div className="get-post-container">
      <div className="post-grid">
        {posts.length === 0 ? (
          <p className="no-posts">No posts available.</p>
        ) : (
          posts.map((post) => (
            <div className="post-card" key={post._id}>
            <img
              src={
                post?.media?.images?.[0] ||
                post?.meta?.ogImage ||
                'https://placehold.co/600x400?text=No+Image'
              }
              alt="Post thumbnail"
              onError={(e) => {
                e.target.src = 'https://placehold.co/600x400?text=No+Image';
              }}
              className="post-image"
          />


              <div className="post-content">
                <h2 className="post-title">
                  <Link to={`/posts/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="post-meta">
                  {post.author || 'TrendWise AI'} • {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="post-description">
                  {post.meta?.description ||
                    (post.content?.length > 100
                      ? post.content.slice(0, 100) + '...'
                      : post.content)}
                </p>
                <Link to={`/posts/${post.slug}`} className="read-more">
                  Read more →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GetPost;
