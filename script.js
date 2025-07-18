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
     
     
    })
    .catch(error => {
      console.error(error); // Log any errors
      throw error;
      // alertBox.textContent = "Failed to fetch data."; // Inform the user of the error
      // alertBox.classList.add("visible"); // Make the alert box visible
    });
    
}
 function txTable(arr) {
    tableBody.innerHTML = "";
    arr.forEach(tx => {
      const row = `<tr><td>${tx.date}</td><td>${tx.vendor}</td><td>${tx.amount}</td><td>${tx.category}</td></tr>`;
      tableBody.insertAdjacentHTML("beforeend", row);
    });
  }
  // Organize eacg transaction with it's category
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
  fetchBtn.addEventListener("click", fetchTransactions);
});