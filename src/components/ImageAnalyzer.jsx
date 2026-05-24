import { useState } from "react";

export default function ImageAnalyzer() {

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [result, setResult] =
    useState("");

  const analyzeImage = async () => {

    if (!image) return;

    setResult(
      "Analyzing image..."
    );

    // MOCK AI RESULT

    setTimeout(() => {

      setResult(`
🍔 Food Detected:
Chicken Burger

🔥 Calories:
450 kcal

🥩 Protein:
25g

🍞 Carbs:
40g

🧈 Fat:
18g

✅ Healthy in moderation
`);

    }, 2000);

  };

  return (

    <div className="bg-zinc-900 p-5 rounded-2xl mt-10">

      <h2 className="text-2xl font-bold mb-5">
        AI Food Analyzer
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {

          const file =
            e.target.files[0];

          setImage(file);

          setPreview(
            URL.createObjectURL(
              file
            )
          );

        }}
        className="mb-5"
      />

      {preview && (

        <img
          src={preview}
          alt="preview"
          className="w-64 rounded-2xl mb-5"
        />

      )}

      <button
        onClick={analyzeImage}
        className="w-full bg-purple-600 p-3 rounded-xl"
      >

        Analyze Food

      </button>

      {result && (

        <div className="mt-5 whitespace-pre-wrap">

          {result}

        </div>

      )}

    </div>

  );

}