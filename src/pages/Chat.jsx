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
      text: "Backend Error ❌",
    };

    setMessages((prev) => [
      ...prev,
      errorMessage,
    ]);

  }

  setInput("");

};
