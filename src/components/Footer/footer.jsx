import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import cartContext from "./../../context/cartContext";
import Button from "@mui/material/Button";
import ListCart from "../Listcart/listcart";

import "./footer.css";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  const cart = React.useContext(cartContext);

  /*função para quando apertar o botao de continuar comprando*/
  function cliqueparaaparecer() {
    const addproducts = document.getElementById("displayItems");
    addproducts.classList.toggle("displayItemson");
  }
  /*função para quando apertar o botao de continuar comprando*/

  return (
    <>
      <div id="displayItems" /*----Essa div mostra todo os itens quando clica no carrinho e sobe a Tela--*/>

        <BottomNavigationAction  /*----Icone de carrinho que fica na parte de cima da tela de itens--*/
          id="iconcart-list"
          label="Carrinho"
          icon={<ShoppingCartOutlinedIcon />}
          onClick={cliqueparaaparecer}
        />

        <ListCart /*----Esse e o componente ListCart--*/ />

        <div className="cartButtons" /*----Essa div mostra todo os Botoes de  quando clica no carrinho e sobe a Tela--*/>

          <Button /*----Botão de continuar Comprando--*/
            className="btnreturnpurchase"
            variant="outlined"
            onClick={cliqueparaaparecer}>
            continuar Comprando
          </Button>

          <Button /*----Botão de Finalizar Compra--*/
            className="btncheckout"
            variant="contained" >
            Finalizar Compra
          </Button>

        </div>
      </div>

      <div className="footer" /*----Essa div mostra todo os Itens do Footer--*/>

        <BottomNavigation
          className="contentFooter"
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}>

          <BottomNavigationAction /*----Icone de carrinho do Footer--*/
            id="carticon "
            className="iconsfooter"
            label="Carrinho"
            icon={
              <ShoppingCartOutlinedIcon
                className="iconsfooter"
                onClick={cliqueparaaparecer}
              />}
          />

          {cart.kart > 0 ? <div id="cartcount">{cart.kart}</div> : ""}
          <BottomNavigationAction /*----Icone de Favoritos do Footer--*/
            id="carticon "
            className="iconsfooter"
            label="Favoritos"
            icon={<FavoriteIcon className="iconsfooter" />}
          />

          <BottomNavigationAction /*----Icone de Perfil do Footer--*/
            className="iconsfooter"
            label="Perfil"
            icon={<AccountCircleOutlinedIcon className="iconsfooter" />}
          />
          
        </BottomNavigation>
      </div>
    </>
  );
}
