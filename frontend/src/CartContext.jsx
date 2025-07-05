import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export default function CartProvider({ children }) {
    
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const removeFromCart = (id) => {
    setCartItems(prev => {
      return prev.filter(item => item.id !== id);
    });
  };

  const increment = (id) => {
    setCartItems(prev =>
        prev.map(item =>
            item.id == id
            ? { ...item,quantity: item.quantity + 1}
            : item
        )
    );
  };

    const decrement = (id) => {
    setCartItems(prev =>
        prev.flatMap(item => {
        if (item.id === id) {
            if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
            }
            // If quantity is 1, remove the item completely
            return [];
        }
        return item;
        })
    );
    };

  return (
    <CartContext.Provider value={{ 
        cartItems,
        addToCart,
        removeFromCart,
        increment,
        decrement
        }}>
        {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);