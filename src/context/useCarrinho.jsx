/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const CarrinhoContext = createContext();

export function useCarrinho() {
  return useContext(CarrinhoContext);
}

// eslint-disable-next-line react/prop-types
export function CarrinhoProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(
      (c) => c.id === item.id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantidade += 1;
      calculateSubtotal();
      setCart(updatedCart);
    } else {
      const newItem = { ...item, quantidade: 1 };
      setCart([...cart, newItem]);
    }
  };

  const removeQuantityFromCart = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId.id && item.quantidade > 1) {
        return { ...item, quantidade: item.quantidade - 1 };
      }

      return item;
    });

    setCart(updatedCart);
  };

  const deleteFromCart = (itemId) => {
    const updatedCart = cart.filter(
      (item) => item.id !== itemId
    );
    setCart(updatedCart);
  };

  const calculateSubtotal = (cart) => {
    let subtotal = 0;

    cart?.map((item) => {
      const qtd = item.quantidade;
      if (qtd > 0) {
        subtotal += item.valor * qtd;
      }
    });

    return subtotal;
  };

  return (
    <CarrinhoContext.Provider
      value={{
        cart,
        addToCart,
        deleteFromCart,
        removeQuantityFromCart,
        calculateSubtotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
