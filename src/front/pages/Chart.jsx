import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function ChartPanel({ metrics }) {
  const data = [
    { name: "Applications", value: metrics.applications },
    { name: "Interviews", value: metrics.interviews },
    { name: "Offers", value: metrics.offers },
    { name: "Dismissed", value: metrics.dismissed }
  ];

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        outerRadius={150}
        fill="#8884d8"
        animationDuration={1000}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}