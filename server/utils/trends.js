
const axios = require('axios');

async function getTrendingTopics() {
  try {
    const res = await axios.get('https://gnews.io/api/v4/top-headlines', {
      params: {
        token: process.env.GNEWS_API_KEY,
        lang: 'en',
        country: 'us',
        max: 10
      }
    });

    const topics = res.data.articles.map((article) => ({
      title: article.title,
      articles: [article.description || 'No description']
    }));

    return topics;
  } catch (err) {
    console.error('GNews Fetch Error:', err.message);
    return [];
  }
}

module.exports = getTrendingTopics;
