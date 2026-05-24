import { useState, useEffect } from "react";

import { signOut } from "firebase/auth";

import { auth } from "../firebase";

import jsPDF from "jspdf";

import ChatBot from "../components/ChatBot";
import ImageAnalyzer from "../components/ImageAnalyzer";
import WorkoutPlanner from "../components/WorkoutPlanner";
import StepCounter from "../components/StepCounter";
import CaloriesTracker from "../components/CaloriesTracker";
import WaterTracker from "../components/WaterTracker";
import HealthCharts from "../components/HealthCharts";
import MealPlanner from "../components/MealPlanner";
import ProfileCard from "../components/ProfileCard";
import AIVoiceAssistant from "../components/AIVoiceAssistant";

export default function Dashboard() {

  const [theme, setTheme] =
    useState(
      localStorage.getItem("theme") ||
      "dark"
    );

  const [height, setHeight] =
    useState("");

  const [weight, setWeight] =
    useState("");

  const [bmi, setBmi] =
    useState("");

  const [water, setWater] =
    useState(0);

  const [calories, setCalories] =
    useState(0);

  useEffect(() => {

    localStorage.setItem(
      "theme",
      theme
    );

  }, [theme]);

  const calculateBMI = () => {

    if (!height || !weight)
      return;

    const h = height / 100;

    const result =
      (
        weight /
        (h * h)
      ).toFixed(1);

    setBmi(result);

  };

  const downloadReport = () => {

    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text(
      "Health-O-Meter Report",
      20,
      20
    );

    doc.setFontSize(14);

    doc.text(
      `User: ${
        auth.currentUser?.email
      }`,
      20,
      40
    );

    doc.text(
      `BMI: ${bmi || "N/A"}`,
      20,
      60
    );

    doc.text(
      `Water Intake: ${water}L`,
      20,
      80
    );

    doc.text(
      `Calories: ${calories}`,
      20,
      100
    );

    doc.save(
      "Health-O-Meter_Report.pdf"
    );

  };

  return (

    <div
      className={`min-h-screen transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-black via-zinc-900 to-black text-white"
          : "bg-gradient-to-br from-gray-100 to-white text-black"
      }`}
    >

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 p-5 md:p-10">

        <div>

          <h1 className="text-4xl md:text-6xl font-black">

            Health-O-Meter 🚀

          </h1>

          <p className="opacity-70 mt-2 text-sm md:text-base">

            AI Powered Smart Health Assistant

          </p>

          <p className="opacity-50 mt-1 text-xs md:text-sm break-all">

            {auth.currentUser?.email}

          </p>

        </div>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto">

          <button
            onClick={() =>
              setTheme(
                theme === "dark"
                  ? "light"
                  : "dark"
              )
            }
            className={`px-5 py-3 rounded-2xl font-bold transition-all w-full sm:w-auto ${
              theme === "dark"
                ? "bg-white text-black"
                : "bg-black text-white"
            }`}
          >

            {theme === "dark"
              ? "Light ☀️"
              : "Dark 🌙"}

          </button>

          <button
            onClick={() =>
              signOut(auth)
            }
            className="bg-red-600 hover:bg-red-700 transition-all px-5 py-3 rounded-2xl font-bold w-full sm:w-auto"
          >

            Logout

          </button>

        </div>

      </div>

      {/* TOP GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-5 md:p-10">

        {/* BMI */}

        <div className="bg-zinc-900/80 backdrop-blur-lg p-6 rounded-3xl border border-zinc-800 shadow-2xl">

          <h2 className="text-2xl font-bold mb-5">

            BMI Calculator

          </h2>

          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) =>
              setHeight(
                e.target.value
              )
            }
            className="w-full p-4 rounded-2xl bg-black border border-zinc-700 mb-4"
          />

          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) =>
              setWeight(
                e.target.value
              )
            }
            className="w-full p-4 rounded-2xl bg-black border border-zinc-700 mb-4"
          />

          <button
            onClick={calculateBMI}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all p-4 rounded-2xl font-bold"
          >

            Calculate BMI

          </button>

          {bmi && (

            <div className="mt-5 text-center">

              <p className="text-5xl font-black">

                {bmi}

              </p>

              <p className="opacity-60 mt-2">

                Your BMI

              </p>

            </div>

          )}

        </div>

        {/* WATER */}

        <div className="bg-zinc-900/80 backdrop-blur-lg p-6 rounded-3xl border border-zinc-800 shadow-2xl">

          <h2 className="text-2xl font-bold mb-5">

            Water Intake 💧

          </h2>

          <div className="text-center">

            <p className="text-6xl font-black">

              {water}L

            </p>

          </div>

          <button
            onClick={() =>
              setWater(
                water + 1
              )
            }
            className="w-full bg-cyan-600 hover:bg-cyan-700 transition-all p-4 rounded-2xl font-bold mt-6"
          >

            + Add Water

          </button>

        </div>

        {/* CALORIES */}

        <div className="bg-zinc-900/80 backdrop-blur-lg p-6 rounded-3xl border border-zinc-800 shadow-2xl">

          <h2 className="text-2xl font-bold mb-5">

            Calories 🔥

          </h2>

          <div className="text-center">

            <p className="text-6xl font-black">

              {calories}

            </p>

          </div>

          <button
            onClick={() =>
              setCalories(
                calories + 100
              )
            }
            className="w-full bg-orange-600 hover:bg-orange-700 transition-all p-4 rounded-2xl font-bold mt-6"
          >

            + Add Calories

          </button>

          <button
            onClick={downloadReport}
            className="w-full bg-green-600 hover:bg-green-700 transition-all p-4 rounded-2xl font-bold mt-4"
          >

            Download PDF

          </button>

        </div>

      </div>

      {/* COMPONENTS */}

      <div className="px-5 md:px-10 pb-10 space-y-10">

        <ChatBot />

        <ImageAnalyzer />

        <WorkoutPlanner />

        <StepCounter />

        <CaloriesTracker />

        <WaterTracker />

        <HealthCharts />

        <MealPlanner />

        <ProfileCard />

        <AIVoiceAssistant />

      </div>

    </div>

  );

}