# Chingri -Transaction Tracker

**Chingri** is a user-friendly transaction tracker web application that simulates an  mobile money system. It allows users to visualize their spending patterns, set personal limits, and receive helpful financial tips...all using HTML, CSS, JavaScript, DOM manipulation, and external APIs.

---

## Features

* **Fetch Simulated Transactions** from a mock API (Mockly)
* **Filter Transactions by Date Range** (daily, weekly, monthly, or custom)
* **Calculate Totals** for the selected data
* **Set Custom Spending Limits** (daily, weekly, monthly)
* **Toggle Spending Alerts** when limits are exceeded
* **Dark Mode** with persistent settings
* **Display Financial Advice** using a simulated tips array
* **Responsive UI** that adapts to both desktop and mobile screens

---

## Project Structure

```
chingri/
├── index.html         # Main HTML structure
├── style.css          # CSS styling for layout, theme, and responsiveness
├── script.js          # JavaScript logic: DOM handling, fetch, filtering, settings
└── README.md          # Project documentation
```

---

## APIs Used

* **JSON SERVER** 


---

## How It Works

1. The user clicks the **"Fetch Transactions"** button.
2. Transactions are fetched from the  local server in JSON format.
3. The transaction data is displayed in a styled, scrollable table.
4. The user can filter transactions by a date range.
5. The app calculates and displays the total transaction amount.
6. If enabled, the app alerts the user when the limit is exceeded.
7. A random financial tip is displayed every time new data is fetched.
8. Dark mode can be toggled and is remembered across sessions using `localStorage`.
9. All user settings, including alert preferences and limits, are saved locally.

---

## Setup Instructions

1. Clone or download this repository.
2. Ensure the following files are in your project folder:

   * `index.html`
   * `style.css`
   * `script.js`
   * `README.md`
3. Open `index.html` in your preferred web browser.
4. (Optional) Use the Live Server extension in VS Code for real-time previews.

---

## Technologies Used

* **HTML5**
* **CSS3**
* **JavaScript (ES6)**
* **DOM API**
* **Fetch API**
* **LocalStorage API**

---

## Requirements Met

* Integration of a JSON API
* Dynamic DOM manipulation using JavaScript
* User-friendly filtering and data rendering
* Use of `eventListeners`, `fetch()`, and persistent storage
* Clear file separation for maintainability

---

## Future Enhancements

* Integrate charts (e.g., using Chart.js) for visual insights
* Allow manual transaction entry for testing and offline use
* Implement user login/authentication for expanded features
* Optimize layout for very small screen devices

---

## Author Notes

**Chingri** was built as a hands-on project to reinforce essential frontend development skills. It bridges real-world problems (like financial tracking) with interactive programming. The project is designed to be fun, practical, and highly customizable.

**Name** Mercy Ndolo

[**GITHUB PROFILE**](https://github.com/NdoloMwende)
---

## License

This project is intended for educational and personal learning purposes only. Commercial use of simulated data is not allowed.