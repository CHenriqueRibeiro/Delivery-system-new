// eslint-disable-next-line no-unused-vars
import { useContext } from 'react';
// import cartContext from '../../context/cartContext';
import './listcart.css';

export default function ListCart() {
  // const ctx = useContext(cartContext);
  let valorTotal = 0;

  return (
    <>
      <div id="cartShoppingList">
        <div className="listCardCart">
          <div className="teste">
            {/* {ctx.kart.map((item, idx) => {
              valorTotal += item.valor;
              return (
                <Card
                  imageUrl={item.imagem}
                  key={item.id}
                  flavor={item.sabor}
                  ingredients={item.ingredientes}
                  price={item.valor}
                  arrayPosition={idx}
                />
              );
            })} */}
          </div>
        </div>

        <div className="cartSum">
          <span className="sumPriceCart ">
            Total : R$ {valorTotal}
          </span>
        </div>
      </div>
    </>
  );
}
