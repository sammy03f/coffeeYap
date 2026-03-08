const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

let state = {
  members: [],
  meetingHistory: [],
  currentWeek: 1,
  pairingOverrides: {},
  currentPage: "homePage"
};

/* GET STATE */
app.get("/data", (req, res) => {
  res.json(state);
});

/* SAVE STATE */
app.post("/save", (req, res) => {
  state = req.body;
  console.log("State updated");
  res.sendStatus(200);
});

/* SERVE SITE */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`CoffeeYap running on port ${PORT}`);
});