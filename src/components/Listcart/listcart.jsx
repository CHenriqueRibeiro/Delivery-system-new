// eslint-disable-next-line no-unused-vars
import * as React from "react";
import Cart from "../Cart/cart";
import "./listcart.css";

export default function listCart() {

  /*Array com os produtos do carrinho--*/
  const listItemsCart = [
    {
      id: 1,
      imageUrl:
        "https://img1.gratispng.com/20180202/qrq/kisspng-sicilian-pizza-italian-cuisine-pepperoni-tarte-fla-pepperoni-pizza-5a74bcc6c6e634.1018048315175999428147.jpg",
      flavor: "Pizza Mista",
      ingredients: "Calabresa, Queijo, Mussarela, Orégano",
      price: 19.99,
    },
    {
      id: 2,
      imageUrl:
        "https://img1.gratispng.com/20180202/qrq/kisspng-sicilian-pizza-italian-cuisine-pepperoni-tarte-fla-pepperoni-pizza-5a74bcc6c6e634.1018048315175999428147.jpg",
      flavor: "Pizza Calabresa",
      ingredients: "Calabresa, Queijo, Mussarela, Orégano",
      price: 19.99,
    },
    {
      id: 3,
      imageUrl:
        "https://img1.gratispng.com/20180202/qrq/kisspng-sicilian-pizza-italian-cuisine-pepperoni-tarte-fla-pepperoni-pizza-5a74bcc6c6e634.1018048315175999428147.jpg",
      flavor: "Pizza Mussarela",
      ingredients: "Calabresa, Queijo, Mussarela, Orégano",
      price: 19.99,
    },
    {
      id: 3,
      imageUrl:
        "https://img1.gratispng.com/20180202/qrq/kisspng-sicilian-pizza-italian-cuisine-pepperoni-tarte-fla-pepperoni-pizza-5a74bcc6c6e634.1018048315175999428147.jpg",
      flavor: "Pizza Mussarela",
      ingredients: "Calabresa, Queijo, Mussarela, Orégano",
      price: 19.99,
    },
  ];
  /*Array com os produtos do carrinho--*/


  return (
    <>
      <div id="cartShoppingList" /*O conteudo dessa div é a lista com os cards do carrinho --*/>

        <div className="listCardCart" /*O conteudo dessa div é onde faz o overflow: scroll dos cards do carrinho --*/>

          <div className="teste"  /*O conteudo dessa div é onde faz o uma margem entre os  dos cards do carrinho --*/>
            
            {listItemsCart.map((item, index) => ( /* onde e usado os itens da lista para alimentar o card com as infomaçoes do produto*/
              <Cart
                key={index}
                imageUrl={item.imageUrl}
                flavor={item.flavor}
                price={item.price}
                ingredients={item.ingredients}
              />
            ))}

          </div>

        </div>

        <div className="cartSum"  /*O conteudo dessa div é onde fica o total da compra --*/>

          <span className="sumPriceCart "  /*Estilização do total da compra --*/>
            Total : R$ 50,00
          </span>

        </div>

      </div>
    </>
  );
}
