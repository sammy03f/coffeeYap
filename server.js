const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

let state = {
  members: [],
  meetingHistory: [],
  currentWeek: 1,
  pairingOverrides: {},
  currentPage: "homePage"
};

if (fs.existsSync("data.json")) {
  state = JSON.parse(fs.readFileSync("data.json"));
}

/* GET DATA */
app.get("/data", (req, res) => {
  res.json(state);
});

/* SAVE DATA */
app.post("/save", (req, res) => {
  state = req.body;
  fs.writeFileSync("data.json", JSON.stringify(state, null, 2));
  res.sendStatus(200);
});

/* LOAD WEBSITE */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`CoffeeYap running at http://localhost:${PORT}`);
});