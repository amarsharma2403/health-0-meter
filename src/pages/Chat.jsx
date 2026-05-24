import { useState } from "react";

export default function Chat() {

  const [messages, setMessages] =
    useState([

      {

        role: "assistant",

        text:
          "Hello 👋 I am Health-O-Meter Assistant",

      },

    ]);

  const [input, setInput] =
    useState("");

  const sendMessage = () => {

    if (!input) return;

    setMessages([
      ...messages,

      {

        role: "user",

        text: input,

      },

    ]);

    setInput("");

  };

  return (

    <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 shadow-2xl">

      <h1 className="text-3xl font-black mb-6 text-white">

        AI Health Chatbot 🤖

      </h1>

      <div className="bg-black rounded-2xl p-5 h-[400px] overflow-y-auto mb-5">

        {messages.map(
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
                className={`p-4 rounded-2xl max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-zinc-800 text-white"
                }`}
              >

                {msg.text}

              </div>

            </div>

          )
        )}

      </div>

      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Ask health questions..."
          value={input}
          onChange={(e) =>
            setInput(
              e.target.value
            )
          }
          className="flex-1 p-4 rounded-2xl bg-black border border-zinc-700 text-white outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-purple-600 hover:bg-purple-700 transition-all px-6 rounded-2xl font-bold text-white"
        >

          Send

        </button>

      </div>

    </div>

  );

}