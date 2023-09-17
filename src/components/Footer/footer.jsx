import { useState, useContext } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Button from '@mui/material/Button';
import ListCart from '../Listcart/listcart';

import './footer.css';
import { FoodContext } from '../../context/FoodContext';
import { NavLink } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);

  const cart = useContext(FoodContext);

  function cliqueparaaparecer() {
    const addproducts =
      document.getElementById('displayItems');
    addproducts.classList.toggle('displayItemson');
  }
  return (
    <>
      <div id="displayItems">
        <BottomNavigationAction
          id="btnCartIconCarrinho"
          label="Carrinho"
          icon={
            <ShoppingCartOutlinedIcon id="cartIconCarrinho" />
          }
          onClick={cliqueparaaparecer}
        />

        <ListCart />

        <div className="cartButtons">
          <Button
            className="btnreturnpurchase"
            variant="outlined"
            onClick={cliqueparaaparecer}
          >
            continuar Comprando
          </Button>

          {/* <Button
            className="btncheckout"
            variant="contained"
          >
            Finalizar Compra
          </Button> */}
          <NavLink className="btncheckout" to="/cadastro">
            Finalizar Compra
          </NavLink>
        </div>
      </div>

      <div className="footer">
        <BottomNavigation
          className="contentFooter"
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            id="carticon "
            className="iconsfooter"
            label="Carrinho"
            icon={
              <ShoppingCartOutlinedIcon
                className="iconsfooter"
                onClick={cliqueparaaparecer}
              />
            }
          />

          {cart.kart.length > 0 ? (
            <div id="cartcount">{cart.kart.length}</div>
          ) : (
            ''
          )}
          <BottomNavigationAction
            id="carticon "
            className="iconsfooter"
            label="Favoritos"
            icon={<FavoriteIcon className="iconsfooter" />}
          />

          <BottomNavigationAction
            className="iconsfooter"
            label="Perfil"
            icon={
              <AccountCircleOutlinedIcon className="iconsfooter" />
            }
          />
        </BottomNavigation>
      </div>
    </>
  );
}
