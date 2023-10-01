/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const CarrinhoContext = createContext();

export function useCarrinho() {
  return useContext(CarrinhoContext);
}

// eslint-disable-next-line react/prop-types
export function CarrinhoProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addInCart(item) {
    const newCart = [...cart, item];
    setCart(newCart);
    console.log(newCart, 'new cart');

    // sumQtdItems();
  }

  const deleteFromCart = (itemId) => {
    const updatedCart = cart.filter(
      (item) => item.id !== itemId
    );
    setCart(updatedCart);
    console.log(updatedCart, 'delete item');
  };

  // const sumQtdItems = () => {
  //   const qtdItems = cart.length + 1;
  // };

  const sumValueItems = () => {
    let initialValue = 0;
    cart.map((item) => {
      initialValue += item.valor;
    });
    return initialValue;
  };

  return (
    <CarrinhoContext.Provider
      value={{
        cart,
        addInCart,
        sumValueItems,
        // sumQtdItems,
        deleteFromCart,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
