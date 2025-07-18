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

  function applyDark(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    localStorage.setItem("darkMode", isDark);
  }
    let transactions = [];
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

  fetchBtn.addEventListener("click", fetchTransactions);
});