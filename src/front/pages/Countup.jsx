import CountUp from "react-countup";

export default function StatsPanel({ metrics }) {
  return (
    <div className="stats">
      <h2>Job Tracker Stats</h2>
      <p>Applications: <CountUp end={metrics.applications} duration={1.5} /></p>
      <p>Interviews: <CountUp end={metrics.interviews} duration={1.5} /></p>
      <p>Offers: <CountUp end={metrics.offers} duration={1.5} /></p>
      <p>Dismissed: <CountUp end={metrics.dismissed} duration={1.5} /></p>
    </div>
  );
}