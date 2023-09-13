// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import cartContext from './../../context/cartContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BottomNavigation from '@mui/material/BottomNavigationAction';
import './card.css';

export default function MediaControlCard(props) {
  MediaControlCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    flavor: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  };
  const [quantity, setQuantity] = React.useState(0);
  const cart = React.useContext(cartContext);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    cart.setKart(cart.kart + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      cart.setKart(cart.kart - 1);
    }
  };

  return (
    <Card className="card">
      <Box className="cardDescription">
        <CardMedia
          component="img"
          src={props.imageUrl}
          alt={props.flavor}
        />

        <CardContent className="contentCard">
          <Typography variant="h6">
            {props.flavor}
          </Typography>

          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            {props.ingredients}
          </Typography>

          <Typography variant="h6">
            R$ {props.price}
          </Typography>

          <div className="quantity-control">
            <button
              className="btnquantity"
              onClick={decreaseQuantity}
            >
              -
            </button>

            <span id="quantitycard">{quantity}</span>

            <button
              className="btnquantity"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>

          <BottomNavigation
            className="btnFavorite"
            label="Carrinho"
            icon={<FavoriteIcon />}
          />
        </CardContent>
      </Box>
    </Card>
  );
}
