import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/CommentSection.css';
const API = import.meta.env.VITE_API_BASE_URL;



const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API}/api/users/me`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        setUser(null);
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, []);

  // Fetch comments
  useEffect(() => {
    if (!postId) return;

    const fetchComments = async () => {
      try {
        const res = await axios.get(`${API}/api/comments/${postId}`);
        setComments(res.data);
      } catch (err) {
        console.error('Failed to fetch comments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  // Submit comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const res = await axios.post(
        `${API}/api/comments/${postId}`,
        { message },
        { withCredentials: true }
      );
      setComments([res.data, ...comments]);
      setMessage('');
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  // Delete comment
  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`${API}/api/comments/${commentId}`, {
        withCredentials: true,
      });
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  console.log('Comments:', comments);

  return (
    <div className="comment-section">
      <h3>Comments ({comments.length})</h3>

      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <div className="comment-list">
          {comments.map((c) => (
            <div key={c._id} className="comment">
              <p className="meta">
                <strong>{c.name}</strong> • {new Date(c.createdAt).toLocaleString()}
                {/* Show delete icon only if logged-in user is the comment author */}
                { user && c.userId === user._id && (
                  <span
                    className="delete-comment"
                    onClick={() => handleDelete(c._id)}
                    title="Delete Comment"
                  >
                    ❌
                  </span>
                )}
              </p>
              <p>{c.message}</p>
            </div>
          ))}
        </div>
      )}

      {user ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a comment..."
            rows="3"
            required
          />
          <button type="submit">Post Comment</button>
        </form>
      ) : (
        <p className="comment-login-msg">Please login to post a comment.</p>
      )}
    </div>
  );
};

export default CommentSection;
