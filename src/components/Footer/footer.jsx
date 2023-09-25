import { useState, useContext } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Button from "@mui/material/Button";
import ListCart from "../Listcart/listcart";

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";
import AbcIcon from "@mui/icons-material/Abc";
import InputMask from "react-input-mask";

import "./footer.css";
import { FoodContext } from "../../context/FoodContext";

import { NavLink } from "react-router-dom";

export default function Footer() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);

  const cart = useContext(FoodContext);

  function cliqueparaaparecer() {
    const addproducts = document.getElementById("displayItems");
    addproducts.classList.toggle("displayItemson");
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div id="displayItems">
        <BottomNavigationAction
          id="btnCartIconCarrinho"
          label="Carrinho"
          icon={<ShoppingCartOutlinedIcon id="cartIconCarrinho" />}
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

          <Button
            className="btncheckout"
            variant="contained"
            onClick={handleOpen}
          >
            Finalizar Compra
          </Button>
          <div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box id="modalCadastro">
                  <Box id="modalContent">
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Login
                    </Typography>
                    <Typography id="transition-modal-description">
                      <Box id="InputModal">
                        <InputMask
                          placeholder="Nº telefone"
                          mask="99 9 99999999"
                          maskChar={null}
                          className="inputModalDados"
                        />
                        <PhoneIcon className="iconTelefoneInput" />
                        <input
                          type="text"
                          placeholder="Nome"
                          className="inputModalDados"
                        />
                        <AbcIcon className="iconTelefoneName" />
                      </Box>
                      <Box>
                        <Typography>
                          Não tem cadastro?{" "}
                          <span>
                            <NavLink className="btncheckout" to="/cadastro">
                              Realizar Cadastro
                            </NavLink>
                          </span>
                        </Typography>
                      </Box>
                      <Button variant="outlined" className="btnGoPay">
                        Login
                      </Button>
                      <Button variant="outlined" className="btnGoPay">
                        Continuar sem cadastro
                      </Button>
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            </Modal>
          </div>
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
            ""
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
            icon={<AccountCircleOutlinedIcon className="iconsfooter" />}
          />
        </BottomNavigation>
      </div>
    </>
  );
}
