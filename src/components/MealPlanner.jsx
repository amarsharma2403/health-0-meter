import { useState } from "react";

export default function MealPlanner() {

  const [goal, setGoal] =
    useState("weight-loss");

  const [meal, setMeal] =
    useState("");

  const generateMeal = () => {

    if (
      goal === "weight-loss"
    ) {

      setMeal(`
🥗 Weight Loss Meal Plan

Breakfast:
Oats + Banana + Black Coffee

Lunch:
Grilled Chicken + Rice + Salad

Dinner:
Soup + Vegetables

Snacks:
Fruits + Nuts
`);

    }

    if (
      goal === "muscle-gain"
    ) {

      setMeal(`
💪 Muscle Gain Meal Plan

Breakfast:
Eggs + Peanut Butter Toast + Milk

Lunch:
Chicken + Rice + Paneer

Dinner:
Fish + Sweet Potato

Snacks:
Protein Shake + Banana
`);

    }

    if (
      goal === "maintenance"
    ) {

      setMeal(`
⚖️ Maintenance Meal Plan

Breakfast:
Omelette + Toast

Lunch:
Rice + Dal + Vegetables

Dinner:
Chicken Salad

Snacks:
Yogurt + Fruits
`);

    }

  };

  return (

    <div className="bg-zinc-900 p-5 rounded-2xl mt-10">

      <h2 className="text-3xl font-bold mb-5">
        AI Meal Planner 🍽️
      </h2>

      <select
        value={goal}
        onChange={(e) =>
          setGoal(
            e.target.value
          )
        }
        className="w-full p-3 rounded-xl bg-black text-white mb-5"
      >

        <option value="weight-loss">
          Weight Loss
        </option>

        <option value="muscle-gain">
          Muscle Gain
        </option>

        <option value="maintenance">
          Maintenance
        </option>

      </select>

      <button
        onClick={generateMeal}
        className="w-full bg-green-600 p-3 rounded-xl font-bold"
      >

        Generate Meal Plan

      </button>

      {meal && (

        <div className="mt-5 whitespace-pre-wrap bg-black p-5 rounded-xl border border-zinc-700">

          {meal}

        </div>

      )}

    </div>

  );

}