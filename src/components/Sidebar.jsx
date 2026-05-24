export default function Sidebar() {

  return (

    <div className="w-full md:w-72 bg-zinc-900 text-white p-6 rounded-3xl border border-zinc-800 shadow-2xl">

      <h1 className="text-3xl font-black mb-8">

        Health-O-Meter 🚀

      </h1>

      <div className="space-y-4">

        <button className="w-full bg-purple-600 hover:bg-purple-700 transition-all p-4 rounded-2xl text-left font-bold">

          Dashboard

        </button>

        <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition-all p-4 rounded-2xl text-left">

          AI Chatbot

        </button>

        <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition-all p-4 rounded-2xl text-left">

          Workout Planner

        </button>

        <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition-all p-4 rounded-2xl text-left">

          Calories Tracker

        </button>

        <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition-all p-4 rounded-2xl text-left">

          Water Tracker

        </button>

        <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition-all p-4 rounded-2xl text-left">

          Reports

        </button>

      </div>

    </div>

  );

}