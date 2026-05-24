import { useState } from "react";

export default function WorkoutPlanner() {

  const [level, setLevel] =
    useState("beginner");

  const [plan, setPlan] =
    useState("");

  const generatePlan = () => {

    if (
      level === "beginner"
    ) {

      setPlan(`
🏃 Beginner Workout Plan

Day 1:
Pushups - 10
Squats - 15
Walking - 20 min

Day 2:
Rest

Day 3:
Plank - 30 sec
Jumping Jacks - 20
Cycling - 15 min
`);

    }

    if (
      level === "intermediate"
    ) {

      setPlan(`
💪 Intermediate Workout

Bench Press - 4x10
Pullups - 4x8
Deadlift - 4x8
Running - 30 min
`);

    }

    if (
      level === "advanced"
    ) {

      setPlan(`
🔥 Advanced Workout

Deadlift - 5x5
Bench Press - 5x5
Squats - 5x5
HIIT - 40 min
Abs Training
`);

    }

  };

  return (

    <div className="bg-zinc-900 p-5 rounded-2xl mt-10">

      <h2 className="text-3xl font-bold mb-5">
        Workout Planner 🏋️
      </h2>

      <select
        value={level}
        onChange={(e) =>
          setLevel(
            e.target.value
          )
        }
        className="w-full p-3 rounded-xl bg-black text-white mb-5"
      >

        <option value="beginner">
          Beginner
        </option>

        <option value="intermediate">
          Intermediate
        </option>

        <option value="advanced">
          Advanced
        </option>

      </select>

      <button
        onClick={generatePlan}
        className="w-full bg-red-600 p-3 rounded-xl"
      >

        Generate Workout

      </button>

      {plan && (

        <div className="mt-5 whitespace-pre-wrap bg-black p-5 rounded-xl">

          {plan}

        </div>

      )}

    </div>

  );

}