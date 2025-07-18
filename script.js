// CHINGRI TRANSACTIONS TRACKER
document.addEventListener("DOMContentLoaded", () => {
// ELEMENTS 
  const fetchBtn = document.getElementById("fetchDataBtn");
  const tableBody = document.querySelector("#transaction-table tbody");
  const totalDisplay = document.getElementById("totalDisplay");
  const alertBox = document.getElementById("alertBox");
  const adviceBox = document.getElementById("adviceBox");

  // Dropdown Items
  const alertToggle = document.getElementById("alertToggle");
  const alertFrequency = document.getElementById("alertFrequency");
  const dailyLimit = document.getElementById("dailyLimit");
  const weeklyLimit = document.getElementById("weeklyLimit");
  const monthlyLimit = document.getElementById("monthlyLimit");
  const saveLimitBtn = document.getElementById("saveLimitBtn");
  const darkModeToggle = document.getElementById("darkModeToggle");
  
  // Filter dropdown items
  const categoryFilter = document.getElementById("categoryFilter");
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const filterBtn = document.getElementById("filterBtn");

  let transactions = [];

  // Darkmode toggle
  function applyDark(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    localStorage.setItem("darkMode", isDark);
  }  
  darkModeToggle.addEventListener("change", () => applyDark(darkModeToggle.checked));

const API_URL = "http://localhost:3001/transactions"; // local server for transaction details
  
function fetchTransactions() {
  fetch(API_URL)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText); // Throw an error if the response is not ok
      }
      return res.json(); // Parse the response as JSON
    })
    .then(data => {
      // Transform the data into the desired tablecolumns format
      transactions = data.map(tx => ({
        date: tx.date.split(" ")[0], // Extract the date
        vendor: (tx.method || "MPESA").toUpperCase(), // Get vendor name
        amount: Number(tx.amount), // Convert amount to a number
        category: categorize(tx.method || "") // Categorize the transaction
      }));
      txTable(transactions); // Render the transactions in a table
      updateTotals(transactions); // Update totals basedon transactions
      showAdvice();
    })
    .catch(error => {
      console.error(error); // Log any errors
      alertBox.textContent = "Failed to fetch data."; // Inform the user of the error
      alertBox.classList.add("visible"); // Make the alert box visible
      throw error;

    });
    
}

 function txTable(arr) {
    tableBody.innerHTML = "";
    arr.forEach(tx => {
      const row = `<tr><td>${tx.date}</td><td>${tx.vendor}</td><td>${tx.amount}</td><td>${tx.category}</td></tr>`;
      tableBody.insertAdjacentHTML("beforeend", row);
    });
  }

  // Organize each transaction with it's category
  function categorize(categ) {
    categ = categ.toLowerCase().trim(); // Convert to lowercase and trim whitespace
    if (categ.includes("jumia") || categ.includes("quickmart") || categ.includes("tuskys") || categ.includes("naivas")) return "Shopping";
    if (categ.includes("house") || categ.includes("cafe") || categ.includes("kfc")) return "Food";
    if (categ.includes("airtime") || categ.includes("safaricom")) return "Mobile";
    if (categ.includes("m-pesa")) return "Transfer";
    if (categ.includes("netflix") || categ.includes("spotify") || categ.includes("zuku")) return "Entertainment";
    if (categ.includes("shell") || categ.includes("total")) return "Car Expenses";
    if (categ.includes("moringa") || categ.includes("university of nairobi") || categ.includes("sparkling bubble")) return "Education";

    return "Other";
  }  

  // Filtering
  filterBtn.addEventListener("click", () => {
  if (!startDateInput.value || !endDateInput.value) return;
  const [from, to] = [new Date(startDateInput.value), new Date(endDateInput.value)];
  const filtered = transactions.filter(t => {
    const d = new Date(t.date);
    return d >= from && d <= to;
  });
  renderTable(filtered);
  updateTotals(filtered);
});


  // TOTAL AMOUNT DISPLAYED
  function updateTotals(txArr) {
    const total = txArr.reduce((sum, tx) => sum + tx.amount, 0);
    totalDisplay.textContent = `Total: KSh ${total}`;

    const s = JSON.parse(localStorage.getItem("chingriSettings"));
    console.log(s);
    if (s?.alertOn) {
      const limit = s[s.frequency] || 0;
      console.log(limit);
      if (limit && total > limit) {
        alertBox.textContent = `You exceeded your ${s.frequency} limit of KSh ${limit}.`;
        alertBox.classList.add("visible");
        return;
      }
    }
    alertBox.classList.remove("visible");
    alertBox.textContent = "";
  }

  // Save & Load settings (alert toggle and save limit)
  function saveSettings() {
    const settings = {
      alertOn: alertToggle.checked,
      frequency: alertFrequency.value,
      daily: parseFloat(dailyLimit.value) || 0,
      weekly: parseFloat(weeklyLimit.value) || 0,
      monthly: parseFloat(monthlyLimit.value) || 0
    };
    localStorage.setItem("chingriSettings", JSON.stringify(settings));
  }

  function loadSettings() {
    const s = JSON.parse(localStorage.getItem("chingriSettings"));
    if (s) {
      alertToggle.checked = s.alertOn;
      alertFrequency.value = s.frequency;
      dailyLimit.value = s.daily || "";
      weeklyLimit.value = s.weekly || "";
      monthlyLimit.value = s.monthly || "";
      document.getElementById("limitSettings").style.display = s.alertOn ? "flex" : "none";
    }
    const dark = localStorage.getItem("darkMode") === "true";
    darkModeToggle.checked = dark;
    applyDark(dark);
  }

  alertToggle.addEventListener("change", () => {
    document.getElementById("limitSettings").style.display = alertToggle.checked ? "flex" : "none";
    saveSettings();
  });

  saveLimitBtn.addEventListener("click", () => {
    saveSettings();
    alert("Limit saved!");
  });


  // FINANCIAL ADVICE 
  function showAdvice() {
    const tips = [
      "Track your daily expenses — small amounts add up fast.",
      "Set a monthly spending goal and stick to it.",
      "Avoid using credit to fund daily expenses.",
      "Review your subscriptions monthly. Cancel unused ones.",
      "Don't spend money you haven't received yet.",
      "Budgeting isn’t restrictive — it's a plan for freedom.",
      "Automate savings transfers to remove temptation.",
      "Delay impulse purchases by 24 hours before deciding.",
      "Save before you spend, not after.",
      "Use categories to understand where your money goes.",
      "Don't buy it just because it's on sale.",
      "Set financial goals: short‑term and long‑term.",
      "Track cash withdrawals like you do digital payments.",
      "Revisit your budget every month — life changes, so should your budget.",
      "Compare prices before you buy. Even on small items.",
      "Avoid buying with emotions. Money doesn't solve feelings.",
      "Pay bills on time to avoid penalties and late fees.",
      "Talk to someone you trust about money. Perspective helps.",
      "Set spending limits — and celebrate hitting them!",
      "Unsubscribe from promotional emails to reduce temptation.",
      "Cut back 10% on your biggest expense category this month.",
      "Use M‑PESA wisely — it's a tool, not a trap.",
      "If you overspend, don’t guilt yourself — reflect, learn, reset.",
      "Use daily limits to stay in control without stress.",
      "Every shilling saved is a shilling earned."
    ];
    adviceBox.textContent = tips[Math.floor(Math.random() * tips.length)];
  }
  loadSettings();
  fetchBtn.addEventListener("click", fetchTransactions);
});