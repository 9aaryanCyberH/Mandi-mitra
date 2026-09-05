import { useEffect, useState } from "react";
import "./App.css";

const API_BASE_URL =
  "https://enaam-web-scraping.onrender.com";

const API_URL =
  `${API_BASE_URL}/getdata`;

function App() {

  const [state, setState] = useState("");
  const [commodity, setCommodity] = useState("");

  const [states, setStates] = useState([]);
  const [commodities, setCommodities] = useState([]);

  const [results, setResults] = useState([]);

  const [loadingStates, setLoadingStates] =
    useState(true);

  const [loadingCommodities, setLoadingCommodities] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // LOAD STATES
  // =====================================================

  useEffect(() => {

    const loadStates = async () => {

      try {

        setLoadingStates(true);

        const response = await fetch(
          `${API_BASE_URL}/states`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
            "Failed to load states."
          );
        }

        setStates(result.data || []);

      } catch (err) {

        console.error(
          "States API Error:",
          err
        );

        setError(
          "Unable to load states. Please refresh the page."
        );

      } finally {

        setLoadingStates(false);

      }
    };

    loadStates();

  }, []);

  // =====================================================
  // LOAD COMMODITIES WHEN STATE CHANGES
  // =====================================================

  useEffect(() => {

    if (!state) {

      setCommodities([]);
      setCommodity("");

      return;
    }

    const loadCommodities = async () => {

      try {

        setLoadingCommodities(true);

        setCommodity("");
        setResults([]);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/commodities?state=${encodeURIComponent(
            state
          )}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
            "Failed to load commodities."
          );
        }

        setCommodities(result.data || []);

      } catch (err) {

        console.error(
          "Commodities API Error:",
          err
        );

        setCommodities([]);

        setError(
          "Unable to load commodities for this state."
        );

      } finally {

        setLoadingCommodities(false);

      }
    };

    loadCommodities();

  }, [state]);

  // =====================================================
  // SEARCH MANDI DATA
  // =====================================================

  const handleSearch = async (e) => {

    e.preventDefault();

    if (!state || !commodity) {

      setError(
        "Please select a state and commodity."
      );

      setResults([]);

      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {

      const response = await fetch(
        API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            state,
            commodity
          })
        }
      );

      const result =
        await response.json();

      if (!response.ok) {

        throw new Error(
          result.message ||
          "Failed to fetch data."
        );

      }

      setResults(
        result.data || []
      );

      if (
        !result.data ||
        result.data.length === 0
      ) {

        setError(
          "No mandi data found for this search."
        );

      }

    } catch (err) {

      console.error(
        "API Error:",
        err
      );

      setError(
        "Unable to fetch mandi data. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };

  // =====================================================
  // VALID PRICE CALCULATIONS
  // =====================================================

  const validMinPrices = results
    .map((item) =>
      Number(item["Min Price"])
    )
    .filter(
      (price) =>
        Number.isFinite(price) &&
        price >= 1
    );

  const validModalPrices = results
    .map((item) =>
      Number(item["Modal Price"])
    )
    .filter(
      (price) =>
        Number.isFinite(price) &&
        price >= 1
    );

  const validMaxPrices = results
    .map((item) =>
      Number(item["Max Price"])
    )
    .filter(
      (price) =>
        Number.isFinite(price) &&
        price >= 1
    );

  const lowestPrice =
    validMinPrices.length > 0
      ? Math.min(...validMinPrices)
      : "N/A";

  const averageModal =
    validModalPrices.length > 0
      ? Math.round(
          validModalPrices.reduce(
            (sum, price) =>
              sum + price,
            0
          ) /
            validModalPrices.length
        )
      : "N/A";

  const highestPrice =
    validMaxPrices.length > 0
      ? Math.max(...validMaxPrices)
      : "N/A";

  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="app">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="logo">
          🌾 <span>Mandi-Mitra</span>
        </div>

        <div className="nav-links">
          <a href="#home">
            Home
          </a>

          <a href="#markets">
            Markets
          </a>

          <a href="#about">
            About
          </a>
        </div>

      </nav>

      {/* ================= HERO ================= */}

      <section
        className="hero-section"
        id="home"
      >

        <div className="hero-content">

          <div className="badge">
            🇮🇳 Indian Agricultural Market Data
          </div>

          <h1>
            Know Your{" "}
            <span>Mandi Prices</span>
          </h1>

          <p>
            Search agricultural market prices
            across India using a simple and
            powerful dashboard.
          </p>

          {/* ================= SEARCH ================= */}

          <form
            className="search-card"
            onSubmit={handleSearch}
          >

            {/* STATE */}

            <div className="input-group">

              <label>
                STATE
              </label>

              <select
                value={state}
                onChange={(e) =>
                  setState(
                    e.target.value
                  )
                }
                disabled={loadingStates}
              >

                <option value="">
                  {loadingStates
                    ? "Loading states..."
                    : "Select State"}
                </option>

                {states.map(
                  (stateName) => (

                    <option
                      key={stateName}
                      value={stateName}
                    >
                      {stateName}
                    </option>

                  )
                )}

              </select>

            </div>

            {/* COMMODITY */}

            <div className="input-group">

              <label>
                COMMODITY
              </label>

              <select
                value={commodity}
                onChange={(e) =>
                  setCommodity(
                    e.target.value
                  )
                }
                disabled={
                  !state ||
                  loadingCommodities
                }
              >

                <option value="">

                  {!state
                    ? "Select state first"
                    : loadingCommodities
                    ? "Loading commodities..."
                    : "Select Commodity"}

                </option>

                {commodities.map(
                  (commodityName) => (

                    <option
                      key={commodityName}
                      value={commodityName}
                    >
                      {commodityName}
                    </option>

                  )
                )}

              </select>

            </div>

            {/* SEARCH BUTTON */}

            <button
              type="submit"
              className="search-button"
              disabled={
                loading ||
                !state ||
                !commodity
              }
            >

              {loading
                ? "Searching..."
                : "🔍 Search Prices"}

            </button>

          </form>

          {/* ERROR */}

          {error && (

            <div className="error-message">
              {error}
            </div>

          )}

        </div>

      </section>

      {/* ================= RESULTS ================= */}

      {results.length > 0 && (

        <section
          className="results-section"
        >

          <div className="results-header">

            <div>

              <p className="section-label">
                SEARCH RESULTS
              </p>

              <h2>
                {commodity} prices in{" "}
                {state}
              </h2>

              <p className="result-count">
                {results.length} mandi records
                found
              </p>

            </div>

          </div>

          {/* ================= SUMMARY ================= */}

          <div className="summary-grid">

            <div className="summary-card">

              <span>🏪</span>

              <div>

                <small>
                  MARKETS
                </small>

                <strong>
                  {results.length}
                </strong>

              </div>

            </div>

            <div className="summary-card">

              <span>📉</span>

              <div>

                <small>
                  LOWEST PRICE
                </small>

                <strong>

                  {lowestPrice === "N/A"
                    ? "N/A"
                    : `₹${lowestPrice}`}

                </strong>

              </div>

            </div>

            <div className="summary-card">

              <span>📊</span>

              <div>

                <small>
                  AVERAGE MODAL
                </small>

                <strong>

                  {averageModal === "N/A"
                    ? "N/A"
                    : `₹${averageModal}`}

                </strong>

              </div>

            </div>

            <div className="summary-card">

              <span>📈</span>

              <div>

                <small>
                  HIGHEST PRICE
                </small>

                <strong>

                  {highestPrice === "N/A"
                    ? "N/A"
                    : `₹${highestPrice}`}

                </strong>

              </div>

            </div>

          </div>

          {/* ================= TABLE ================= */}

          <div className="table-container">

            <div className="table-header">

              <h3>
                Market Price Details
              </h3>

              <span>
                {state}
              </span>

            </div>

            <div className="table-wrapper">

              <table>

                <thead>

                  <tr>

                    <th>#</th>

<th>
  MANDI / APMC
</th>

<th>
  DISTRICT
</th>

<th>
  COMMODITY
</th>

<th>
  MIN PRICE
</th>

<th>
  MODAL PRICE
</th>

<th>
  MAX PRICE
</th>

<th>
  ARRIVAL DATE
</th>
                  </tr>

                </thead>

                <tbody>

                  {results
                    .filter((item) => {

                      const min =
                        Number(
                          item["Min Price"]
                        );

                      const modal =
                        Number(
                          item["Modal Price"]
                        );

                      const max =
                        Number(
                          item["Max Price"]
                        );

                      return (
                        Number.isFinite(min) &&
                        Number.isFinite(modal) &&
                        Number.isFinite(max) &&
                        min >= 1 &&
                        modal >= 1 &&
                        max >= 1
                      );

                    })
                    .map(
                      (item, index) => (

                        <tr
                          key={index}
                        >

                          <td>
                            {index + 1}
                          </td>
<td className="mandi-name">

  🏪{" "}

  {item["APMC's"] ||
    "Unknown Mandi"}

</td>

<td>
  {item.District || "N/A"}
</td>

<td>
  {item.Commodity || "N/A"}
</td>

<td>
  ₹{item["Min Price"]}
</td>

<td className="modal-price">
  ₹{item["Modal Price"]}
</td>

<td>
  ₹{item["Max Price"]}
</td>

<td>
  {item["Arrival Date"] || "N/A"}
</td>
                        </tr>

                      )
                    )}

                </tbody>

              </table>

            </div>

          </div>

        </section>

      )}

      {/* ================= FEATURES ================= */}

      <section
        className="features"
        id="markets"
      >

        <div className="section-heading">

          <p>
            MARKET INSIGHTS
          </p>

          <h2>
            Everything you need to
            understand mandi prices
          </h2>

        </div>

        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              💰
            </div>

            <h3>
              Price Information
            </h3>

            <p>
              View minimum, modal and
              maximum prices for
              agricultural commodities.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              🏪
            </div>

            <h3>
              Mandi Details
            </h3>

            <p>
              Explore agricultural markets
              and APMC information across
              different states.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              📊
            </div>

            <h3>
              Market Analysis
            </h3>

            <p>
              Compare commodity prices
              between different agricultural
              markets.
            </p>

          </div>

        </div>

      </section>

      {/* ================= ABOUT ================= */}

      <section
        className="about"
        id="about"
      >

        <div>

          <p className="section-label">
            ABOUT MANDI-MITRA
          </p>

          <h2>
            Making agricultural market
            data easier to access.
          </h2>

          <p>
            Mandi-Mitra is a frontend
            dashboard designed to make
            government mandi-price data
            easier to search, understand
            and explore.
          </p>

          <p>
            The application communicates
            with a backend API that
            processes agricultural market
            data and provides it through
            a simple interface.
          </p>

        </div>

        <div className="about-card">

          <div className="about-icon">
            🌱
          </div>

          <h3>
            Built for India
          </h3>

          <p>
            Explore agricultural market
            information through a simple
            digital platform.
          </p>

        </div>

      </section>

       {/* ================= FOOTER ================= */}

      <footer className="site-footer">

        <div className="footer-content">

          <div className="footer-brand">
            <h3>🌾 Mandi-Mitra</h3>

            <p>
              Built & Developed by <strong>Aaryan Kumar</strong>
            </p>
          </div>

          <div className="footer-links">

            <a
              href="https://www.linkedin.com/in/aaryan-k-ba3985246/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>

            <span>•</span>

            <a
              href="https://github.com/9aaryanCyberH"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

            <span>•</span>

            <a
              href="https://drive.google.com/file/d/1BrrYb8FwXAVyU6mplO27FitPqQi9Lv7F/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>

          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 Aaryan Kumar · Mandi-Mitra</p>
        </div>

      </footer>

    </div>
  );
}

export default App;