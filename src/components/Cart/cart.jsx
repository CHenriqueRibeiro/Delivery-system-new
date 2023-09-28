import { useState } from "react";
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
import { useCarrinho } from "../../context/useCarrinho";
import { useFormat } from "../../utils/useFormat";

import "./cart.css";

import { NavLink } from "react-router-dom";

export default function Cart() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const { sumValueItems } = useCarrinho();
  const [nome, setNome] = useState("");

  const openListItems = () => {
    const addproducts = document.getElementById("displayItems");
    addproducts.classList.toggle("displayItemson");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (/^[A-Za-z\s]+$/.test(inputValue) || inputValue === "") {
      setNome(inputValue);
    }
  };

  return (
    <>
      <Box id="displayItems">
        <Box
          sx={{
            overflow: "hidden",
            width: "100%",
            height: "9%",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexCirection: "row",
            zIndex: "3",
          }}
        >
          <BottomNavigationAction
            id="btnCartIconCarrinho"
            label="Carrinho"
            icon={<ShoppingCartOutlinedIcon id="cartIconCarrinho" />}
            onClick={openListItems}
          />
        </Box>
        <ListCart />
        <Box
          sx={{
            display: "flex",
            width: "80%",
            gap: "5px",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            bottom: "8.5rem",
            position: "absolute",
          }}
        >
          <Typography
            className="sumPriceCart "
            variant="h6"
            sx={{
              backgroundColor: "#fae9de",
              color: "#f76d26",
              height: "3.9rem",
              width: "10rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "13px",
              textAlign: "center",
              boxShadow: " 5px 4px 5px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            Subtotal: {useFormat(sumValueItems())}
          </Typography>
          <Button
            className="btnreturnpurchase"
            variant="outlined"
            onClick={openListItems}
          >
            continuar Comprando
          </Button>
        </Box>
        <Box className="cartButtons">
          <Button
            className="btncheckout"
            variant="contained"
            onClick={handleOpen}
          >
            Finalizar Compra
          </Button>
          <Box>
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

                        <InputMask
                          mask=""
                          maskChar=""
                          spellCheck="false"
                          type="text"
                          placeholder="Nome"
                          className="inputModalDados"
                          value={nome}
                          onChange={handleInputChange}
                          maxLength={20}
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
                      <Button
                        variant="outlined"
                        className="btnIrParaPagamento"
                        sx={{ height: "2rem" }}
                      >
                        Login
                      </Button>
                      <NavLink to="/pedido">
                        <Button
                          variant="outlined"
                          className="btnIrParaPagamento"
                          sx={{ height: "2rem" }}
                        >
                          Continuar sem cadastro
                        </Button>
                      </NavLink>
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            </Modal>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box className="footer">
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
              <span>
                <ShoppingCartOutlinedIcon
                  className="iconsfooter"
                  onClick={openListItems}
                />
              </span>
            }
          />

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
      </Box>
    </>
  );
}
