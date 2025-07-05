import { Link } from 'react-router-dom';
import { useState } from 'react';
import categories from './data/categories';
import { FaShoppingCart } from 'react-icons/fa'; 


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
      
      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {categories.map(cat => (
          <li key={cat}>
            <Link to={`/category/${encodeURIComponent(cat)}`} onClick={handleLinkClick}>
              {cat}
            </Link>
          </li>
        ))}
      </ul>

      <button className="shopping-cart">
        <Link to="/ShoppingCart" onClick={handleLinkClick}>
          <FaShoppingCart size={24} />
        </Link>
      </button>

      <button
        className="mobile-toggle"
        onClick={() => setOpen(prev => !prev)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
    </nav>
  );
}