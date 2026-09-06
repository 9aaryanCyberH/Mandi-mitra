# 🌾 Mandi-Mitra

A web-based agricultural market price platform that helps users check the latest available **mandi prices** for different commodities across Indian states.

Mandi-Mitra provides a simple interface where users can select a state and commodity to view mandi-wise price information, including minimum, modal, and maximum prices.

## 🚀 Live Demo

**Frontend:**  
Link 1 : https://mandi-mitra-e75pgstn9-9aaryancyberhs-projects.vercel.app/
Link 2: https://mandi-mitra.netlify.app/

**Backend API:**  
https://enaam-web-scraping.onrender.com/

## ✨ Features

- 🌾 Search mandi prices by state and commodity
- 🏪 View prices across different APMCs/mandis
- 📍 Display district information
- 💰 Minimum, modal, and maximum price information
- 📅 Display arrival dates
- 📊 Price summary and analysis
- 🔄 Dynamic state and commodity selection
- 📱 Responsive user interface
- ⚡ REST API powered backend
- 🗃️ JSON-based mandi price dataset
- 🌐 Deployed frontend and backend

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express.js
- REST API
- Puppeteer
- CORS

### Data Source

- Government of India Open Government Data Platform
- e-NAM mandi price data

### Deployment

- Vercel — Frontend
- Render — Backend

## 🏗️ Project Architecture

```text
                 ┌──────────────────────┐
                 │      User / Farmer   │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │   Mandi-Mitra UI     │
                 │      React + Vite    │
                 └──────────┬───────────┘
                            │
                       REST API
                            │
                            ▼
                 ┌──────────────────────┐
                 │    Express Backend   │
                 │      Node.js         │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │  Mandi Price Data    │
                 │       JSON           │
                 └──────────────────────┘
```

## 🔄 How It Works

1. The user opens the Mandi-Mitra web application.
2. The application loads the available states from the backend API.
3. The user selects a state.
4. The application retrieves the commodities available for that state.
5. The user selects a commodity.
6. A request is sent to the backend.
7. The backend searches the mandi price dataset.
8. Matching mandi records are returned to the frontend.
9. The frontend displays the results in a structured table.
10. Price statistics are calculated and displayed for easier comparison.

## 📊 Price Information

For each mandi, Mandi-Mitra can display:

| Field | Description |
|---|---|
| Mandi / APMC | Name of the agricultural market |
| District | District where the mandi is located |
| Commodity | Name of the agricultural commodity |
| Minimum Price | Lowest recorded price |
| Modal Price | Most commonly reported price |
| Maximum Price | Highest recorded price |
| Arrival Date | Date of arrival/reporting |

## 📁 Project Structure

```text
Mandi-Mitra/
│
├── public/
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## 🔌 Backend API

The frontend communicates with the following backend:

```text
https://enaam-web-scraping.onrender.com
```

### Available Endpoints

#### Get available states

```http
GET /states
```

Example:

```text
https://enaam-web-scraping.onrender.com/states
```

#### Get commodities for a state

```http
GET /commodities?state=Punjab
```

Example:

```text
https://enaam-web-scraping.onrender.com/commodities?state=Punjab
```

#### Get mandi price data

```http
POST /getdata
```

Request body:

```json
{
  "state": "Punjab",
  "commodity": "Apple"
}
```

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/9aaryanCyberH/Mandi-mitra.git
```

### 2. Move into the project directory

```bash
cd Mandi-mitra
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## 📦 Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🔐 Environment & Security

Sensitive API credentials should never be committed to GitHub.

If API credentials are required during development, store them in a `.env` file:

```env
DATA_GOV_API_KEY=your_api_key_here
```

Make sure `.env` is included in `.gitignore`.

Never expose API keys directly inside frontend code or public repositories.

## 🎯 Project Objective

The main objective of Mandi-Mitra is to make agricultural market price information easier to access and understand.

Instead of manually searching through large datasets, users can select their state and commodity and quickly compare available mandi prices.

## 🔮 Future Improvements

- 📈 Historical price charts
- 📍 Location-based mandi recommendations
- 🔔 Price alerts and notifications
- 📊 Advanced price analytics
- 🗺️ Interactive mandi map
- 🤖 AI-based price trend predictions
- 📱 Progressive Web App support
- 🌐 Support for regional languages
- 🗄️ Migration from JSON storage to a database
- ⏱️ Automated data updates

## 👨‍💻 Developer

**Aaryan Kumar**

Computer Science Engineering Student

### Links

- LinkedIn:  
  https://www.linkedin.com/in/aaryan-k-ba3985246/

- GitHub:  
  https://github.com/9aaryanCyberH

- Resume:  
  https://drive.google.com/file/d/1BrrYb8FwXAVyU6mplO27FitPqQi9Lv7F/view

## 📜 License

This project is developed for educational and project-based purposes.

---

⭐ If you find this project useful, consider giving the repository a star!
