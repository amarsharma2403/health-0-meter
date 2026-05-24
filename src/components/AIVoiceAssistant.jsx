import { useState } from "react";

export default function AIVoiceAssistant() {

  const [listening, setListening] =
    useState(false);

  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        "Speech Recognition not supported"
      );

      return;

    }

    const recognition =
      new SpeechRecognition();

    recognition.start();

    setListening(true);

    recognition.onresult =
      (event) => {

        const text =
          event.results[0][0]
            .transcript;

        speakResponse(
          `You said ${text}`
        );

      };

    recognition.onend = () => {

      setListening(false);

    };

  };

  const speakResponse =
    (message) => {

      const speech =
        new SpeechSynthesisUtterance(
          message
        );

      speech.lang = "en-US";

      window.speechSynthesis.speak(
        speech
      );

    };

  return (

    <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 shadow-2xl text-white">

      <h2 className="text-3xl font-black mb-4">

        Health-O-Meter Voice Assistant 🎤

      </h2>

      <p className="opacity-70 mb-6">

        Talk with your AI health assistant using voice commands.

      </p>

      <button
        onClick={startListening}
        className={`w-full p-4 rounded-2xl font-bold transition-all ${
          listening
            ? "bg-red-600"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >

        {listening
          ? "Listening..."
          : "Start Voice Assistant"}

      </button>

    </div>

  );

}