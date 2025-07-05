import './Gallery.css';
import React, { useState, useEffect, useContext} from 'react';
import { Slide } from 'react-slideshow-image';
import { useParams } from 'react-router-dom';
import 'react-slideshow-image/dist/styles.css';
import { useCart } from './CartContext';

function renderBoldText(line) {
  const parts = [];
  const regex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0, match, key = 0;

  while ((match = regex.exec(line)) !== null) {
    parts.push(line.slice(lastIndex, match.index));
    parts.push(<strong key={key++}>{match[1]}</strong>);
    lastIndex = regex.lastIndex;
  }
  parts.push(line.slice(lastIndex));
  return parts;
}


export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [ isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const handleAdd = () => {
    setIsAdded(true)
    addToCart(product);
    
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`);
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        console.log('Slides for product:', data.slides);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
    
  }, [id]);
  if (loading) return <p>Loading product…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product || !product.slides?.length) return <div>Product not found or no images available</div>;
  const details = product.details.replace(/\\n/g, '\n');
  return (
    <div className="product-details-container">
      {/* Slideshow Section */}
      <div className="slideshow-wrapper">
        <Slide
          duration={3000}
          transitionDuration={500}
          autoplay={true}
          arrows={true}
          indicators={true}
          dragging={true}
        >
          {product.slides.map((src, idx) => (
            <div key={idx} className="each-slide">
              <img
                src={src}
                alt={`${product.name} slide ${idx + 1}`}
                className="slide-image"
              />
            </div>
          ))}
        </Slide>
      </div>

      <div className="product-container">
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div className="product-line">
            <p className="price">{product.price}</p>
            <button 
              className={`add-to-cart ${isAdded ? 'added' : ''}`} 
              onClick={handleAdd}
              disabled = {isAdded}>
              {isAdded ? 'Added' : 'Add to Cart'}
            </button>
          </div>
        </div>

        <div className="product-details-header">DETAILS</div>

        <div className="product-extra-description">
          {details
            .split(/\r?\n/)
            .filter(Boolean)
            .map((line, i) =>
              line.startsWith('- ') ? (
                <ul key={i}><li>{renderBoldText(line.slice(2))}</li></ul>
              ) : (
                <p key={i}>{renderBoldText(line)}</p>
              )
            )}
        </div>
      </div>
    </div>
    
  );

}