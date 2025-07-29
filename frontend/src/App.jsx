import Gallery from './Gallery';
import Navbar from './Navbar';
import ProductDetails from './ProductDetails.jsx';
import bg from './images/background.jpg';
import CategoryPage from './CategoryPage.jsx';
import ShoppingCart from './ShoppingCart.jsx';
import {  Routes, Route} from 'react-router-dom';
import { useScrollRestoration } from './hooks';

function ScrollRestorationWrapper({ children }) {
  useScrollRestoration();
  return children;
}

function App() {
  const containerStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <ScrollRestorationWrapper>
      <div style={containerStyle}>
        <Navbar />
        <Routes>
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/" element={<Gallery />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />
        </Routes>
      </div>
    </ScrollRestorationWrapper>
  );
}

export default App;

