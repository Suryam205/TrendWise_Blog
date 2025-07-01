import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GenerateBlogs = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setStatus('Generating blog posts...');

      const res = await axios.post('http://localhost:4000/api/generate-blog');

      if (res.status === 201 && res.data.posts?.length) {
        setStatus(`${res.data.posts.length} new blog post(s) generated`);
      } else {
        setStatus(res.data.message || 'No new trending topics to post');
      }
    } catch (error) {
      console.error(error);
      setStatus(' Failed to generate posts');
    } finally {
      setLoading(false);
    }
  };

  // Optional: auto-trigger once on mount
  useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 text-center">
      {loading ? (
        <p className="text-lg text-gray-500 animate-pulse">📰 Generating trending blogs...</p>
      ) : status ? (
        <p className="text-md text-green-700">{status}</p>
      ) : null}
    </div>
  );
};

export default GenerateBlogs;
