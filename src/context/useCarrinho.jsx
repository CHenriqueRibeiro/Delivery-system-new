/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const CarrinhoContext = createContext();

export function useCarrinho() {
  return useContext(CarrinhoContext);
}

// eslint-disable-next-line react/prop-types
export function CarrinhoProvider({ children }) {
  const [cart, setCart] = useState([]);

  const saveCartToSessionStorage = (cart) => {
    sessionStorage.setItem("itensSelecionados", JSON.stringify(cart));
  };

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex((c) => c.id === item.id);
    let updatedCart = [];

    if (existingItemIndex !== -1) {
      updatedCart = [...cart];

      if(
          updatedCart[existingItemIndex].adicionais.toString() !== item.adicionais.toString() ||
          updatedCart[existingItemIndex].bordaSelecionada !== item.bordaSelecionada ||
          updatedCart[existingItemIndex].refrigeranteDoCombo !== item.refrigeranteDoCombo
        )
          updatedCart.push(item);
        else 
          updatedCart[existingItemIndex].quantidade += 1;
      
      calculateSubtotal(updatedCart);
    } else {
      const newItem = { ...item, quantidade: 1 };
      updatedCart = [...cart, newItem];
    }

    setCart(updatedCart);
    saveCartToSessionStorage(updatedCart);
  };

  const removeQuantityFromCart = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId.id && item.quantidade > 1) {
        return { ...item, quantidade: item.quantidade - 1 };
      }

      return item;
    });

    setCart(updatedCart);
    saveCartToSessionStorage(updatedCart);
  };

  const deleteFromCart = (item) => {
    const updatedCart = cart.filter((itemCart) => JSON.stringify(itemCart) !== JSON.stringify(item));
    setCart(updatedCart);
    saveCartToSessionStorage(updatedCart);
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
        saveCartToSessionStorage,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}