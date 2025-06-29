import React from 'react';
import './Gallery.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMemo }   from 'react';



export default function Gallery() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const sortItemsId = useMemo (() => {
    return items.sort((a, b) => a.id - b.id); 
  } , [items]);

  useEffect (() => {

    async function fetchItems() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  // loading and error handling
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  if (error) {
    return <div className="error">Error loading products</div>;
  }


  return (
    
    <div className="gallery">
      {sortItemsId.map(item => (
        <Link
          to={`/products/${item.id}`}
          key={item.id}
          className="card-link"
        >
          <div className="card">
            <div
              className="square"
              style={
              item.imageURL
                ? { 
                  backgroundImage: `url(${item.imageURL})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center' }
                : {}
              }
            />
            <div className="name">{item.name}</div>
            <div className="description">{item.description}</div>
            <div className="price">{item.price}</div>
          </div>
        </Link>
      ))}
    </div>
  );



  
}