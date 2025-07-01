import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PostDetail from '../components/PostDetail';
import CommentSection from '../components/CommentSection';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API = import.meta.env.VITE_API_BASE_URL;

const IndividualPost = () => {
    const { slug } = useParams();
  const [postId, setPostId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API}/api/users/me`, {
        withCredentials: true, 
      });
      setUser(res.data); 
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null); 
    }
  };
  fetchUser();
}, []);

useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API}/api/posts/${slug}`);
        setPostId(res.data.post._id); 
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();

  }, [slug]);

  return (
    <div>
      <Navbar />
      <PostDetail  />
      {user && <CommentSection postId={postId} user={user} />}
    </div>
  );
};

export default IndividualPost;
