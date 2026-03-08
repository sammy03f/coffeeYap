let state = {
  members: [],
  meetingHistory: [],
  currentWeek: 1,
  pairingOverrides: {},
  currentPage: "homePage"
};

/*
LOAD STATE FROM SERVER
*/
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

/*
SAVE STATE TO SERVER
*/
async function saveState() {
  try {
    await fetch("/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state)
    });

    console.log("State saved");
  } catch (err) {
    console.error("Failed to save state", err);
  }
}

/*
EXAMPLE ACTION (TEST)
*/
function addTestMember() {
  state.members.push("test-user-" + Math.floor(Math.random() * 1000));
  saveState();
}

/*
LOAD DATA WHEN PAGE STARTS
*/
window.addEventListener("load", loadState);