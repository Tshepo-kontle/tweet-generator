import axios from "axios";

export default async function handler(req, res) {
  const { category = "discipline" } = req.body;

  const prompt = `Write a short tweet about ${category}, punchy and under 280 characters.`;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "mixtral-8x7b",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const tweet = response.data.choices[0].message.content;
    res.status(200).json({ tweet });
  } catch (error) {
    console.error("Groq API error:", error.response?.data || error.message);
    res.status(500).json({ tweet: "Error generating tweet." });
  }
}
