import { Box, Radio, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/base";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import PixOutlinedIcon from "@mui/icons-material/PixOutlined";
import { NavLink } from "react-router-dom";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InputMask from "react-input-mask";

/*import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";*/
import "./Order.css";

//import Backdrop from "@mui/material/Backdrop";

import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

/*const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required();*/
const Order = () => {
  const [selectedValueDelivery, setSelectedValueDelivery] =
    useState("delivery");
  const [selectedValuePayment, setSelectedValuePayment] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");

  /* const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);*/

  const handleChangeDelivery = (event) => {
    setSelectedValueDelivery(event.target.value);
  };
  const handleChangePayment = (event) => {
    setSelectedValuePayment(event.target.value);
  };

  function changeCondition() {
    setIsDisabled(!isDisabled);
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (/^[A-Za-z\s]+$/.test(inputValue) || inputValue === "") {
      setNome(inputValue);
    }
  };

  return (
    <Box className="screenOrder">
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
            {/* <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register("firstName")} />
              <p>{errors.firstName?.message}</p>

              <input {...register("age")} />
              <p>{errors.age?.message}</p>

              <input type="submit" />
  </form>*/}
            <Typography variant="h6" className="editInformation">
              Quem pediu
              <Button onClick={changeCondition} className="btnEditInformation">
                Editar
              </Button>
            </Typography>
            <Box className="nameAndTelephone">
              {isDisabled ? (
                <>
                  <Typography
                    sx={{ display: "flex", flexDirection: "row" }}
                    variant="h6"
                  >
                    Nome:
                    <InputMask
                      mask=""
                      maskChar=""
                      spellCheck="false"
                      type="text"
                      className="inputCheckout"
                      value={nome}
                      onChange={handleInputChange}
                      maxLength={20}
                    />
                  </Typography>
                  <Typography
                    sx={{ display: "flex", flexDirection: "row" }}
                    variant="h6"
                  >
                    Telefone:
                    <InputMask
                      mask="99 9 99999999"
                      maskChar={null}
                      className="inputCheckout"
                    />
                  </Typography>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                      width: "90%",
                      height: "100%",
                    }}
                  >
                    <span>
                      <Typography variant="h6"> Nome: Henrique</Typography>
                    </span>
                    <span>
                      <Typography variant="h6">
                        {" "}
                        Telefone: 85 988888888
                      </Typography>
                    </span>
                  </Box>
                </>
              )}
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
                  checked={selectedValueDelivery === "delivery"}
                  onChange={handleChangeDelivery}
                  value="delivery"
                />
                <DeliveryDiningOutlinedIcon />
                <Typography variant="h6" sx={{ pl: 2 }}>
                  Delivery
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Radio
                  checked={selectedValueDelivery === "pickUpDelivery"}
                  onChange={handleChangeDelivery}
                  value="pickUpDelivery"
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
                <Button
                  className="btnEditInformation"
                  onClick={changeCondition}
                >
                  Editar
                </Button>
              </Typography>
              <Box className="addressData">
                {isDisabled ? (
                  <>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      Cep:
                      <InputMask
                        mask="999999-999"
                        maskChar={null}
                        //style={{ background:'red', width:'50%', borderRadius:'15px', border:'none',paddingLeft:'10px'}}
                      />
                    </Typography>

                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      {" "}
                      Rua :
                      <InputMask
                        mask=""
                        maskChar=""
                        spellCheck="false"
                        type="text"
                        maxLength={50}
                      />
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      {" "}
                      Casa/Apto :
                      <InputMask
                        mask=""
                        maskChar=""
                        spellCheck="false"
                        type="text"
                        maxLength={50}
                      />
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      {" "}
                      Complemento :
                      <InputMask
                        mask=""
                        maskChar=""
                        spellCheck="false"
                        type="text"
                        maxLength={50}
                      />
                    </Typography>

                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      {" "}
                      Bairro:
                      <InputMask
                        mask=""
                        maskChar={null}
                        spellCheck="false"
                        type="text"
                        maxLength={20}
                      />
                    </Typography>

                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      {" "}
                      Cidade:
                      <InputMask
                        mask=""
                        maskChar=""
                        spellCheck="false"
                        type="text"
                        maxLength={50}
                      />
                    </Typography>

                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      {" "}
                      Estado:
                      <InputMask
                        mask=""
                        maskChar=""
                        spellCheck="false"
                        type="text"
                        maxLength={50}
                      />
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      <span className="inputCheckout"> Cep: 12345-678</span>
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      <span className="inputCheckout"> Rua: Luz Branca</span>
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      <span className="inputCheckout"> Casa/Apto: 12B</span>
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      <span className="inputCheckout">Bairro: Camuntaga</span>
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      <span className="inputCheckout">Cidade: Caucaia</span>
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      <span className="inputCheckout">Estado: Ceará</span>
                    </Typography>
                  </>
                )}
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
                  name="radio-buttons"
                  inputProps={{ "aria-label": "creditCard" }}
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
                  name="radio-buttons"
                  inputProps={{ "aria-label": "debitCard" }}
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
                  name="radio-buttons"
                  inputProps={{ "aria-label": "pix" }}
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
                  name="radio-buttons"
                  inputProps={{ "aria-label": "money" }}
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
            <Button className="btnSendRequest" onClick={handleOpen}>
              Enviar Pedido
            </Button>
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
                <button onClick={handleClose} className="btnCloseService">
                  Fechar
                </button>
              </NavLink>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Order;
