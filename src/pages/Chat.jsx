import { useState, useEffect } from "react";
import axios from "axios";

export default function Chat() {

  const [messages, setMessages] = useState(() => {
    const saved =
      localStorage.getItem("health-chat");

    return saved
      ? JSON.parse(saved)
      : [];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {

    localStorage.setItem(
      "health-chat",
      JSON.stringify(messages)
    );

  }, [messages]);

  const sendMessage = async (
    customMessage = null
  ) => {

    const finalMessage =
      customMessage || input;

    if (!finalMessage.trim()) return;

    const userMessage = {
      sender: "user",
      text: finalMessage,
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
          message: finalMessage,
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

    <div
      className={`min-h-screen p-4 transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-6 gap-3">

          <h1 className="text-3xl md:text-5xl font-bold">
            Health-O-Meter
          </h1>

          <div className="flex gap-2">

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="bg-gray-800 text-white px-4 py-2 rounded-xl"
            >
              {darkMode
                ? "Light"
                : "Dark"}
            </button>

            <button
              onClick={clearChat}
              className="bg-red-500 text-white px-4 py-2 rounded-xl"
            >
              Clear Chat
            </button>

          </div>

        </div>

        {/* CATEGORIES */}

        <div className="flex flex-wrap gap-3 mb-5">

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
                "What is BMI and how to calculate it?"
              )
            }
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
          >
            BMI
          </button>

        </div>

        {/* CHAT BOX */}

        <div
          className={`rounded-3xl p-4 shadow-xl overflow-y-auto h-[350px] md:h-[450px] ${
            darkMode
              ? "bg-gray-800"
              : "bg-white"
          }`}
        >

          {messages.length === 0 && (

            <div className="h-full flex flex-col items-center justify-center text-center">

              <div className="text-6xl mb-4">
                🩺
              </div>

              <h2 className="text-2xl font-bold text-gray-400 mb-2">
                AI Health Assistant
              </h2>

              <p className="text-gray-400">
                Ask health and wellness questions.
              </p>

            </div>

          )}

          {messages.map(
            (msg, index) => (

              <div
                key={index}
                className={`mb-4 flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-purple-600 text-white"
                      : darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>

              </div>

            )
          )}

          {loading && (

            <div className="flex justify-start">

              <div
                className={`px-4 py-3 rounded-2xl ${
                  darkMode
                    ? "bg-gray-700"
                    : "bg-gray-200"
                }`}
              >
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
            className={`flex-1 p-4 rounded-2xl outline-none ${
              darkMode
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            }`}
          />

          <button
            onClick={() =>
              sendMessage()
            }
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-2xl"
          >
            Send
          </button>

        </div>

        {/* DISCLAIMER */}

        <div className="text-center mt-6 text-sm text-gray-400">

          This AI assistant provides general health information only.
          <br />
          It is not a substitute for professional medical advice.

        </div>

      </div>

    </div>

  );

}