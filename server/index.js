require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./connectDB/mongoose'); // Ensure this path is correct
const postRoutes = require('./routes/postRoutes');
const trendRoutes = require('./routes/trends');
const generateBlogRoute = require('./routes/generateBlog');
const cron = require('node-cron');
const axios = require('axios');
const userRoutes = require('./routes/user');
const cookieParser = require('cookie-parser');
const commentRoutes = require('./routes/comments'); // Uncomment if you have comments route


const app = express();
const PORT = process.env.PORT || 4000;

//mongoose connection
connectDB();

app.use(cors({
  origin: 'https://trendwise-blog-server.onrender.com',
  credentials: true 
}));

app.use(cookieParser());
app.use(express.json());
 
app.get('/', (req, res) => {
  res.send('API is working!');
});

app.use('/api', postRoutes);
app.use('/api/trends', trendRoutes);
app.use('/api/generate-blog', generateBlogRoute);
app.use('/api/users', userRoutes);  
app.use('/api/comments' , commentRoutes)


cron.schedule('0 * * * *', async () => {
  try {
    console.log('Auto-generating blog post from trending topic...');

    // Call your generate-blog endpoint internally
    await axios.post('http://localhost:4000/api/generate-blog');

    console.log('Blog post generated successfully!');
  } catch (error) {
    console.error('Error auto-generating blog:', error.message);
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
