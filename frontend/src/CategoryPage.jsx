import { useParams } from 'react-router-dom';
import { useState, useEffect, useMemo} from 'react';
import { Link } from 'react-router-dom';

export default function CategoryPage() {
  const { category } = useParams(); // e.g. "electronics"
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sortItemsId = useMemo (() => {
    return items.sort((a, b) => a.id - b.id); 
  } , [items]);

  useEffect(() => {
    async function fetchCategory() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/category/${encodeURIComponent(category)}`);
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const data = await res.json();
        setItems(data);

        console.log('Fetched products:', data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCategory();
  }, [category]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!items.length) return <p>No products found in “{category}”.</p>;

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