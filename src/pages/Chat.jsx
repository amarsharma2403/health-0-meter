import { useState, useEffect } from "react";
import axios from "axios";

export default function Chat() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("health-chat");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "health-chat",
      JSON.stringify(messages)
    );
  }, [messages]);

  const sendMessage = async (
    customMessage = ""
  ) => {
    const messageToSend =
      customMessage || input;

    if (!messageToSend.trim()) return;

    const userMessage = {
      sender: "user",
      text: messageToSend,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://health-0-meter-api.onrender.com/chat",
        {
          message: messageToSend,
        }
      );

      const botMessage = {
        sender: "bot",
        text: response.data.reply,
      };

      setMessages((prev) => [
        ...prev,
        botMessage,
      ]);
    } catch (error) {
      const errorMessage = {
        sender: "bot",
        text:
          "Unable to get response. Please try again later.",
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(
      "health-chat"
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-5xl font-bold">
            Health-O-Meter
          </h1>

          <button
            onClick={clearChat}
            className="bg-red-500 text-white px-4 py-2 rounded-xl"
          >
            Clear Chat
          </button>
        </div>

        {/* HERO */}

        {messages.length === 0 && (
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-400 mb-2">
              Welcome to Health-O-Meter
            </h2>

            <p className="text-gray-500">
              Ask anything about your health and wellness.
            </p>
          </div>
        )}

        {/* HEALTH CATEGORIES */}

        <div className="flex flex-wrap gap-3 mb-5 justify-center md:justify-start">

          <button
            onClick={() =>
              sendMessage(
                "Give me a healthy diet plan"
              )
            }
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
          >
            Diet
          </button>

          <button
            onClick={() =>
              sendMessage(
                "Suggest a daily exercise routine"
              )
            }
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
          >
            Exercise
          </button>

          <button
            onClick={() =>
              sendMessage(
                "How can I improve sleep?"
              )
            }
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
          >
            Sleep
          </button>

          <button
            onClick={() =>
              sendMessage(
                "How to reduce stress naturally?"
              )
            }
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
          >
            Stress
          </button>

          <button
            onClick={() =>
              sendMessage(
                "Explain BMI and how to calculate it"
              )
            }
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
          >
            BMI
          </button>
        </div>

        {/* CHAT BOX */}

        <div className="bg-white rounded-3xl shadow-lg p-4 h-[400px] overflow-y-auto">

          {messages.map(
            (msg, index) => (
              <div
                key={index}
                className={`flex mb-4 ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl break-words whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            )
          )}

          {/* LOADING */}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 px-4 py-3 rounded-2xl">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* INPUT */}

        <div className="flex gap-3 mt-5">
          <input
            type="text"
            placeholder="Ask health questions..."
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            className="flex-1 p-4 rounded-2xl outline-none border"
          />

          <button
            onClick={() => sendMessage()}
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-2xl"
          >
            Send
          </button>
        </div>

        {/* DISCLAIMER */}

        <div className="text-center text-sm text-gray-500 mt-6">
          This AI assistant provides general health information only.
          <br />
          It is not a substitute for professional medical advice.
        </div>
      </div>
    </div>
  );
}