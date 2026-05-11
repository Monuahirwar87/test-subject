import React, { useContext, useState, useRef, useEffect } from 'react';
import { NewsContext } from '../../Context/NewsProvider';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
  const { updateApiUrl, setNewsData, setHeadlines } = useContext(NewsContext);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [linkActive, setLinkActive] = useState("/");
  const apiKey = import.meta.env.VITE_NEWS_API_KEY; // Correct way to access environment variables in Vite
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    setLinkActive(location.pathname);
  }, [location]);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navbarRef = useRef(null);

  const updateURL = () => {
    if (input) {
      setNewsData([]);
      setHeadlines(input);
      const url = `https://gnews.io/api/v4/search?q=${input}&lang=en&max=10&page=1&apikey=${apiKey}`;
      updateApiUrl(url);
      navigate(`/${input}`);
      setInput("");
      closeNavbar();
    }
  };

  const handleCategoryClick = (category) => {
    setHeadlines(category);
    setNewsData([]);
    const url = `https://gnews.io/api/v4/search?q=${category.toLowerCase()}&lang=en&max=10&page=1&apikey=${apiKey}`;
    updateApiUrl(url);
    navigate(`/${category.toLowerCase()}`);
    closeNavbar();
  };

  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  const closeNavbar = () => {
    const navbar = navbarRef.current;
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  };

  const categories = ["Technology", "Business", "Entertainment", "Health", "Science", "Sports"];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link to={"/"} onClick={() => handleCategoryClick("india")} className="navbar-brand" style={{ fontWeight: "600", letterSpacing: "1px" }}>Kite News</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={navbarRef}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {categories.map((category) => (
              <li className="nav-item" key={category}>
                <Link
                  to={`/${category.toLowerCase()}`}
                  className={`nav-link ${linkActive === `/${category.toLowerCase()}` ? "text-light" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(category);
                  }}
                >
                  {category}
                </Link>
              </li>
            ))}
            <li className="nav-item">
              <Link
                to="/saved"
                className={`nav-link ${linkActive === "/saved" ? "text-light fw-bold" : ""}`}
                onClick={closeNavbar}
              >
                Saved Articles
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center me-3 mb-2 mb-lg-0">
            <button 
              className="btn text-light d-flex align-items-center justify-content-center p-2 rounded-circle" 
              style={{ width: "36px", height: "36px", background: "rgba(255,255,255,0.1)", border: "none" }}
              type="button" 
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-moon-fill" viewBox="0 0 16 16">
                  <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-sun-fill" viewBox="0 0 16 16">
                  <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                </svg>
              )}
            </button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); updateURL(); }} className="d-flex" role="search">
            <input
              onKeyDown={handleKeyDown}
              onChange={(e) => setInput(e.target.value)}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={input}
            />
            <button className="btn btn-outline-light" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
