export async function askGemini(message) {

  try {

    const response = await fetch(
      "https://health-0-meter-api.onrender.com/chat",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message,
        }),
      }
    );

    const data = await response.json();

    return data.reply;

  } catch (error) {

    console.log(error);

    return "Backend Error ❌";

  }

}