import { useCart } from './CartContext';
import { FaTrashCan } from 'react-icons/fa6';

export default function ShoppingCart() {
  const { 
    cartItems, 
    removeFromCart,
    increment,
    decrement
  } = useCart();

  return (
    <div className="checkout-page">
      <h1 >
        Cart
      </h1>

      {cartItems.length === 0
        ? <p className="empty-message">Your cart is empty.</p>
        : (
          <ul className="cart-items">
            {cartItems.map((item) => (
              
              <li key={item.id}>
                <div className="cart-item-info">

                  <span className = "cart-info">{item.name} - {item.price}</span>
                  <div className="quantity-controls">
                    <button onClick={() => decrement(item.id)}>-</button>
                    <input type="text" value={item.quantity} readOnly />
                    <button onClick={() => increment(item.id)}>+</button>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}>
                  <FaTrashCan size = '24'/>
                </button>
              </li>
            ))}
          </ul>
        )
      }
      <p className = "contact-info"> 📩 下单请加微信：BYESEEbaixi</p>
    </div>
  );
}