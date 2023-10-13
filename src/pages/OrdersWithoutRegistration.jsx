import { Box, Radio, Typography } from "@mui/material";
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
import { useCarrinho } from "../context/useCarrinho";
import { useFormat } from "../utils/useFormat";
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
  const { cart, calculateSubtotal } = useCarrinho();

  const [selectedValueDelivery, setSelectedValueDelivery] = useState(
    sessionStorage.getItem("selectedValueDelivery") || "Entrega"
  );

  const [selectedValuePayment, setSelectedValuePayment] = useState(
    sessionStorage.getItem("selectedValuePayment") || "Credito"
  );
  const [pedidoSemCadastro, setpedidoSemCadastro] = useState("");
  const { handleSubmit } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleChangeDelivery = (event) => {
    const { value } = event.target;
    setSelectedValueDelivery(value);

    const savedData =
      JSON.parse(sessionStorage.getItem("pedido sem cadastro")) || {};

    const updatedData = {
      ...savedData,
      formaDeEntrega: value,
    };

    sessionStorage.setItem("pedido sem cadastro", JSON.stringify(updatedData));
  };

  const handleChangePayment = (event) => {
    const { value } = event.target;
    setSelectedValuePayment(value);

    const savedData =
      JSON.parse(sessionStorage.getItem("pedido sem cadastro")) || {};

    const updatedData = {
      ...savedData,
      formaDePagamento: value,
    };

    sessionStorage.setItem("pedido sem cadastro", JSON.stringify(updatedData));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setpedidoSemCadastro({
      ...pedidoSemCadastro,
      [name]: value,
    });

    sessionStorage.setItem(
      "pedido sem cadastro",
      JSON.stringify({
        ...pedidoSemCadastro,
        [name]: value,
      })
    );
  };

  const createWhatsAppMessage = () => {
    const sessionStorageData = JSON.parse(
      sessionStorage.getItem("itensSelecionados")
    );

    if (sessionStorageData) {
      const pedidoSemCadastro = JSON.parse(
        sessionStorage.getItem("pedido sem cadastro")
      );

      if (!pedidoSemCadastro) {
        console.error(
          "Os dados do formulário não foram encontrados na sessionStorage."
        );
        return;
      }

      const { nome, Telefone } = pedidoSemCadastro;

      let message = `Olá ${nome},\n\nTelefone: ${Telefone}\n\n---------------------------------------\nPedido:\n---------------------------------------\n`;

      const items = sessionStorageData.map((item, index) => {
        return `Item ${index + 1}:\nSabor: ${item.sabor}\nQuantidade: ${
          item.quantidade
        }\nPreço: R$ ${item.valor.toFixed(2)}\n`;
      });

      message += `CEP: ${pedidoSemCadastro.cep || ""}\n`;
      message += `Casa/Apto: ${pedidoSemCadastro.Numero || ""}\n`;
      message += `Rua: ${pedidoSemCadastro.rua || ""}\n`;
      message += `Complemento: ${pedidoSemCadastro.Referencia || ""}\n`;
      message += `Bairro: ${pedidoSemCadastro.Bairro || ""}\n`;
      message += `Cidade: ${pedidoSemCadastro.Cidade || ""}\n`;
      message += `Estado: ${pedidoSemCadastro.Estado || ""}\n`;

      message += `---------------------------------------\n`;
      message += `Forma de Pagamento: ${
        pedidoSemCadastro.formaDePagamento || ""
      }\n`;
      message += `Forma de Entrega: ${
        pedidoSemCadastro.formaDeEntrega || ""
      }\n`;
      message += `---------------------------------------\n`;

      message += `${items.join("\n")}\n`;

      const totalValue = calculateSubtotal(cart);
      message += `Valor Total: R$ ${totalValue.toFixed(2)}`;

      const formattedPhoneNumber = Telefone.replace(/\s+/g, "");

      const whatsappLink = `https://api.whatsapp.com/send?phone=55${formattedPhoneNumber}&text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappLink);
    }
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
                    style={{
                      textTransform: "capitalize",
                      border: "1px #f16d2f solid",
                      borderRadius: "8px",
                      paddingLeft: ".5rem",
                      fontFamily: "Roboto",
                      fontWeight: "500",
                      marginLeft: ".5rem",
                    }}
                    value={pedidoSemCadastro.nome}
                    onChange={handleInputChange}
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
                    name="Telefone"
                    style={{
                      textTransform: "capitalize",
                      border: "1px #f16d2f solid",
                      borderRadius: "8px",
                      paddingLeft: ".5rem",
                      fontFamily: "Roboto",
                      fontWeight: "500",
                      marginLeft: ".5rem",
                    }}
                    value={pedidoSemCadastro.Telefone}
                    onChange={handleInputChange}
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
                    checked={selectedValueDelivery === "Entrega"}
                    onChange={handleChangeDelivery}
                    value="Entrega"
                  />
                  <DeliveryDiningOutlinedIcon />
                  <Typography variant="h6" sx={{ pl: 2 }}>
                    Delivery
                  </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Radio
                    checked={selectedValueDelivery === "Retirada"}
                    onChange={handleChangeDelivery}
                    value="Retirada"
                  />
                  <StorefrontOutlinedIcon />
                  <Typography variant="h6" sx={{ pl: 2 }}>
                    Retirar no Local
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {selectedValueDelivery === "Entrega" && (
            <Box className="cardDeliveryAddress">
              <Box className="contentDeliveryAddress">
                <Box className="backgroundTitleAddress"></Box>
                <Typography variant="h6" className="editInformationAddress">
                  Entregar no Endereço
                </Typography>
                <Box className="addressData">
                  <Typography
                    sx={{ display: "flex", flexDirection: "row" }}
                    variant="h6"
                  >
                    <label>Cep:</label>
                    <InputMask
                      style={{
                        textTransform: "capitalize",
                        border: "1px #f16d2f solid",
                        borderRadius: "8px",
                        paddingLeft: ".5rem",
                        fontFamily: "Roboto",
                        fontWeight: "500",
                        marginLeft: ".5rem",
                      }}
                      mask="99999-999"
                      maskChar={null}
                      name="cep"
                      value={pedidoSemCadastro.cep}
                      onChange={handleInputChange}
                    />
                  </Typography>

                  <Typography
                    sx={{ display: "flex", flexDirection: "row" }}
                    variant="h6"
                  >
                    {" "}
                    <label>Rua/ Av :</label>
                    <input
                      style={{
                        textTransform: "capitalize",
                        border: "1px #f16d2f solid",
                        borderRadius: "8px",
                        paddingLeft: ".5rem",
                        fontFamily: "Roboto",
                        fontWeight: "500",
                        marginLeft: ".5rem",
                      }}
                      name="rua"
                      value={pedidoSemCadastro.rua}
                      onChange={handleInputChange}
                    />
                  </Typography>
                  <Typography
                    sx={{ display: "flex", flexDirection: "row" }}
                    variant="h6"
                  >
                    {" "}
                    <label>Numero:</label>
                    <input
                      style={{
                        textTransform: "capitalize",
                        border: "1px #f16d2f solid",
                        borderRadius: "8px",
                        paddingLeft: ".5rem",
                        fontFamily: "Roboto",
                        fontWeight: "500",
                        marginLeft: ".5rem",
                      }}
                      spellCheck="false"
                      name="Numero"
                      value={pedidoSemCadastro.numero}
                      onChange={handleInputChange}
                    />
                  </Typography>
                  <Typography
                    sx={{ display: "flex", flexDirection: "row" }}
                    variant="h6"
                  >
                    {" "}
                    <label>Ponto de Ref :</label>
                    <input
                      style={{
                        textTransform: "capitalize",
                        border: "1px #f16d2f solid",
                        borderRadius: "8px",
                        paddingLeft: ".5rem",
                        fontFamily: "Roboto",
                        fontWeight: "500",
                        marginLeft: ".5rem",
                      }}
                      spellCheck="false"
                      name="Referencia"
                      value={pedidoSemCadastro.referencia}
                      onChange={handleInputChange}
                    />
                  </Typography>

                  <Typography
                    sx={{ display: "flex", flexDirection: "row" }}
                    variant="h6"
                  >
                    {" "}
                    <label> Bairro:</label>
                    <input
                      style={{
                        textTransform: "capitalize",
                        border: "1px #f16d2f solid",
                        borderRadius: "8px",
                        paddingLeft: ".5rem",
                        fontFamily: "Roboto",
                        fontWeight: "500",
                        marginLeft: ".5rem",
                      }}
                      spellCheck="false"
                      name="Bairro"
                      value={pedidoSemCadastro.bairro}
                      onChange={handleInputChange}
                    />
                  </Typography>

                  <Typography
                    sx={{ display: "flex", flexDirection: "row" }}
                    variant="h6"
                  >
                    {" "}
                    <label>Cidade:</label>
                    <input
                      style={{
                        textTransform: "capitalize",
                        border: "1px #f16d2f solid",
                        borderRadius: "8px",
                        paddingLeft: ".5rem",
                        fontFamily: "Roboto",
                        fontWeight: "500",
                        marginLeft: ".5rem",
                      }}
                      spellCheck="false"
                      name="Cidade"
                      value={pedidoSemCadastro.cidade}
                      onChange={handleInputChange}
                    />
                  </Typography>

                  <Typography
                    sx={{ display: "flex", flexDirection: "row" }}
                    variant="h6"
                  >
                    {" "}
                    <label>Estado:</label>
                    <input
                      style={{
                        textTransform: "capitalize",
                        border: "1px #f16d2f solid",
                        borderRadius: "8px",
                        paddingLeft: ".5rem",
                        fontFamily: "Roboto",
                        fontWeight: "500",
                        marginLeft: ".5rem",
                      }}
                      spellCheck="false"
                      name="Estado"
                      value={pedidoSemCadastro.estado}
                      onChange={handleInputChange}
                    />
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          {selectedValueDelivery === "Retirada" && (
            <Box className="cardDeliveryAddress">
              <Box className="contentDeliveryAddress">
                <Box className="backgroundTitleAddressRetirada"></Box>
                <Typography variant="h6" className="editInformationAddress">
                  Retirar no Endereço
                </Typography>
                <Box className="addressData">
                  <Box className="addressData">
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      <span className="inputCheckout"> Cep: 61600-00</span>
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      <span className="inputCheckout">
                        Rua / AV: Alameda luiza
                      </span>
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      <span className="inputCheckout"> Casa/Apto: 300 B</span>
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      <span className="inputCheckout">
                        Ponto de Ref: Prox.a Lagoa
                      </span>
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      <span className="inputCheckout">
                        Bairro: Lagoa Do Banana
                      </span>
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
                      <span className="inputCheckout">Estado: CE</span>
                    </Typography>
                  </Box>
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
                    checked={selectedValuePayment === "Credito"}
                    onChange={handleChangePayment}
                    value="Credito"
                  />
                  <CreditCardOutlinedIcon />
                  <Typography variant="h6" sx={{ pl: 2 }}>
                    Cartão de Credito
                  </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Radio
                    checked={selectedValuePayment === "Debito"}
                    onChange={handleChangePayment}
                    value="Debito"
                  />
                  <CreditCardOutlinedIcon />
                  <Typography variant="h6" sx={{ pl: 2 }}>
                    Cartão de Debito
                  </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Radio
                    checked={selectedValuePayment === "Pix"}
                    onChange={handleChangePayment}
                    value="Pix"
                  />
                  <PixOutlinedIcon />
                  <Typography variant="h6" sx={{ pl: 2 }}>
                    Pix
                  </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Radio
                    checked={selectedValuePayment === "Dinheiro"}
                    onChange={handleChangePayment}
                    value="Dinheiro"
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "75%",
                height: "100%",
                alignItems: "left",
                justifyContent: "center",
                pl: 1,
                color: "#f9e9df",
              }}
            >
              <Typography style={{ fontSize: "12px", height: "auto" }}>
                + Entrega: R$ 3,00
              </Typography>
              <Typography variant="h6">
                {" "}
                Total:{useFormat(calculateSubtotal(cart))}
              </Typography>
            </Box>
            <input
              className="btnSendRequest click"
              type="submit"
              onClick={handleOpen}
            />
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
                    onClick={(handleClose, createWhatsAppMessage)}
                    className="btnCloseService click"
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
