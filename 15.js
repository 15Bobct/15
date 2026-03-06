import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/api/chat", async (req, res) => {

    const prompt = req.body.prompt;

    const ai = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + process.env.AI_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama3-70b-8192",
            messages: [{ role: "user", content: prompt }]
        })
    });

    const data = await ai.json();

    res.json({
        reply: data.choices[0].message.content
    });

});

app.listen(3000, () => console.log("Server running"));  
