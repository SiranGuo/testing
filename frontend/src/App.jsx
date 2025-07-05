import Gallery from './Gallery';
import Navbar from './Navbar';
import ProductDetails from './ProductDetails.jsx';
import bg from './images/background.jpg';
import CategoryPage from './CategoryPage.jsx';
import ShoppingCart from './ShoppingCart.jsx';
import {  Routes, Route} from 'react-router-dom';

function App() {
  const containerStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // ensures full-height background even if gallery is shorter
  };

return (
  <div style={containerStyle}>
    <Navbar />
    <Routes>
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/*" element={<Gallery />}> </Route>
      <Route path="/ShoppingCart" element={<ShoppingCart />} />
    </Routes>
  </div>
);
}

export default App;

