const MetricsContext = createContext();
function MetricsProvider({ children }) {
  const [applications, setApplications] = useState([]);
  const metrics = {
    applications: applications.length,
    interviews: applications.reduce((sum, app) => sum + app.interviews, 0),
    offers: applications.filter(app => app.offer).length,
    dismissed: applications.filter(app => app.status === "dismissed").length
  };
  return (
    <MetricsContext.Provider value={{ applications, setApplications, metrics }}>
      {children}
    </MetricsContext.Provider>
  );
}