const jsonServer = require("json-server");
const path = require("path");
const express = require("express");

const app = express();
const api = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// JSON Server middleware
app.use("/api", middlewares);
app.use("/api", api);

// Fallback to index.html for all other routes (for SPA support)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
