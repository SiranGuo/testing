import './Gallery.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePageBottom from './usePageBottom';
import { FaShoppingCart } from 'react-icons/fa'; 

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const atBottom = usePageBottom();
  
  // const [searchParams, setSearchParams] = useSearchParams();
  // const currentPage = parseInt(searchParams.get('page')) || 1;
  // const itemsPerPage = 10;

  const navigate = useNavigate();
  const location = useLocation();

  const sortItemsId = useMemo(() => {
    return [...items].sort((a, b) => a.id - b.id);
  }, [items]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);


  // const totalPages = Math.ceil(sortItemsId.length / itemsPerPage);

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = sortItemsId.slice(indexOfFirstItem, indexOfLastItem);

  // const goToPage = (page) => {
  //   if (page >= 1 && page <= totalPages) {
  //     setSearchParams({ page: page.toString() });
  //     navigate(`${location.pathname}?page=${page}`);
  //   }
  // };

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }, [currentPage]);
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error loading products</div>;

  return (
    <div>
      <div className="gallery">
        {items.sort((a, b) => a.id - b.id).map(item => (
          <Link to={`/products/${item.id}`} key={item.id} className="card-link">
            <div className="card">
              <div
                className="square"
                style={
                  item.imageURL
                    ? {
                        backgroundImage: `url(${item.imageURL})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }
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
      {/* {atBottom && (
        <div className="pagination">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )} */}
    </div>
  );
}