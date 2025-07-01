async function generateBlogPost(topic) {
  try {
    const metaDescription = `Explore the latest insights on "${topic}".`;
    const content = `
## Introduction
${topic} is in the news! Here's what you need to know.

## Why it's Trending
This topic is impacting the world of technology, business, or society.

## Conclusion
Stay tuned as ${topic} continues to evolve.
    `.trim();

    return {
      title: topic,
      meta: {
        description: metaDescription,
        ogImage: "https://placehold.co/600x400?text=TrendWise",
      },
      content,
    };
  } catch (err) {
    console.error("AI Generation Error:", err);
    return null;
  }
}

module.exports = generateBlogPost;
