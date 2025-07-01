// testOpenAI.js — MOCK version (no real API needed)

async function testOpenAI() {
  try {
    // Simulate what a successful response would look like
    const chat = {
      choices: [
        {
          message: {
            content: "Hello! Your API simulation is working perfectly.",
          },
        },
      ],
    };

    console.log("Mock OpenAI Response:\n", chat.choices[0].message.content);
  } catch (err) {
    console.error("Mock Error:", err.message || err);
  }
}

testOpenAI();
