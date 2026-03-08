const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const DATA_FILE = path.join(__dirname, "data.json");

app.get("/data", (req, res) => {
  const data = fs.readFileSync(DATA_FILE);
  res.json(JSON.parse(data));
});

app.post("/save", (req, res) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Coffee Yap server running on port ${PORT}`);
});