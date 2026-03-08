let state = {};

async function loadState() {
  try {
    const res = await fetch("/data");
    const data = await res.json();
    state = data;

    console.log("Loaded state:", state);
  } catch (err) {
    console.error("Failed to load state", err);
  }
}

async function saveState() {
  try {
    await fetch("/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state)
    });

    console.log("Saved state");
  } catch (err) {
    console.error("Failed to save state", err);
  }
}

window.addEventListener("load", loadState);

// poll every 2 seconds so everyone stays synced
setInterval(loadState, 2000);