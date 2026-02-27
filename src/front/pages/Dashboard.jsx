import { useContext } from "react";
import { MetricsContext } from "../context/MetricsContext"; // adjust path if needed
import StatsPanel from "./StatsPanel";
import ChartPanel from "./ChartPanel";
export default function Dashboard() {
  const { metrics } = useContext(MetricsContext);
  return (
    <div className="container mt-4">
      <h1>Dashboard</h1>
      <StatsPanel metrics={metrics} />
      <ChartPanel metrics={metrics} />
    </div>
  );
  }

