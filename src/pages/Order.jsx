import { Box, Radio, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/base";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import PixOutlinedIcon from "@mui/icons-material/PixOutlined";
import "./Order.css";

const Order = () => {
  const [selectedValueDelivery, setSelectedValueDelivery] = useState();
  const [selectedValuePayment, setSelectedValuePayment] = useState();
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChangeDelivery = (event) => {
    setSelectedValueDelivery(event.target.value);
  };
  const handleChangePayment = (event) => {
    setSelectedValuePayment(event.target.value);
  };

  function changeCondition() {
    setIsDisabled(!isDisabled);
  }

  return (
    <Box className="screenOrder">
      <Box className="headerOrder">
        <Box className="iconAndText">
          <ArrowBackIcon />
          <Typography variant="h6">Checkout</Typography>
        </Box>
      </Box>
      <Box className="contentOrder">
        <Box className="cardPersonalData">
          <Box className="contentPersonalData">
            <Typography variant="h6" className="editInformation">
              Quem pediu
              <Button onClick={changeCondition} className="btnEditInformation">
                Editar
              </Button>
            </Typography>
            <Box className="nameAndTelephone">
              <Typography variant="h5">
                Nome:
                <TextField
                  disabled={isDisabled}
                  type="text"
                  className="inputCheckout"
                />
              </Typography>
              <Typography variant="h5">
                Telefone:
                <TextField
                  type="number"
                  disabled={isDisabled}
                  className="inputCheckout"
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
            <Typography variant="h6" className="editInformation">
              Forma de Entrega
            </Typography>
            <Box className="deliveryMethod">
              <Box display={"flex"} alignItems={"center"} width={"100"}>
                <Radio
                  checked={selectedValueDelivery === "a"}
                  onChange={handleChangeDelivery}
                  value="a"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                />
                <DeliveryDiningOutlinedIcon />
                <Typography variant="h6" sx={{ pl: 2 }}>
                  Delivery
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Radio
                  checked={selectedValueDelivery === "b"}
                  onChange={handleChangeDelivery}
                  value="b"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "B" }}
                />
                <StorefrontOutlinedIcon />
                <Typography variant="h6" sx={{ pl: 2 }}>
                  Retirar no Local
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="cardDeliveryAddress">
          <Box className="contentDeliveryAddress">
            <Typography variant="h6" className="editInformationAddress">
              Entregar no Endereço
              <Button className="btnEditInformation" onClick={changeCondition}>
                Editar
              </Button>
            </Typography>
            <Box className="addressData">
              <Typography
                sx={{ display: "flex", flexDirection: "column" }}
                variant="h5"
              >
                Cep:{" "}
                <TextField
                  disabled={isDisabled}
                  type="text"
                  className="inputCheckout"
                />
              </Typography>

              <Typography
                sx={{ display: "flex", flexDirection: "column" }}
                variant="h5"
              >
                Rua/Av:{" "}
                <TextField
                  disabled={isDisabled}
                  type="text"
                  className="inputCheckout"
                />
              </Typography>
              <Typography
                sx={{ display: "flex", flexDirection: "column" }}
                variant="h5"
              >
                Complemento:{" "}
                <TextField
                  disabled={isDisabled}
                  type="text"
                  className="inputCheckout"
                />
              </Typography>
              <Typography
                sx={{ display: "flex", flexDirection: "column" }}
                variant="h5"
              >
                Bairro:{" "}
                <TextField
                  disabled={isDisabled}
                  type="text"
                  className="inputCheckout"
                />
              </Typography>
              <Typography
                sx={{ display: "flex", flexDirection: "column" }}
                variant="h5"
              >
                Cidade:{" "}
                <TextField
                  disabled={isDisabled}
                  type="text"
                  className="inputCheckout"
                />
              </Typography>
              <Typography
                sx={{ display: "flex", flexDirection: "column" }}
                variant="h5"
              >
                Estado:{" "}
                <TextField
                  disabled={isDisabled}
                  type="text"
                  className="inputCheckout"
                />
              </Typography>
            </Box>
          </Box>
        </Box>

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
            <Typography variant="h6" className="editInformation">
              Forma de Pagamento
            </Typography>
            <Box className="FormOfPayment">
              <Box display={"flex"} alignItems={"center"} width={"100"}>
                <Radio
                  checked={selectedValuePayment === "a"}
                  onChange={handleChangePayment}
                  value="a"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                />
                <CreditCardOutlinedIcon />
                <Typography variant="h6" sx={{ pl: 2 }}>
                  Cartão de Credito
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Radio
                  checked={selectedValuePayment === "b"}
                  onChange={handleChangePayment}
                  value="b"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "B" }}
                />
                <CreditCardOutlinedIcon />
                <Typography variant="h6" sx={{ pl: 2 }}>
                  Cartão de Debito
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Radio
                  checked={selectedValuePayment === "c"}
                  onChange={handleChangePayment}
                  value="c"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "C" }}
                />
                <PixOutlinedIcon />
                <Typography variant="h6" sx={{ pl: 2 }}>
                  Pix
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Radio
                  checked={selectedValuePayment === "d"}
                  onChange={handleChangePayment}
                  value="d"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "D" }}
                />
                <StorefrontOutlinedIcon />
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
            <Button className="btnSendRequest">Enviar Pedido</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Order;
