import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import { useParams } from 'react-router-dom';
import 'react-slideshow-image/dist/styles.css';


export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
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

      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="price">{product.price}</p>
      </div>
            <div className="product-extra-description">
        {details
          .split(/\r?\n/)
          .filter(Boolean) // removes empty lines, optional
          .map((line, i) => {
            if (line.startsWith('- ')) {
              return (
                <ul key={i}>
                  <li>{line.slice(2)}</li>
                </ul>
              );
            }
            return <p key={i}>{line}</p>;
        })}
      </div>
    </div>
    
  );

}