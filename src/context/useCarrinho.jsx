/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import app from "../Firebase/firebase";
const CarrinhoContext = createContext();

export function useCarrinho() {
  return useContext(CarrinhoContext);
}

// eslint-disable-next-line react/prop-types
export function CarrinhoProvider({ children }) {
  const db = getFirestore(app);
  const [userId, setUserId] = useState(null);
  const [cart, setCart] = useState([]);
  const [tempProducts, setTempProducts] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const saveUserData = async (data) => {
    try {
      const phoneNumber = data.telefone;

      const userQuery = query(
        collection(db, "Usuarios"),
        where("telefone", "==", phoneNumber)
      );
      const userQuerySnapshot = await getDocs(userQuery);

      if (userQuerySnapshot.empty) {
        const docRef = await addDoc(collection(db, "Usuarios"), data);
        const newUserId = docRef.id;
        setUserId(newUserId);
      } else {
        userQuerySnapshot.forEach((userDoc) => {
          updateDoc(doc(db, "Usuarios", userDoc.id), {
            nome: data.nome,
            cep: data.cep,
            rua: data.rua,
            casaApto: data.casaApto,
            complemento: data.complemento,
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,
          });

          const updatedUserId = userDoc.id;
          setUserId(updatedUserId);
        });
      }

      const userData = {
        nome: data.nome,
        cep: data.cep,
        rua: data.rua,
        casaApto: data.casaApto,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
      };

      sendOrder(userData);
    } catch (error) {
      console.error("Erro ao salvar/atualizar os dados do usuário: ", error);
    }
  };

  // ...

  const saveCartToSessionStorage = (cart) => {
    sessionStorage.setItem("itensSelecionados", JSON.stringify(cart));
  };

  const isSameCartItem = (item1, item2) => {
    if (!item1 || !item2) {
      return false;
    }
    return (
      item1.id === item2.id &&
      item1.opicionais === item2.opicionais &&
      item1.refrigeranteDoCombo === item2.refrigeranteDoCombo &&
      item1.observacao === item2.observacao &&
      item1.valor === item2.valor &&
      areAdditionalsSame(item1.adicionais, item2.adicionais)
    );
  };

  const areAdditionalsSame = (additionals1, additionals2) => {
    if (!additionals1 || !additionals2) {
      return false;
    }

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
    if (isAlertOpen) {
      let updatedCart = [...cart];
      let itemExists = false;

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

      if (!itemExists) {
        const numeroPedido = generateUniqueOrderNumber();
        updatedCart.push({
          ...item,
          quantidade: 1,
          numeroPedido,
        });
      }

      setCart(updatedCart);
      saveCartToSessionStorage(updatedCart);
      // Adicione o item aos produtos temporários
      setTempProducts((prevProducts) => [...prevProducts, item]);
    } else {
      console.log(
        "Não é possível adicionar itens ao carrinho, o estabelecimento está fechado."
      );
    }
  };

  function generateUniqueOrderNumber() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    const orderNumber = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;

    return orderNumber;
  }

  const sendOrder = async () => {
    if (tempProducts.length > 0) {
      try {
        let orderNumber = generateUniqueOrderNumber();

        if (userId) {
          const orderPath = `Usuarios/${userId}/Pedidos/${orderNumber}`;

          const orderDocRef = doc(db, orderPath);
          const orderDocSnapshot = await getDoc(orderDocRef);

          if (!orderDocSnapshot.exists()) {
            await setDoc(orderDocRef, {
              produtos: tempProducts,
              dataPedido: new Date(),
            });
          } else {
            const existingProducts = orderDocSnapshot.data().produtos || [];
            const combinedProducts = [...existingProducts, ...tempProducts];
            await updateDoc(orderDocRef, {
              produtos: combinedProducts,
            });
          }
        } else {
          localStorage.setItem("tempProducts", JSON.stringify(tempProducts));
        }

        setTempProducts([]);
        console.log("Pedido enviado com sucesso.");
      } catch (error) {
        console.error("Erro ao enviar o pedido: ", error);
      }
    }

    clearCart();
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
        const valorTotalItem =
          (item.valor + valorAdicionais + item.valorSelecionado) * qtd;
        subtotal += valorTotalItem;
      }
    });

    return subtotal;
  };

  const clearCart = () => {
    setCart([]);

    sessionStorage.removeItem("itensSelecionados");
  };

  const openingHours = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const openingTime = 0;
    const closingTime = 23;

    if (
      (currentHour > openingTime ||
        (currentHour === openingTime && currentMinute >= 0)) &&
      (currentHour < closingTime ||
        (currentHour === closingTime && currentMinute <= 59))
    ) {
      setIsAlertOpen(true);
    } else {
      setIsAlertOpen(false);
    }
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };
  useEffect(() => {
    openingHours();
  }, []);

  return (
    <CarrinhoContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        openingHours,
        handleCloseAlert,
        saveUserData,
        isAlertOpen,
        userId,
        sendOrder,
        db,
        setIsAlertOpen,
        clearCart,
        deleteFromCart,
        removeQuantityFromCart,
        calculateSubtotal,
        isSameCartItem,
        saveCartToSessionStorage,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
