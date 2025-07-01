import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/GetPost.css';
const API = import.meta.env.VITE_API_BASE_URL;


const GetPost = () => {
  const [posts, setPosts] = useState([]);

  const fetchAndGeneratePosts = async () => {
    try {
      const res = await axios.get(`${API}/api/posts`);
      const postsData = res.data.posts || [];

      if (postsData.length === 0) {
        await axios.post(`${API}/api/generate-blog`);
        const res2 = await axios.get(`${API}/api/posts`);
        setPosts(res2.data.posts || []);
      } else {
        setPosts(postsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (error) {
      console.error('Failed to generate or fetch posts:', error);
    } 
  };
 
  useEffect(() => {
    fetchAndGeneratePosts();
    const interval = setInterval(fetchAndGeneratePosts,7* 60 * 1000 );
    return () => clearInterval(interval);
  }, []);

 

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
