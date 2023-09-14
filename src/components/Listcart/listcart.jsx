// eslint-disable-next-line no-unused-vars
import * as React from "react";
import cartContext from '../../context/cartContext'
import Card from "../Cart/cart";
import styles from "./listcart.css";

export default function ListCart() {
  const ctx = React.useContext(cartContext)
  let valorTotal = 0;
 
 
 /* {listItemsCart.map((item, index) => ( 
             
  <Card
    key={index}
    imageUrl={item.imageUrl}
    flavor={item.flavor}
    price={item.price}
    ingredients={item.ingredients}
  />
))}*/


  return (
    <>
      <div id="cartShoppingList" /*O conteudo dessa div é a lista com os cards do carrinho --*/>

        <div className="listCardCart" /*O conteudo dessa div é onde faz o overflow: scroll dos cards do carrinho --*/>

          <div className="teste"  /*O conteudo dessa div é onde faz o uma margem entre os  dos cards do carrinho --*/>
            
            {
              ctx.kart.map((item, idx) => {
                valorTotal += item.valor;
                return (<Card
                  imageUrl={item.imagem}
                  key={item.id}
                  flavor={item.sabor}
                  ingredients={item.ingredientes}
                  price={item.valor}
                  arrayPosition={idx}
                  cardClass={styles.displayCart}
                />)
              })
            }
            
          </div>

        </div>

        <div className="cartSum"  /*O conteudo dessa div é onde fica o total da compra --*/>

          <span className="sumPriceCart "  /*Estilização do total da compra --*/>
            Total : R$ {valorTotal}
          </span>

        </div>

      </div>
    </>
  );
}
