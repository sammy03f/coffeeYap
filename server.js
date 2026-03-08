const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/data", async (req, res) => {
  const { data, error } = await supabase
    .from("state")
    .select("data")
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    return res.status(500).json(error);
  }

  res.json(data.data);
});

app.post("/save", async (req, res) => {
  const { error } = await supabase
    .from("state")
    .update({ data: req.body })
    .eq("id", 1);

  if (error) {
    console.error(error);
    return res.status(500).json(error);
  }

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Coffee Yap server running on port ${PORT}`);
});