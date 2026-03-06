import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

app.use(express.json());
app.use(express.static("public"));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

app.post("/api/chat", async (req, res) => {

  const prompt = req.body.prompt;

  try {

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);

    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
