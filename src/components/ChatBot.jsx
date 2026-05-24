import { useState, useEffect } from "react";

import axios from "axios";

import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import {
  db,
} from "../firebase";

export default function ChatBot() {

  const [message, setMessage] =
    useState("");

  const [chat, setChat] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // LOAD CHAT HISTORY

  useEffect(() => {

    loadChats();

  }, []);

  const loadChats = async () => {

    try {

      const q = query(

        collection(
          db,
          "chats"
        ),

        orderBy(
          "createdAt",
          "asc"
        )

      );

      const querySnapshot =
        await getDocs(q);

      let loadedChats = [];

      querySnapshot.forEach(
        (doc) => {

          const data =
            doc.data();

          loadedChats.push({

            role: "user",

            text:
              data.userMessage,

          });

          loadedChats.push({

            role: "bot",

            text:
              data.aiReply,

          });

        }
      );

      setChat(
        loadedChats
      );

    } catch (error) {

      console.log(error);

    }

  };

  const sendMessage = async () => {

    if (!message || loading)
      return;

    const currentMessage =
      message;

    setMessage("");

    setLoading(true);

    const userMessage = {

      role: "user",

      text: currentMessage,

    };

    setChat((prev) => [

      ...prev,

      userMessage,

    ]);

    try {

      const response =
        await axios.post(

          "http://localhost:5000/chat",

          {
            message:
              currentMessage,
          }

        );

      const botMessage = {

        role: "bot",

        text:
          response.data.reply,

      };

      setChat((prev) => [

        ...prev,

        botMessage,

      ]);

      // SAVE TO FIREBASE

      await addDoc(

        collection(
          db,
          "chats"
        ),

        {

          userMessage:
            currentMessage,

          aiReply:
            response.data.reply,

          createdAt:
            new Date(),

        }

      );

    } catch (error) {

      console.log(error);

      setChat((prev) => [

        ...prev,

        {

          role: "bot",

          text:
            "Backend Error ❌",

        },

      ]);

    }

    setLoading(false);

  };

  return (

    <div className="bg-zinc-900 p-5 rounded-2xl">

      <h2 className="text-3xl font-bold mb-5">
        AI Health Chatbot 🤖
      </h2>

      {/* CHAT AREA */}

      <div className="h-[500px] overflow-y-auto bg-black rounded-xl p-4 mb-5">

        {chat.map(
          (msg, index) => (

            <div
              key={index}
              className={`mb-4 flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`p-3 rounded-2xl max-w-[80%] whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-purple-600"
                    : "bg-zinc-800"
                }`}
              >

                {msg.text}

              </div>

            </div>

          )
        )}

        {loading && (

          <p className="opacity-70">
            AI Thinking...
          </p>

        )}

      </div>

      {/* INPUT */}

      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Ask health questions..."
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          className="flex-1 p-3 rounded-xl bg-black text-white border border-zinc-700"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-purple-600 px-6 rounded-xl font-bold disabled:opacity-50"
        >

          Send

        </button>

      </div>

    </div>

  );

}