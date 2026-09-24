import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { UserContext } from "./userContext";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Quiz from "./components/Quiz";
import Leaderboard from "./components/Leaderboard";

import './App.css'; 

function App() {
  const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
  const [theme, setTheme] = useState(localStorage.theme || 'light');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const updateUserData = (userInfo) => {
    if (userInfo) {
      localStorage.setItem("user", JSON.stringify(userInfo)); 
    } else {
      localStorage.removeItem("user");
    }
    setUser(userInfo); 
  };

  const handleLogout = () => {
    updateUserData(null);
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user: user, setUserContext: updateUserData }}>
        <div className="App">
          
          <div className="navbar">
            <h2 style={{ margin: 0 }}>
              <Link to="/" className="navbar-logo">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 7-10-4-10 4 10 4z" />
                  <path d="M6 10v6c0 2.2 4 4 6 4s6-1.8 6-4v-6" />
                  <path d="M20 7v7" />
                </svg>
                QuizApp
              </Link>
            </h2>
            
            <div className="navbar-links">
              {/* НОВАЯ КНОПКА QUIZ В НАВБАРЕ */}
              <Link to="/" style={{display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontWeight: '700', color: 'var(--text-main)'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                Quiz
              </Link>

              <button onClick={toggleTheme} className="theme-toggle-btn" title="Toggle Dark/Light Mode">
                {theme === 'light' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.72" x2="5.64" y2="18.3"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                )}
              </button>

              <Link to="/leaderboard" style={{color: '#f39c12', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontWeight: '700'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f39c12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
                Leaderboard
              </Link>
              
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                    <Link to="/profile" style={{textDecoration: 'none', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px'}}>
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--text-main)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      Profile
                    </Link>
                    <span style={{ margin: 0, color: 'var(--text-muted)', fontSize: '15px' }}>
                        Welcome, <b style={{color: 'var(--primary-color)'}}>{user.username || user.user?.username || "Player"}</b>!
                    </span>
                    <button className="btn-primary" onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Link to="/login" style={{textDecoration: 'none', fontWeight: '700', color: 'var(--text-main)'}}>Login</Link>
                    <Link to="/register" className="btn-primary" style={{color: 'white', textDecoration: 'none'}}>Register</Link>
                </div>
              )}
            </div>
          </div>

          <div style={{ padding: '0 20px', paddingBottom: '40px' }}>
            <Routes>
              <Route path="/" element={<Quiz />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </div>

        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;