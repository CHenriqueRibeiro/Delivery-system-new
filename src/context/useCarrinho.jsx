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

  const isSameCartItem = (item1, item2) => {

    return (
      item1.id === item2.id &&
      item1.opcionais === item2.opcionais && // Correção aqui
      item1.refrigeranteDoCombo === item2.refrigeranteDoCombo &&
      item1.observacao === item2.observacao &&
      areAdditionalsSame(item1.adicionais, item2.adicionais)
    );
    };
  
  const areAdditionalsSame = (additionals1, additionals2) => {
    if (additionals1.length !== additionals2.length) {
      return false;
    }
  
    for (let i = 0; i < additionals1.length; i++) {
      if (
        additionals1[i].name !== additionals2[i].name ||
        additionals1[i].qtde !== additionals2[i].qtde
      ) {
        return false;
      }
    }
  
    return true;
  };
  
  const addToCart = (item) => {
    let updatedCart = [...cart];
    let itemExists = false;
  
    // Percorra o carrinho para verificar se um item semelhante já existe
    updatedCart = updatedCart.map((cartItem) => {
      if (isSameCartItem(cartItem, item)) {
        itemExists = true;
        return {
          ...cartItem,
          quantidade: cartItem.quantidade + 1,
        };
      }
      return cartItem;
    });
  
    // Se o item não existe, adicione-o ao carrinho com quantidade 1
    if (!itemExists) {
      updatedCart.push({
        ...item,
        quantidade: 1,
      });
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
    const updatedCart = cart.filter(
      (itemCart) => JSON.stringify(itemCart) !== JSON.stringify(item)
    );
    setCart(updatedCart);
    saveCartToSessionStorage(updatedCart);
  };

  const calculateSubtotal = (cart) => {
    let subtotal = 0;

    cart?.map((item) => {
      const qtd = item.quantidade;
      let valorAdicionais = 0;

      if (item.adicionais && item.adicionais.length > 0) {
        valorAdicionais = item.adicionais.reduce((total, adicional) => {
          return total + adicional.valor * adicional.qtde;
        }, 0);
      }

      if (qtd > 0) {
        const valorTotalItem = (item.valor + valorAdicionais) * qtd;
        subtotal += valorTotalItem;
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
