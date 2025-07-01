import { Link } from 'react-router-dom';
import { useState } from 'react';
import categories from './data/categories';


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setOpen(false); // Close the menu on mobile devices
    }
  };
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">全部产品</Link>
      </div>

      <button
        className="mobile-toggle"
        onClick={() => setOpen(prev => !prev)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {categories.map(cat => (
          <li key={cat}>
            <Link to={`/category/${encodeURIComponent(cat)}`} onClick={handleLinkClick}>
              {cat}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}