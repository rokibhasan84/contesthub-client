import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function WinPercentageChart({ won, participated }) {
  const lost = participated - won;

  const data = [
    { name: "Won", value: won },
    { name: "Lost", value: lost },
  ];

  const COLORS = ["#22c55e", "#ef4444"]; // green, red

  const winPercentage =
    participated > 0 ? Math.round((won / participated) * 100) : 0;

  return (
    <div className="bg-base-200 p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        Win Percentage
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <p className="text-center mt-4 font-semibold text-lg">
        {winPercentage}% Win Rate
      </p>
    </div>
  );
}


