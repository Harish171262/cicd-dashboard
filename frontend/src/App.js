import { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://cicd-dashboard-backend-phsn.onrender.com/api/status");
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      setStatus({ error: true });
    }
    setLoading(false);
    setLastRefresh(new Date());
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const cardStyle = {
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    margin: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh", padding: "30px", fontFamily: "Arial" }}>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "28px", color: "#333" }}>🚀 CI/CD Status Dashboard</h1>
        <p style={{ color: "#666" }}>Auto deployed using GitHub Actions + Docker</p>
        <p style={{ color: "#999", fontSize: "13px" }}>
          Last refreshed: {lastRefresh.toLocaleTimeString()}
        </p>
      </div>

      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div style={cardStyle}>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>🖥️ Backend API</span>
          <span style={{ color: status?.error ? "red" : "green", fontWeight: "bold" }}>
            {loading ? "Checking..." : status?.error ? "❌ Down" : "✅ Running"}
          </span>
        </div>

        <div style={cardStyle}>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>⚛️ Frontend</span>
          <span style={{ color: "green", fontWeight: "bold" }}>✅ Running</span>
        </div>

        <div style={cardStyle}>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>⚙️ CI/CD Pipeline</span>
          <span style={{ color: "green", fontWeight: "bold" }}>✅ Active</span>
        </div>

        <div style={cardStyle}>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>🐳 Docker</span>
          <span style={{ color: "green", fontWeight: "bold" }}>✅ Containerized</span>
        </div>

        {status && !status.error && (
          <div style={{ ...cardStyle, flexDirection: "column", alignItems: "flex-start" }}>
            <h3 style={{ marginBottom: "10px" }}>🖥️ Server Information</h3>
            <p>⏰ Server Time: <b>{status.serverTime}</b></p>
            <p>🔄 Uptime: <b>{status.uptime}</b></p>
            <p>📦 Node Version: <b>{status.nodeVersion}</b></p>
            <p>🌍 Environment: <b>{status.environment}</b></p>
            <p>🚀 Deploy Count: <b>{status.deployCount}</b></p>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={fetchStatus} style={{
            background: "#4CAF50", color: "white", border: "none",
            padding: "12px 30px", borderRadius: "8px", fontSize: "16px", cursor: "pointer",
          }}>
            🔄 Refresh Status
          </button>
        </div>

        <p style={{ textAlign: "center", color: "#999", marginTop: "15px", fontSize: "12px" }}>
          Auto refreshes every 30 seconds
        </p>
      </div>
    </div>
  );
}

export default App;