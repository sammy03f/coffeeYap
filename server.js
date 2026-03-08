const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// connect to supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

/*
------------------------------------
GET CURRENT STATE
------------------------------------
*/
app.get("/data", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("state")
      .select("data")
      .eq("id", 1)
      .single();

    if (error) throw error;

    res.json(data.data);
  } catch (err) {
    console.error("Error loading state:", err);
    res.status(500).json({ error: "Failed to load data" });
  }
});

/*
------------------------------------
SAVE STATE
------------------------------------
*/
app.post("/save", async (req, res) => {
  try {
    const { error } = await supabase
      .from("state")
      .update({ data: req.body })
      .eq("id", 1);

    if (error) throw error;

    res.json({ success: true });
  } catch (err) {
    console.error("Error saving state:", err);
    res.status(500).json({ error: "Failed to save data" });
  }
});

/*
------------------------------------
HEALTH CHECK (optional but nice)
------------------------------------
*/
app.get("/ping", (req, res) => {
  res.send("CoffeeYap server alive ☕");
});

/*
------------------------------------
START SERVER
------------------------------------
*/
app.listen(PORT, () => {
  console.log(`Coffee Yap server running on port ${PORT}`);
});