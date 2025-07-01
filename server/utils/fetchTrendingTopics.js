const axios = require('axios');

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

async function fetchTrendingTopics() {
  try {
    console.log("Fetching trending topics from GNews...");
    const response = await axios.get(
      `https://gnews.io/api/v4/top-headlines?lang=en&max=15&token=${GNEWS_API_KEY}`
    );

    const topics = response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.image,
    }));

    return topics;
  } catch (err) {
    console.error("Error fetching GNews topics:", err);
    return [];
  }
}

module.exports = fetchTrendingTopics;
