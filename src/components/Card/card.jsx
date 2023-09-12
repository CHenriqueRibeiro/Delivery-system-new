// eslint-disable-next-line no-unused-vars
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import cartContext from "./../../context/cartContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BottomNavigation from "@mui/material/BottomNavigationAction";
import "./card.css";

export default function MediaControlCard(props) {
  /*---Props dos Card--*/
  MediaControlCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    flavor: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  };
  /*---Props dos Card--*/

  /*--useState usada na quantidade do contador--*/
  const [quantity, setQuantity] = React.useState(0);
  const cart = React.useContext(cartContext);

  /*--Funcão para incrementar um valor no contador e para colocar um numero no icone do carrinho no footer--*/
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    cart.setKart(cart.kart + 1);
  };

  /*--Funcão para decrementar um valor no contador e para colocar um numero no icone do carrinho no footer--*/
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      cart.setKart(cart.kart - 1);
    }
  };

  return (

    <Card className="card" /*---Componente Card  principal--*/>

      <Box className="cardDescription" /*---Conteudo do card  principal--*/>

        <CardMedia /*---Imagem do card--*/
          component="img"
          src={props.imageUrl}
          alt={props.flavor} 
        />

        <CardContent className="contentCard" /*---(Sabor, ingrediente, preco) do Card principal-*/>

          <Typography  variant="h6" /*---Sabor Do Produto-*/>
            {props.flavor}
          </Typography>

          <Typography variant="subtitle2" color="text.secondary"  /*---Ingredientes Do Produto-*/ >
            {props.ingredients}
          </Typography>

          <Typography  variant="h6" /*---Preço Do Produto-*/>
            R$ {props.price}
          </Typography>

          <div className="quantity-control" /*--- div dos botoes Quantidade de produtos-*/>
            
            <button className="btnquantity" onClick={decreaseQuantity} /*---Botao de decremento de produto-*/>
              -
            </button>

            <span id="quantitycard" /*---Botao de decremento de produto-*/>{quantity}</span>

            <button className="btnquantity" onClick={increaseQuantity} /*---Botao de decremento de produto-*/>
              +
            </button>
          </div>
          
          <BottomNavigation /*---Icone de favorito depois do Hover no card --*/
            className="btnFavorite"
            label="Carrinho"
            icon={<FavoriteIcon />}
          />
        </CardContent>
      </Box>
    </Card> 
  );
}
