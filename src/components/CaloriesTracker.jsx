import { useState } from "react";

export default function CaloriesTracker() {

  const [goal, setGoal] =
    useState(2000);

  const [consumed, setConsumed] =
    useState(0);

  const remaining =
    goal - consumed;

  const progress =
    Math.min(
      (consumed / goal) * 100,
      100
    );

  return (

    <div className="bg-zinc-900 p-5 rounded-2xl mt-10">

      <h2 className="text-3xl font-bold mb-5">
        Calorie Goal Tracker 🍎
      </h2>

      {/* DAILY GOAL */}

      <div className="mb-5">

        <label className="block mb-2 text-lg">

          Daily Calorie Goal

        </label>

        <input
          type="number"
          value={goal}
          onChange={(e) =>
            setGoal(
              Number(
                e.target.value
              )
            )
          }
          className="w-full p-3 rounded-xl bg-black text-white border border-zinc-700"
        />

      </div>

      {/* CONSUMED */}

      <div className="mb-5">

        <label className="block mb-2 text-lg">

          Calories Consumed

        </label>

        <input
          type="number"
          value={consumed}
          onChange={(e) =>
            setConsumed(
              Number(
                e.target.value
              )
            )
          }
          className="w-full p-3 rounded-xl bg-black text-white border border-zinc-700"
        />

      </div>

      {/* PROGRESS */}

      <div className="bg-black p-5 rounded-xl border border-zinc-700">

        <p className="text-xl">
          🔥 Progress
        </p>

        <div className="w-full bg-zinc-700 rounded-full h-5 mt-4 overflow-hidden">

          <div
            className="bg-orange-500 h-5 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <p className="mt-4 text-lg">

          {consumed}/{goal} kcal

        </p>

      </div>

      {/* REMAINING */}

      <div className="mt-5 bg-black p-5 rounded-xl border border-zinc-700">

        <p className="text-lg opacity-70">

          Remaining Calories

        </p>

        <p className="text-4xl font-bold mt-2">

          {remaining} kcal

        </p>

      </div>

      {/* STATUS */}

      <div className="mt-5 bg-black p-5 rounded-xl border border-zinc-700">

        <p className="text-lg opacity-70">

          Goal Status

        </p>

        <p className="text-2xl font-bold mt-2">

          {consumed >= goal
            ? "Goal Reached 🔥"
            : "Keep Going 🚀"}

        </p>

      </div>

    </div>

  );

}