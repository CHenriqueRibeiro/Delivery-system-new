import { Box, Radio, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import PixOutlinedIcon from "@mui/icons-material/PixOutlined";
import { NavLink } from "react-router-dom";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import "./Order.css";

const SignupSchema = yup.object().shape({
  estado: yup.string(),
  cidade: yup.string().required(),
  bairro: yup.string().required(),
  complemento: yup.string(),
  casaApto: yup.string().required(),
  rua: yup.string().required(),
  cep: yup.string(),
  formaDeEntrega: yup.string().required(),
  telefone: yup.number().required(),
  nome: yup.string().required(),
});

const Order = () => {
  const [open, setOpen] = useState(false);

  const [selectedValueDelivery, setSelectedValueDelivery] =
    useState("delivery");
  const [selectedValuePayment, setSelectedValuePayment] =
    useState("creditCard");

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleChangeDelivery = (event) => {
    setSelectedValueDelivery(event.target.value);
  };

  const handleChangePayment = (event) => {
    setSelectedValuePayment(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className="screenOrder">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="headerOrder">
          <Box className="iconAndText">
            <NavLink to="/" style={{ color: "#f9e9df" }}>
              <ArrowBackIcon />
            </NavLink>
            <Typography variant="h6">Checkout</Typography>
          </Box>
        </Box>
        <Box className="contentOrder">
          <Box className="cardPersonalData">
            <Box className="contentPersonalData">
              {" "}
              <Box className="backgroundTitle"></Box>
              <Typography variant="h6" className="editInformation">
                Quem pediu
              </Typography>
              <Box className="nameAndTelephone">
                <Typography
                  sx={{ display: "flex", flexDirection: "row" }}
                  variant="h6"
                >
                  <label>Nome:</label>
                  <input
                    type="text"
                    name="nome"
                    {...register("nome")}
                    style={{ textTransform: "capitalize" }}
                  />
                </Typography>
                <Typography
                  sx={{ display: "flex", flexDirection: "row" }}
                  variant="h6"
                >
                  <label>Telefone:</label>
                  <InputMask
                    mask="99 9 99999999"
                    maskChar={null}
                    className="inputCheckout"
                    name="telefone"
                    {...register("telefone")}
                  />
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box className="cardDeliveryMethod">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                height: "100%",
                width: "100%",
              }}
            >
              {" "}
              <Box className="backgroundTitleDelivery"></Box>
              <Typography variant="h6" className="editInformation">
                Forma de Entrega
              </Typography>
              <Box className="deliveryMethod">
                <Box display={"flex"} width={"100%"} alignItems={"center"}>
                  <Radio
                    type="radio"
                    checked={selectedValueDelivery === "delivery"}
                    onChange={handleChangeDelivery}
                  />
                  <DeliveryDiningOutlinedIcon />
                  <Typography variant="h6" sx={{ pl: 2 }}>
                    Delivery
                  </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Radio
                    type="text"
                    checked={selectedValueDelivery === "pickUpDelivery"}
                    onChange={handleChangeDelivery}
                  />
                  <StorefrontOutlinedIcon />
                  <Typography variant="h6" sx={{ pl: 2 }}>
                    Retirar no Local
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {selectedValueDelivery === "delivery" && (
            <Box className="cardDeliveryAddress">
              <Box className="contentDeliveryAddress">
                <Box className="backgroundTitleAddress"></Box>
                <Typography variant="h6" className="editInformationAddress">
                  Entregar no Endereço
                </Typography>
                <Box className="addressData">
                  <Typography
                    sx={{ display: "flex", flexDirection: "column" }}
                    variant="h6"
                  >
                    <label>Cep:</label>
                    <InputMask mask="99999-999" maskChar={null} />
                  </Typography>

                  <Typography
                    sx={{ display: "flex", flexDirection: "column" }}
                    variant="h6"
                  >
                    {" "}
                    <label>Rua/ Av :</label>
                    <input name="rua" {...register("rua")} />
                  </Typography>
                  <Typography
                    sx={{ display: "flex", flexDirection: "column" }}
                    variant="h6"
                  >
                    {" "}
                    <label>Casa/Apto :</label>
                    <input spellCheck="false" name="casaApto" />
                  </Typography>
                  <Typography
                    sx={{ display: "flex", flexDirection: "column" }}
                    variant="h6"
                  >
                    {" "}
                    <label>Complemento :</label>
                    <input spellCheck="false" />
                  </Typography>

                  <Typography
                    sx={{ display: "flex", flexDirection: "column" }}
                    variant="h6"
                  >
                    {" "}
                    <label> Bairro:</label>
                    <input spellCheck="false" />
                  </Typography>

                  <Typography
                    sx={{ display: "flex", flexDirection: "column" }}
                    variant="h6"
                  >
                    {" "}
                    <label>Cidade:</label>
                    <input spellCheck="false" />
                  </Typography>

                  <Typography
                    sx={{ display: "flex", flexDirection: "column" }}
                    variant="h6"
                  >
                    {" "}
                    <label>Estado:</label>
                    <input spellCheck="false" />
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          {selectedValueDelivery === "pickUpDelivery" && (
            <Box className="cardDeliveryAddress">
              <Box className="contentDeliveryAddress">
                <Box className="backgroundTitleAddressRetirada"></Box>
                <Typography variant="h6" className="editInformationAddress">
                  Retirar no Endereço
                </Typography>
                <Box className="addressData">
                  <Typography
                    sx={{ display: "flex", flexDirection: "column" }}
                    variant="h6"
                  >
                    Cep:{" "}
                    <TextField
                      disabled
                      type="text"
                      className="inputCheckout"
                      value={"61600-000"}
                    />
                  </Typography>

                  <Typography
                    sx={{ display: "flex", flexDirection: "column" }}
                    variant="h6"
                  >
                    Rua/Av:{" "}
                    <TextField
                      disabled
                      type="text"
                      className="inputCheckout"
                      value={"Rua da Luz"}
                    />
                  </Typography>
                  <Typography
                    sx={{ display: "flex", flexDirection: "column" }}
                    variant="h6"
                  >
                    Complemento:{" "}
                    <TextField
                      disabled
                      type="text"
                      className="inputCheckout"
                      value={"casa 17"}
                    />
                  </Typography>
                  <Typography
                    sx={{ display: "flex", flexDirection: "column" }}
                    variant="h6"
                  >
                    Bairro:{" "}
                    <TextField
                      disabled
                      type="text"
                      className="inputCheckout"
                      value={"Cumbuco"}
                    />
                  </Typography>
                  <Typography
                    sx={{ display: "flex", flexDirection: "column" }}
                    variant="h6"
                  >
                    Cidade:{" "}
                    <TextField
                      disabled
                      type="text"
                      className="inputCheckout"
                      value={"Caucaia"}
                    />
                  </Typography>
                  <Typography
                    sx={{ display: "flex", flexDirection: "column" }}
                    variant="h6"
                  >
                    Estado:{" "}
                    <TextField
                      disabled
                      type="text"
                      className="inputCheckout"
                      value={"Ceará"}
                    />
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          <Box className="cardFormOfPayment">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                height: "100%",
                width: "100%",
              }}
            >
              {" "}
              <Box className="backgroundTitleFormPayment"></Box>
              <Typography variant="h6" className="editInformation">
                Forma de Pagamento
              </Typography>
              <Box className="FormOfPayment">
                <Box display={"flex"} alignItems={"center"} width={"100"}>
                  <Radio
                    checked={selectedValuePayment === "creditCard"}
                    onChange={handleChangePayment}
                    value="creditCard"
                  />
                  <CreditCardOutlinedIcon />
                  <Typography variant="h6" sx={{ pl: 2 }}>
                    Cartão de Credito
                  </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Radio
                    checked={selectedValuePayment === "debitCard"}
                    onChange={handleChangePayment}
                    value="debitCard"
                  />
                  <CreditCardOutlinedIcon />
                  <Typography variant="h6" sx={{ pl: 2 }}>
                    Cartão de Debito
                  </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Radio
                    checked={selectedValuePayment === "pix"}
                    onChange={handleChangePayment}
                    value="pix"
                  />
                  <PixOutlinedIcon />
                  <Typography variant="h6" sx={{ pl: 2 }}>
                    Pix
                  </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Radio
                    checked={selectedValuePayment === "money"}
                    onChange={handleChangePayment}
                    value="money"
                  />
                  <AttachMoneyIcon />
                  <Typography variant="h6" sx={{ pl: 2 }}>
                    Dinheiro
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className="totalPurchase">
            <Box className="contentTotalPurchase">
              <Typography variant="h6">Total:R$ 50,00</Typography>
              <input
                className="btnSendRequest"
                type="submit"
                onClick={handleOpen}
              />
            </Box>
          </Box>
        </Box>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          closeAfterTransition
        >
          <Fade in={open}>
            <Box id="modalCadastro">
              <Box id="modalContent">
                <Box className="wrapper">
                  <Typography variant="h6">Obrigado por sua compra</Typography>
                  <Typography variant="h6">Pedido Realizado</Typography>
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
                </Box>

                <NavLink to="/" style={{ color: "#f9e9df" }}>
                  <input
                    onClick={handleClose}
                    className="btnCloseService"
                    value="fechar"
                    style={{
                      textAlign: "center",
                      color: "white",
                      textTransform: "capitalize",
                    }}
                  />
                </NavLink>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </form>
    </Box>
  );
};

export default Order;
