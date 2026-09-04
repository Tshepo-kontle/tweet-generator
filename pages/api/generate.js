import axios from "axios";

export default async function handler(req, res) {
  const { category = "discipline" } = req.body;

  // Prompt for Gemini
  const prompt = `Write a short tweet about ${category}, punchy and under 280 characters.`;

  try {
    // Call Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    // Extract tweet text
    const tweet = response.data.candidates[0].content.parts[0].text;

    res.status(200).json({ tweet });
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    res.status(500).json({ tweet: "Error generating tweet." });
  }
}
