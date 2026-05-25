import { useState, useEffect } from "react";
import axios from "axios";

export default function Chat() {

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("health-chat");
    return saved ? JSON.parse(saved) : [];
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

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
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
          message: input,
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
    localStorage.removeItem("health-chat");
  };

  const categories = [
    "Diet",
    "Exercise",
    "Sleep",
    "Stress",
    "BMI",
  ];

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      {/* HEADER */}
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">

          <h1 className="text-3xl md:text-5xl font-bold break-words">
            Health-O-Meter
          </h1>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="bg-gray-800 text-white px-5 py-3 rounded-2xl"
            >
              {darkMode ? "Light" : "Dark"}
            </button>

            <button
              onClick={clearChat}
              className="bg-red-500 text-white px-5 py-3 rounded-2xl"
            >
              Clear Chat
            </button>

          </div>

        </div>

        {/* HERO */}
        <div className="text-center mb-10">

          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-400">
            Welcome to Health-O-Meter
          </h2>

          <p className="text-xl text-gray-400">
            Ask anything about your health and wellness.
          </p>

        </div>

        {/* CATEGORIES */}
        <div className="flex flex-wrap gap-3 mb-8">

          {categories.map((item, index) => (

            <button
              key={index}
              onClick={() => setInput(item)}
              className="bg-blue-100 text-blue-700 px-5 py-3 rounded-full"
            >
              {item}
            </button>

          ))}

        </div>

        {/* CHAT BOX */}
        <div
          className={`rounded-3xl p-4 md:p-6 shadow-xl overflow-y-auto h-[400px] md:h-[500px] ${
            darkMode
              ? "bg-gray-800"
              : "bg-white"
          }`}
        >

          {messages.length === 0 && (

            <div className="h-full flex items-center justify-center text-center text-gray-400 text-lg">
              Start chatting with your AI health assistant 🚀
            </div>

          )}

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`mb-4 flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[85%] md:max-w-[70%] px-5 py-3 rounded-2xl text-sm md:text-base ${
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

          ))}

          {/* LOADING */}
          {loading && (

            <div className="flex justify-start">

              <div
                className={`px-5 py-3 rounded-2xl ${
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
        <div className="flex flex-col md:flex-row gap-4 mt-6">

          <input
            type="text"
            placeholder="Ask health questions..."
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            className={`flex-1 p-4 rounded-2xl outline-none text-lg ${
              darkMode
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            }`}
          />

          <button
            onClick={sendMessage}
            className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-4 rounded-2xl text-lg"
          >
            Send
          </button>

        </div>

        {/* DISCLAIMER */}
        <div className="text-center mt-8 text-sm text-gray-400">

          This AI assistant provides general health information only.
          <br />
          It is not a substitute for professional medical advice.

        </div>

      </div>

    </div>
  );
}