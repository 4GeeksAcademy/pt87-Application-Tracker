import { createContext, useState, useEffect } from "react";

export const MetricsContext = createContext();

export function MetricsProvider({ children }) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        if (!backendUrl || !token) return;

        const apiBase = backendUrl.replace(/\/$/, "");

        const response = await fetch(`${apiBase}/api/applications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.msg || payload?.error || "Failed to load applications");
        }

        setApplications(payload?.data || []);
      } catch (error) {
        console.error("Failed to load metrics applications:", error);
      }
    };

    loadApplications();
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