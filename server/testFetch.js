require('dotenv').config();
const fetchTrendingTopics = require('./utils/fetchTrendingTopics');

fetchTrendingTopics()
  .then(topics => {
    console.log("Fetched topics:", topics);
  })
  .catch(err => {
    console.error("Test fetch error:", err);
  });
