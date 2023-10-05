import { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Button from "@mui/material/Button";
import ListCart from "../Listcart/listcart";

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
  const [open, setOpen] = useState(false);
  const { sumValueItems } = useCarrinho();
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [usuarioValidado, setUsuarioValidado] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const openListItems = () => {
    const addproducts = document.getElementById("displayItems");
    addproducts.classList.toggle("displayItemson");
  };

  const handleOpen = () => {
    consultarDadosLocalStorage(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTelefoneChange = (event) => {
    const novoTelefone = event.target.value;
    setTelefone(novoTelefone);
  };

  const consultarDadosLocalStorage = (btnEntrar) => {
    const formDataJSON = localStorage.getItem("formData");
    if (formDataJSON) {
      const formData = JSON.parse(formDataJSON);
      const telefoneArmazenado = formData.telefone;
      const nomeArmazenado = formData.nome;

      if (telefoneArmazenado === telefone && nomeArmazenado === nome) {
        setNome(nomeArmazenado);
        setUsuarioValidado(true);
        if (btnEntrar) setLoginMessage("");
        console.log("validado");
      } else {
        setNome("");
        setUsuarioValidado(false);
        if (btnEntrar) setLoginMessage("Usuario nao encontrado");
        console.log("nao validado");
      }
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
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            bottom: "8.5rem",
            position: "absolute",
          }}
        >
          <Box
            sx={{
              color: "#f76d26",
              height: "4.9rem",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "13px",
              textAlign: "center",
            }}
          >
            <Typography
              className="sumPriceCart "
              variant="h6"
              sx={{
                backgroundColor: "#fae9de",
                color: "#f76d26",
                height: "3.9rem",
                width: "8rem",
                display: "flex",
                flexDirection: "column",
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
              sx={{ width: "50%" }}
              className="btnreturnpurchase"
              variant="outlined"
              onClick={openListItems}
            >
              continuar Comprando
            </Button>
          </Box>
          {usuarioValidado ? (
            <NavLink to="/pedido">
              <Button variant="contained" className="btncheckout">
                Ir para Pagamento
              </Button>
            </NavLink>
          ) : (
            <Button
              className="btncheckout"
              variant="contained"
              onClick={handleOpen}
            >
              Finalizar Pagamento
            </Button>
          )}
          <Box>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open && !usuarioValidado}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open && !usuarioValidado}>
                <Box id="modalCadastro">
                  <Box id="modalContent">
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Entre com seus dados
                    </Typography>
                    <Typography id="transition-modal-description">
                      <Box id="InputModal">
                        <InputMask
                          placeholder="Nº telefone"
                          mask="99 9 99999999"
                          maskChar={null}
                          className="inputModalDados"
                          value={telefone}
                          onChange={handleTelefoneChange}
                        />
                        <PhoneIcon className="iconTelefoneInput" />

                        <InputMask
                          spellCheck="false"
                          type="text"
                          placeholder="Nome"
                          className="inputModalDados"
                          value={nome}
                          onChange={(event) => setNome(event.target.value)}
                          maxLength={20}
                        />
                        <AbcIcon className="iconTelefoneName" />
                      </Box>
                      <Typography
                        style={{
                          color: "red",
                          fontSize: "12px",
                          textAlign: "center",
                          height: "auto",
                        }}
                      >
                        {loginMessage}
                      </Typography>
                      <Button
                        variant="outlined"
                        className="btnIrParaPagamento"
                        sx={{ height: "2rem" }}
                        onClick={() => consultarDadosLocalStorage(true)}
                      >
                        Entrar
                      </Button>
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
                      ou
                      <NavLink to="/pedidosemcadastro">
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
        </BottomNavigation>
      </Box>
    </>
  );
}
