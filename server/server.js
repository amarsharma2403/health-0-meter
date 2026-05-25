import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "https://health-0-meter.netlify.app",
    "http://localhost:5173"
  ]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Health-O-Meter Backend Running 🚀");
});

app.post("/chat", async (req, res) => {

  try {

    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({
        reply: "Message is required",
      });
    }

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",

        messages: [
          {
            role: "system",
            content:
              "You are a helpful AI health assistant.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      },

      {
        headers: {
          Authorization:
            `Bearer ${process.env.GROQ_API_KEY}`,

          "Content-Type":
            "application/json",
        },
      }
    );

    const aiReply =
      response.data.choices[0].message.content;

    res.json({
      reply: aiReply,
    });

  } catch (error) {

    console.log(
      "FULL ERROR:",
      error.response?.data || error.message
    );

    res.status(500).json({
      reply: "Backend Error ❌",
    });

  }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} 🚀`
  );
});