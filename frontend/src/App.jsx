import Gallery from './Gallery';
import Navbar from './Navbar';
import ProductDetails from './ProductDetails.jsx';
import bg from './images/background.jpg';
import { BrowserRouter, Routes, Route, Outlet, Navigate} from 'react-router-dom';
import CategoryPage from './CategoryPage.jsx';

function ProductsLayout() {
  return (
    <>
      <Outlet /> {/* renders either Gallery or ProductDetails */}
    </>
  );
}

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
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/category/:name" element={<CategoryPage />} />
      <Route path="/products/*" element={<ProductsLayout />}>
        <Route index element={<Gallery />} />
        <Route path=":id" element={<ProductDetails />} />
      </Route>
    </Routes>
  </div>
);
}

export default App;

