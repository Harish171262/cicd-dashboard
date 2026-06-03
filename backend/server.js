const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const startTime = Date.now();

app.get("/api/status", (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = uptimeSeconds % 60;

  res.json({
    status: "running",
    serverTime: new Date().toLocaleString(),
    uptime: `${hours}h ${minutes}m ${seconds}s`,
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || "development",
    deployCount: 1,
    lastDeployed: new Date().toLocaleDateString(),
  });
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});