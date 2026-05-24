import { useState } from "react";

export default function WaterTracker() {

  const [water, setWater] =
    useState(0);

  const goal = 4;

  const progress =
    Math.min(
      (water / goal) * 100,
      100
    );

  return (

    <div className="bg-zinc-900 p-5 rounded-2xl mt-10">

      <h2 className="text-3xl font-bold mb-5">
        Water Intake Tracker 💧
      </h2>

      {/* WATER VALUE */}

      <div className="text-center">

        <p className="text-6xl font-bold">
          {water}L
        </p>

        <p className="opacity-70 mt-2">
          water consumed today
        </p>

      </div>

      {/* BUTTONS */}

      <div className="grid grid-cols-2 gap-4 mt-6">

        <button
          onClick={() =>
            setWater(
              water + 1
            )
          }
          className="bg-cyan-600 hover:bg-cyan-700 transition-all p-3 rounded-xl text-white font-bold"
        >

          +1L Water

        </button>

        <button
          onClick={() =>
            setWater(0)
          }
          className="bg-red-600 hover:bg-red-700 transition-all p-3 rounded-xl text-white font-bold"
        >

          Reset

        </button>

      </div>

      {/* PROGRESS */}

      <div className="mt-6 bg-black p-5 rounded-xl border border-zinc-700">

        <p className="text-lg opacity-70">
          🎯 Daily Goal
        </p>

        <div className="w-full bg-zinc-700 rounded-full h-5 mt-4 overflow-hidden">

          <div
            className="bg-cyan-500 h-5 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <p className="mt-3 text-lg">

          {water}/{goal} Liters

        </p>

      </div>

      {/* STATUS */}

      <div className="mt-6 bg-black p-5 rounded-xl border border-zinc-700">

        <p className="text-lg opacity-70">
          📈 Hydration Status
        </p>

        <p className="text-2xl font-bold mt-2">

          {water >= goal
            ? "Fully Hydrated 💧"
            : water >= 2
            ? "Good 👍"
            : "Drink More Water 🚀"}

        </p>

      </div>

    </div>

  );

}