import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import '../../styles/PostDetail.css';

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/posts/${slug}`);
        setPost(res.data.post);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();

  }, [slug]);

  if (!post) return <div className="postDetail-loading">Loading...</div>;

  return (
    <>
      <div className="postDetail-wrapper">
        <Helmet>
          <title>{post.meta?.title || post.title}</title>
          <meta name="description" content={post.meta?.description} />
          <meta property="og:title" content={post.meta?.ogTitle || post.title} />
          <meta property="og:description" content={post.meta?.ogDescription || post.meta?.description} />
          <meta property="og:image" content={post.meta?.ogImage} />
        </Helmet>

        <div className="postDetail-header">
          <h1 className="postDetail-title">{post.title}</h1>
          <p className="postDetail-date">
            {new Date(post.createdAt).toLocaleString()} {post.author ? ` • by ${post.author}` : ''}
          </p>
        </div>

        {post.media?.images?.[0] && (
          <div className="postDetail-media">
            <img src={post.media.images[0]} alt="Blog" className="postDetail-image" />
          </div>
        )}

        <div
          className="postDetail-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      
    </>
  );
};

export default PostDetail;
