document.addEventListener("DOMContentLoaded", () => {
// ELEMENTS 
  const fetchBtn = document.getElementById("fetchDataBtn");
  const tableBody = document.querySelector("#transaction-table tbody");
  const totalDisplay = document.getElementById("totalDisplay");
   const alertBox = document.getElementById("alertBox");
  const adviceBox = document.getElementById("adviceBox");

  //Dropdown Items
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

  darkModeToggle.addEventListener("change", () => applyDark(darkModeToggle.checked));
});