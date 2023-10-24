import { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Button from "@mui/material/Button";
import ListCart from "../Listcart/listcart";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";
import AbcIcon from "@mui/icons-material/Abc";
import InputMask from "react-input-mask";
import { useCarrinho } from "../../context/useCarrinho";
import { useFormat } from "../../utils/useFormat";
import { NavLink } from "react-router-dom";
import "./cart.css";

export default function Cart() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModalCarrinho, setOpenModalCarrinho] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [usuarioValidado, setUsuarioValidado] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const { cart, calculateSubtotal, clearCart } = useCarrinho();
  const [showValidationModal, setShowValidationModal] = useState(false);

  const openListItems = () => {
    const addproducts = document.getElementById("displayItems");
    addproducts.classList.toggle("displayItemson");
  };
  const handleOpenModalCarrinho = () => {
    setOpenModalCarrinho(true);
  };
  const handleCloseModalCarrinho = () => {
    setOpenModalCarrinho(false);
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

  const handleTelefoneBlur = () => {
    const formDataJSON = localStorage.getItem("formData");
    if (formDataJSON) {
      const formData = JSON.parse(formDataJSON);
      const nomeArmazenado = formData.nome;
      const telefoneArmazenado = formData.telefone;
      if (telefoneArmazenado === telefone) {
        setNome(nomeArmazenado);
      } else {
        setNome("");
      }
    }
  };

  const consultarDadosLocalStorage = (btnEntrar) => {
    const formDataJSON = localStorage.getItem("formData");
    if (formDataJSON) {
      const formData = JSON.parse(formDataJSON);
      const telefoneArmazenado = formData.telefone;
      const nomeArmazenado = formData.nome;

      const nomeDigitadoFormatado =
        nome.charAt(0).toUpperCase() + nome.slice(1);

      if (
        telefoneArmazenado === telefone &&
        nomeArmazenado === nomeDigitadoFormatado
      ) {
        setNome(nomeArmazenado);
        setUsuarioValidado(true);
        if (btnEntrar) setLoginMessage("");
        setShowValidationModal(true);
      } else {
        setNome("");
        setUsuarioValidado(false);
        if (btnEntrar) setLoginMessage("Usuário não encontrado");
      }
    } else {
      setNome("");
      setTelefone("");
      setUsuarioValidado(false);
      if (btnEntrar) setLoginMessage("Usuário não encontrado");
    }
  };

  return (
    <>
      <Box id="displayItems">
        <Box
          sx={{
            backgroundColor: "#f76d26",
            overflow: "hidden",
            width: "100%",
            height: "4rem",
            minHeight: "3rem",
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            zIndex: "3",
          }}
        >
          <Button
            className="click box-shadow"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fb6c1a",
              border: "1px #fae9de solid",
              borderRadius: "8px",
              color: "#fae9de",
              height: "75%",
            }}
            onClick={clearCart}
          >
            {" "}
            Limpar carrinho
          </Button>
        </Box>
        <ListCart />
        <Box
          sx={{
            display: "flex",
            width: "95%",
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
              Subtotal: {useFormat(calculateSubtotal(cart))}
            </Typography>
            <Button
              sx={{ width: "50%" }}
              className="btnreturnpurchase click"
              variant="outlined"
              onClick={openListItems}
            >
              continuar Comprando
            </Button>
          </Box>
          {usuarioValidado ? (
            <NavLink to="/pedido">
              <Button variant="contained" className="btncheckout click">
                Ir para Pagamento
              </Button>
            </NavLink>
          ) : cart.length === 0 ? (
            <Button
              className="btncheckout click"
              variant="contained"
              onClick={handleOpenModalCarrinho}
            >
              Finalizar Pagamento
            </Button>
          ) : (
            <Button
              className="btncheckout click"
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
                    <Typography
                      sx={{
                        height: " 100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: " space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <Box id="InputModal" sx={{}}>
                        <InputMask
                          placeholder="Nº telefone"
                          mask="99 9 99999999"
                          maskChar={null}
                          className="inputModalDados"
                          value={telefone}
                          onChange={handleTelefoneChange}
                          onBlur={handleTelefoneBlur}
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
                        className="btnIrParaPagamento click"
                        sx={{ height: "2rem" }}
                        onClick={() => consultarDadosLocalStorage(true)}
                      >
                        Entrar
                      </Button>
                      <Box>
                        <Typography>
                          Não tem cadastro?{" "}
                          <span>
                            <NavLink className="btncheckout " to="/cadastro">
                              Realizar Cadastro
                            </NavLink>
                          </span>
                        </Typography>
                      </Box>
                      ou
                      <NavLink to="/pedidosemcadastro">
                        <Button
                          variant="outlined"
                          className="btnIrParaPagamento click"
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
              <Box
                sx={{
                  display: "flex",
                }}
              >
                {" "}
                {cart.length === 0 ? (
                  <>
                    <ShoppingCartOutlinedIcon
                      className="iconsfooter"
                      onClick={handleOpenModalCarrinho}
                    />
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      open={openModalCarrinho}
                      onClose={handleCloseModalCarrinho}
                      closeAfterTransition
                    >
                      <Fade in={openModalCarrinho}>
                        <Box
                          sx={{
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#fae9de",
                            position: " absolute",
                            top: " 50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: " 90%",
                            maxWidth: "600px",
                            height: "5%",
                            minHeight: " 100px",
                            border: "6px solid #e5c7b3",
                            borderRadius: " 30px",
                            boxShadow: "5px 4px 5px 2px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          <Box id="modalContent">
                            <Box className="wrapper">
                              <Typography variant="h6">
                                Carrinho vazio
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Fade>
                    </Modal>
                  </>
                ) : (
                  <>
                    <ShoppingCartOutlinedIcon
                      className="iconsfooter"
                      onClick={openListItems}
                    />
                  </>
                )}
                {cart.length > 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#fb6c1a",
                      width: "17px",
                      height: "17px",
                      color: "#fff",
                      borderRadius: "50%",
                      margin: "-5px 0 0 -9px",
                    }}
                  >
                    {cart.length}
                  </Box>
                ) : (
                  ""
                )}
              </Box>
            }
          />
        </BottomNavigation>
      </Box>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        closeAfterTransition
      >
        <Fade in={showValidationModal}>
          <Box id="modalCadastro">
            <Box id="modalContent">
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: " flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: " #fae9de",
                }}
              >
                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  {" "}
                  <Box
                    className="checkmark__circle"
                    cx="26"
                    cy="26"
                    r="25"
                  ></Box>{" "}
                  <path
                    className="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  ></path>
                </svg>
                <Typography variant="h6">
                  Login Realizado com sucesso!
                </Typography>
                <NavLink to="/pedido">
                  <Button
                    sx={{
                      marginTop: "1.2rem",
                      color: " #f7e9e1",
                      backgroundColor: " #f76d26 ",
                      borderRadius: "13px",
                      border: "1px solid #fae9de",
                      width: " 100%",
                      maxWidth: "375px",
                      boxShadow:
                        "5px 4px 5px 2px rgba(0, 0, 0, 0.2), 5px 4px 5px 2px rgba(0, 0, 0, 0.14), 5px 4px 5px 2px rgba(0, 0, 0, 0.12)",
                    }}
                    className="click cartbtn"
                  >
                    Ir para Pagamento
                  </Button>
                </NavLink>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
