import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import footerImage from './assets/images/footer.png';
import EnglishPage from './components/EnglishPage';
import ArabicPage from './components/ArabicPage';
import DataPage from './components/DataPage';
import Dial from './components/Dial';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLanguageToggle = (e) => {
    if (e.target.checked) {
      navigate('/ar');
    } else {
      navigate('/en');
    }
  };

  const scrollToRSVP = () => {
    // Scroll to RSVP section; adjust selector as needed
    document.querySelector('#rsvp-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Determine the dial text based on the current path
  const isArabic = location.pathname === '/ar'; // Check if the current page is Arabic
  const dialText = location.pathname === '/ar' ? 'عربي' : 'EN';
  const rsvpText = location.pathname === '/ar' ? 'تأكيد الحضور  ' : 'RSVP  ';

  // Conditionally render the header based on the route
  const showHeader = location.pathname !== '/data';

  return (
    <div className="App">
      {showHeader && (
        <header>
          <div className="navbar">
            <button 
              onClick={scrollToRSVP} 
              className="rsvp-button"
              style={{ fontFamily: isArabic ? 'El Messiri, serif' : 'Italiana, serif', padding: isArabic ? '5px 20px' : '10px 20px' }}>
              {rsvpText}
              <i className="fas fa-chevron-down"></i>
            </button>
            <div className="language-switch">
              <input
                type="checkbox"
                id="toggle-switch"
                onChange={handleLanguageToggle}
                checked={location.pathname === '/ar'}
              />
              <label className="switch" htmlFor="toggle-switch">
                <Dial text={dialText} />
              </label>
            </div>
          </div>
        </header>
      )}
      <Routes>
        <Route path="/en" element={<EnglishPage />} />
        <Route path="/ar" element={<ArabicPage />} />
        <Route path="/data" element={<DataPage />} />
        <Route path="*" element={<Navigate to="/en" />} />
      </Routes>
      <footer>
        <div className="footer-content">
          <img src={footerImage} alt="Footer Image" className="footer-image" />
        </div>
      </footer>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
