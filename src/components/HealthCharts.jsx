import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function HealthCharts() {

  const data = [
    { day: "Mon", calories: 1800 },
    { day: "Tue", calories: 2200 },
    { day: "Wed", calories: 2000 },
    { day: "Thu", calories: 2500 },
    { day: "Fri", calories: 2100 },
    { day: "Sat", calories: 2300 },
    { day: "Sun", calories: 1900 },
  ];

  return (

    <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 shadow-2xl text-white w-full">

      <h2 className="text-3xl font-black mb-6">

        Weekly Calories Chart 📈

      </h2>

      <div
        style={{
          width: "100%",
          height: "350px",
          minWidth: 0,
        }}
      >

        <ResponsiveContainer>

          <LineChart data={data}>

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="calories"
              stroke="#9333ea"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}