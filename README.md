# 🌾 Mandi-Mitra

> A simple and modern agricultural market price dashboard for exploring mandi prices across India.

Mandi-Mitra is a React-based web application that makes agricultural market price information easier to search, understand, and explore.

Users can select an Indian state and agricultural commodity to view available mandi/APMC price information, including minimum, modal, and maximum prices.

---

## 🚀 Live Project

**Frontend:**  
https://mandi-mitra.vercel.app/

**Backend API:**  
https://enaam-web-scraping.onrender.com/

> Replace the Vercel URL above with the actual URL generated after deployment.

---

## ✨ Features

- 🇮🇳 Browse agricultural market data across Indian states
- 🌾 Select commodities dynamically based on the selected state
- 🔍 Search mandi prices using a simple interface
- 🏪 View mandi/APMC information
- 💰 View minimum, modal, and maximum prices
- 📊 Automatic price summaries
- 📈 Compare available prices across markets
- 📱 Responsive interface for desktop and mobile
- ⚡ React + Vite frontend
- 🔗 Connected to a REST API backend

---

## 🖥️ Application Overview

Mandi-Mitra provides a simple workflow:

```text
Select State
     ↓
Select Commodity
     ↓
Search Prices
     ↓
View Mandi Results
     ↓
Compare Market Prices

The dashboard displays:

Information	Description
Mandi / APMC	Agricultural market name
District	District information when available
Commodity	Selected agricultural commodity
Minimum Price	Lowest reported market price
Modal Price	Modal/representative market price
Maximum Price	Highest reported market price
Arrival Date	Arrival date when available
🏗️ Project Architecture
                   ┌─────────────────────┐
                   │     Mandi-Mitra     │
                   │   React Frontend    │
                   │      (Vite)         │
                   └──────────┬──────────┘
                              │
                              │ REST API
                              ▼
                   ┌─────────────────────┐
                   │      Express.js     │
                   │     Backend API     │
                   └──────────┬──────────┘
                              │
                              ▼
                   ┌─────────────────────┐
                   │   Mandi Price Data  │
                   │       JSON          │
                   └─────────────────────┘
🛠️ Tech Stack
Frontend
React
Vite
JavaScript
HTML5
CSS3
Backend
Node.js
Express.js
REST API
JSON data processing
Deployment
Vercel — Frontend
Render — Backend
Data Source

The application works with agricultural mandi-price data obtained through the backend data pipeline based on India's e-NAM / government agricultural market data.

📂 Project Structure
Mandi-mitra/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
⚙️ Getting Started
1. Clone the repository
git clone https://github.com/9aaryanCyberH/Mandi-mitra.git
2. Enter the project directory
cd Mandi-mitra
3. Install dependencies
npm install
4. Start the development server
npm run dev

The application will normally be available at:

http://localhost:5173
📦 Production Build

To create a production build:

npm run build

To preview the production build locally:

npm run preview
🔌 API Integration

The frontend communicates with the deployed backend API.

Get available states
GET /states
Get commodities for a state
GET /commodities?state=Punjab
Search mandi prices
POST /getdata

Example request:

{
  "state": "Punjab",
  "commodity": "Apple"
}

The frontend uses these endpoints to dynamically populate the state and commodity selectors and retrieve mandi-price results.

📊 Dashboard Calculations

The dashboard calculates:

Lowest Price

The minimum valid value among the available minimum prices.

Average Modal Price

The average of the available valid modal prices.

Highest Price

The maximum valid value among the available maximum prices.

Invalid or non-numeric price values are excluded from these calculations.

📱 Responsive Design

Mandi-Mitra is designed to work across:

💻 Desktop
💻 Laptop
📱 Mobile
📟 Tablet

The layout automatically adapts the navigation, search form, summary cards, feature cards, tables, and footer for smaller screens.

🔒 Security

No API credentials or private keys should be stored directly in the frontend source code.

If environment variables are required for development or deployment, they should be stored in .env files and excluded from Git using .gitignore.

👨‍💻 Developer

Aaryan Kumar

LinkedIn: https://www.linkedin.com/in/aaryan-k-ba3985246/
GitHub: https://github.com/9aaryanCyberH
Resume: 
https://drive.google.com/file/d/1BrrYb8FwXAVyU6mplO27FitPqQi9Lv7F/view
🎯 Project Goal

The goal of Mandi-Mitra is to provide a clean and accessible interface for exploring agricultural market prices.

Instead of requiring users to work directly with raw datasets or APIs, the application presents the information through a simple search-driven dashboard.

📌 Future Improvements

Potential improvements include:

📍 District-level filtering
📅 Historical price trends
📈 Interactive price charts
🔎 Advanced market filtering
🗺️ Mandi location visualization
📊 More detailed market analytics
🔄 Automated data updates
👤 User preferences and saved searches
📄 License

This project is intended for educational and project-development purposes.

⭐ If you find this project useful, consider giving the repository a star.