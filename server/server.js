import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import axios from "axios";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

  res.send("FitAI Backend Running 🚀");

});

app.post("/chat", async (req, res) => {

  try {

    const { message } = req.body;

    const response =
      await axios.post(

        "https://api.groq.com/openai/v1/chat/completions",

        {
          model: "llama3-70b-8192",

          messages: [

            {
              role: "user",
              content: message,
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

    res.json({

      reply:
        response.data
          .choices[0]
          .message.content,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error:
        "AI Error ❌",

    });

  }

});

app.listen(5000, () => {

  console.log(
    "Server running on port 5000 🚀"
  );

});