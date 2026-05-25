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

    console.log(error);

    const errorMessage = {
      sender: "bot",
      text: "AI Error ❌",
    };

    setMessages((prev) => [
      ...prev,
      errorMessage,
    ]);

  }

  setInput("");
};