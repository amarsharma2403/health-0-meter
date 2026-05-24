import { useState } from "react";

export default function StepCounter() {

  const [steps, setSteps] =
    useState(0);

  const caloriesBurned =
    (
      steps * 0.04
    ).toFixed(1);

  const progress =
    Math.min(
      (steps / 10000) * 100,
      100
    );

  return (

    <div className="bg-zinc-900 p-5 rounded-2xl mt-10">

      <h2 className="text-3xl font-bold mb-5">
        Daily Step Counter 🚶
      </h2>

      {/* STEPS */}

      <div className="text-center">

        <p className="text-6xl font-bold">
          {steps}
        </p>

        <p className="opacity-70 mt-2">
          steps completed today
        </p>

      </div>

      {/* BUTTONS */}

      <div className="grid grid-cols-2 gap-4 mt-6">

        <button
          onClick={() =>
            setSteps(
              steps + 500
            )
          }
          className="bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded-xl text-white font-bold"
        >

          +500 Steps

        </button>

        <button
          onClick={() =>
            setSteps(0)
          }
          className="bg-red-600 hover:bg-red-700 transition-all p-3 rounded-xl text-white font-bold"
        >

          Reset

        </button>

      </div>

      {/* CALORIES */}

      <div className="mt-6 bg-black p-5 rounded-xl border border-zinc-700">

        <p className="text-lg opacity-70">
          🔥 Calories Burned
        </p>

        <p className="text-4xl font-bold mt-2">
          {caloriesBurned} kcal
        </p>

      </div>

      {/* PROGRESS */}

      <div className="mt-6 bg-black p-5 rounded-xl border border-zinc-700">

        <p className="text-lg opacity-70">
          🎯 Daily Goal
        </p>

        <div className="w-full bg-zinc-700 rounded-full h-5 mt-4 overflow-hidden">

          <div
            className="bg-green-500 h-5 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <p className="mt-3 text-lg">

          {steps}/10000 steps

        </p>

      </div>

      {/* STATUS */}

      <div className="mt-6 bg-black p-5 rounded-xl border border-zinc-700">

        <p className="text-lg opacity-70">
          📈 Status
        </p>

        <p className="text-2xl font-bold mt-2">

          {steps >= 10000
            ? "Excellent 🔥"
            : steps >= 5000
            ? "Good 💪"
            : "Keep Going 🚀"}

        </p>

      </div>

    </div>

  );

}