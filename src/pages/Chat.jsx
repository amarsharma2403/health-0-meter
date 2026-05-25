import { useState, useEffect } from "react";
import axios from "axios";

export default function Chat() {

  const [input, setInput] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(false);

  const [messages, setMessages] =
    useState(() => {

      const saved =
        localStorage.getItem("health-chat");

      return saved
        ? JSON.parse(saved)
        : [];

    });

  useEffect(() => {

    localStorage.setItem(
      "health-chat",
      JSON.stringify(messages)
    );

  }, [messages]);

  const sendMessage = async () => {

    if (!input) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    try {

      const API_URL =
        import.meta.env.VITE_API_URL;

      const response = await axios.post(
        `${API_URL}/chat`,
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

      console.log(error);

      const errorMessage = {
        sender: "bot",
        text:
          "Unable to get response. Please try again later.",
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);

    }

    setLoading(false);

    setInput("");

  };

  return (

    <div
      className={
        darkMode
          ? "min-h-screen bg-black text-white p-4"
          : "min-h-screen bg-gray-100 text-black p-4"
      }
    >

      <div className="max-w-2xl mx-auto">

        {/* TOP BAR */}

        <div className="flex justify-between items-center mb-4">

          <h1 className="text-3xl font-bold">
            Health-O-Meter
          </h1>

          <div className="flex gap-2">

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="bg-gray-800 text-white px-4 py-2 rounded-lg"
            >
              {darkMode
                ? "Light"
                : "Dark"}
            </button>

            <button
              onClick={() =>
                setMessages([])
              }
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Clear Chat
            </button>

          </div>

        </div>

        {/* HERO */}

        {
          messages.length === 0 && (

            <div className="text-center text-gray-400 mt-10 mb-10">

              <h2 className="text-2xl font-bold mb-2">
                Welcome to Health-O-Meter
              </h2>

              <p>
                Ask anything about your health and wellness.
              </p>

            </div>

          )
        }

        {/* HEALTH CATEGORIES */}

        <div className="flex gap-2 flex-wrap mb-4">

          {
            [
              "Diet",
              "Exercise",
              "Sleep",
              "Stress",
              "BMI",
            ].map((item) => (

              <button
                key={item}
                onClick={() =>
                  setInput(item)
                }
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {item}
              </button>

            ))
          }

        </div>

        {/* CHAT BOX */}

        <div className="bg-white rounded-xl shadow-lg p-4 h-[500px] overflow-y-auto">

          {

            messages.map(
              (msg, index) => (

                <div
                  key={index}
                  className={
                    msg.sender === "user"
                      ? "text-right mb-3"
                      : "text-left mb-3"
                  }
                >

                  <div
                    className={
                      msg.sender === "user"
                        ? "inline-block bg-blue-500 text-white px-4 py-2 rounded-xl max-w-[80%] break-words"
                        : "inline-block bg-gray-200 text-black px-4 py-2 rounded-xl max-w-[80%] break-words"
                    }
                  >
                    {msg.text}
                  </div>

                </div>

              )
            )

          }

          {

            loading && (

              <div className="text-left text-gray-400 italic animate-pulse">

                Thinking...

              </div>

            )

          }

        </div>

        {/* INPUT AREA */}

        <div className="flex gap-2 mt-4">

          <input
            type="text"
            placeholder="Ask your health question..."
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            className="flex-1 border rounded-lg px-4 py-3 outline-none"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg"
          >
            Send
          </button>

        </div>

        {/* DISCLAIMER */}

        <p className="text-xs text-center text-gray-400 mt-6 px-4">

          This AI assistant provides general health information only.
          It is not a substitute for professional medical advice.

        </p>

      </div>

    </div>

  );

}