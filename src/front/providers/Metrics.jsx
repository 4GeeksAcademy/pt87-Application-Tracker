import { createContext, useState, useEffect } from "react";

export const MetricsContext = createContext();

export function MetricsProvider({ children }) {
  const [applications, setApplications] = useState([]);

  // Fetch from your backend on load
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications`)
      .then((res) => res.json())
      .then((payload) => setApplications(payload?.data || []));
  }, []);

  const metrics = {
    applications: applications.length,
    interviews: applications.filter(app => app.status === "Interview").length,
    offers: applications.filter(app => app.status === "Offer").length,
    dismissed: applications.filter(app => app.status === "Dismissed").length,
  };

  return (
    <MetricsContext.Provider value={{ applications, setApplications, metrics }}>
      {children}
    </MetricsContext.Provider>
  );
}