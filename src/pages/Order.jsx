import {
  Alert,
  Box,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
  capitalize,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "@mui/base";
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

import { useCarrinho } from "../context/useCarrinho";
import { useFormat } from "../utils/useFormat";
import "./Order.css";

const opcaoObrigatoria = (
  <Typography variant="caption" style={{ color: "red", marginLeft: "5px" }}>
    Escolha uma opção
  </Typography>
);

const SignupSchema = yup.object().shape({
  formaDeEntrega: yup
    .string()
    .oneOf(["Entrega", "Retirada"])
    .required(opcaoObrigatoria),
  formaDePagamento: yup
    .string()
    .oneOf(["cartaoDeCredito", "cartaoDeDebito", "pix", "Dinheiro"])
    .required(opcaoObrigatoria),
});

const Order = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nomeLocalStorage, setNomeLocalStorage] = useState("");
  const [telefoneLocalStorage, setTelefoneLocalStorage] = useState("");
  const [cepLocalStorage, setCepLocalStorage] = useState("");
  const [ruaLocalStorage, setRuaLocalStorage] = useState("");
  const [casaLocalStorage, setCasaLocalStorage] = useState("");
  const [complementoLocalStorage, setComplementoLocalStorage] = useState("");
  const [bairroLocalStorage, setBairroLocalStorage] = useState("");
  const [cidadeLocalStorage, setCidadeLocalStorage] = useState("");
  const [estadoLocalStorage, setEstadoLocalStorage] = useState("");
  const { cart, calculateSubtotal } = useCarrinho();
  const [isChangeNeeded, setIsChangeNeeded] = useState(false);
  const [changeAmount, setChangeAmount] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const handleConfirmChangeAmount = () => {
    const confirmedChangeAmount = changeAmount;
    setIsModalOpen(false);
    console.log(confirmedChangeAmount);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = async (data) => {
    try {
      await SignupSchema.validate(data, { abortEarly: false });

      localStorage.getItem("formData", JSON.stringify(data));

      setShowAlert(true); // Mostra o alerta

      setTimeout(() => {
        setShowAlert(false); // Esconde o alerta após 2 segundos
        createWhatsAppMessage(data); // Chama a função createWhatsAppMessage com os dados
      }, 2000);
    } catch (error) {
      console.error("Erro de validação:", error);
    }
  };

  const handleDeliveryChange = (event) => {
    const value = event.target.value;

    const storedData = localStorage.getItem("formData");
    const formData = storedData ? JSON.parse(storedData) : {};

    formData.formaDeEntrega = value;

    localStorage.setItem("formData", JSON.stringify(formData));
  };

  const handleChangePayment = (event) => {
    const value = event.target.value;

    const storedData = localStorage.getItem("formData");
    const formData = storedData ? JSON.parse(storedData) : {};

    formData.formaDePagamento = value;

    localStorage.setItem("formData", JSON.stringify(formData));
  };

  function changeCondition() {
    setIsDisabled(!isDisabled);
  }

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setNomeLocalStorage(parsedData.nome);
      setTelefoneLocalStorage(parsedData.telefone);
      setCepLocalStorage(parsedData.cep);
      setRuaLocalStorage(parsedData.rua);
      setCasaLocalStorage(parsedData.casaApto);
      setComplementoLocalStorage(parsedData.complemento);
      setBairroLocalStorage(parsedData.bairro);
      setCidadeLocalStorage(parsedData.cidade);
      setEstadoLocalStorage(parsedData.estado);
    }
  }, []);

  const handleInputChange = (fieldName, value) => {
    switch (fieldName) {
      case "nome":
        setNomeLocalStorage(value);
        break;
      case "telefone":
        setTelefoneLocalStorage(value);
        break;
      case "cep":
        setCepLocalStorage(value);
        break;
      case "rua":
        setRuaLocalStorage(value);
        break;
      case "casaApto":
        setCasaLocalStorage(value);
        break;
      case "complemento":
        setComplementoLocalStorage(value);
        break;
      case "bairro":
        setBairroLocalStorage(value);
        break;
      case "cidade":
        setCidadeLocalStorage(value);
        break;
      case "estado":
        setEstadoLocalStorage(value);
        break;
      default:
        break;
    }

    const storedData = localStorage.getItem("formData");
    const formData = storedData ? JSON.parse(storedData) : {};
    formData[fieldName] = value;
    localStorage.setItem("formData", JSON.stringify(formData));
  };

  const horaAtual = new Date().getHours();
  let saudacao;
  if (horaAtual >= 5 && horaAtual < 12) {
    saudacao = "bom dia";
  } else if (horaAtual >= 12 && horaAtual < 18) {
    saudacao = "boa tarde";
  } else {
    saudacao = "boa noite";
  }

  const createWhatsAppMessage = () => {
    const formaDeEntregaEscolhida = localStorage.getItem("formData");
    const formData = formaDeEntregaEscolhida
      ? JSON.parse(formaDeEntregaEscolhida)
      : {};
    const formaDeEntrega = formData.formaDeEntrega;
    console.log(formaDeEntrega);

    const sessionStorageData = JSON.parse(
      sessionStorage.getItem("itensSelecionados")
    );
    const totalValue = calculateSubtotal(cart);

    if (totalValue === 0) {
      alert(
        "Carrinho vazio. Adicione itens ao carrinho antes de enviar o pedido."
      );
      return;
    }
    const pedidoNumero = Math.floor(Math.random() * 1000);
    const pedidoTexto =
      pedidoNumero <= 99
        ? pedidoNumero.toString().padStart(2, "0")
        : pedidoNumero.toString();

    if (formaDeEntrega === "Entrega") {
      let message = `Olá ${saudacao},\n\n`;
      message += `Me chamo ${capitalize(formData.nome)},\n`;
      message += `meu telefone é: ${formData.telefone}\n\n`;
      message += "Esse é o meu pedido:\n";
      message += "---------------------------------------\n";
      message += `Pedido: ${pedidoTexto}\n`;
      message += "---------------------------------------\n";

      sessionStorageData.forEach((item, index) => {
        message += `Item: ${item.sabor}\n`;
        message += `Valor: R$ ${item.valor}\n`;
        message += `Quantidade: ${item.quantidade}\n`;

        if (item.refrigeranteDoCombo) {
          message += `Refrigerante do Combo: ${item.refrigeranteDoCombo}\n`;
        }
        if (item.opicionais) {
          message += `Opcionais: ${item.opicionais}\n`;
        }
        if (
          item.valorSelecionado === undefined ||
          item.valorSelecionado === "" ||
          item.valorSelecionado === 0
        ) {
          message += `Valor do opcional: Grátis\n`;
          console.log(item.valorSelecionado);
        } else {
          message += `Valor do opcional: R$ ${item.valorSelecionado}\n`;
        }
        if (item.adicionais && item.adicionais.length > 0) {
          message += "Adicionais:\n";

          item.adicionais.forEach((adicional, i) => {
            message += `(${adicional.qtde}x) ${adicional.name}`;

            if (i < item.adicionais.length - 1) {
              message += "\n";
            }
          });
        }

        if (item.valorTotalAdicionais) {
          message += `\nValor dos adicionais: R$ ${item.valorTotalAdicionais.toFixed(
            2
          )}\n`;
        }
        message += `Valor total do item: R$ ${item.valorTotalDoProduto.toFixed(
          2
        )}\n`;

        if (item.observacao) {
          message += `Observação: ${item.observacao}\n`;
        }
        if (index < sessionStorageData.length - 1) {
          message += "---------------------------------------\n";
        }
      });

      message += "---------------------------------------\n";
      message += `Endereço :\n`;
      message += `CEP: ${formData.cep}\n`;
      message += `Rua: ${formData.rua}\n`;
      message += `Numero: ${formData.casaApto}\n`;
      if (formData.complemento === "") {
        console.log("nao tem complemento");
      } else {
        message += `Ponto de Referencia: ${formData.complemento}\n`;
      }
      message += `Bairro: ${formData.bairro}\n`;
      message += `Cidade: ${formData.cidade}\n`;
      message += `Estado: ${formData.estado}\n`;

      message += "---------------------------------------\n";
      message += `Forma de Pagamento: ${formData.formaDePagamento}\n`;
      message += `Entrega ou Retirada: ${formData.formaDeEntrega}\n`;

      if (isChangeNeeded === false) {
        message += "---------------------------------------\n";
        message += `Valor Total: R$ ${totalValue.toFixed(2)}\n\n`;
      } else {
        message += "---------------------------------------\n";
        message += `Valor Total: R$ ${totalValue.toFixed(2)}\n`;
        message += `Troco para: R$ ${changeAmount}\n\n`;
      }

      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://api.whatsapp.com/send?phone=5585982168756&text=${encodedMessage}`;
      window.open(whatsappLink);
    } else {
      let message = `Olá ${saudacao},\n\n`;
      message += `Me chamo ${capitalize(formData.nome)},\n`;
      message += `meu telefone é: ${formData.telefone}\n\n`;
      message += "Esse é o meu pedido:\n";
      message += "---------------------------------------\n";
      message += `Pedido: ${pedidoTexto}\n`;
      message += "---------------------------------------\n";

      sessionStorageData.forEach((item, index) => {
        message += `Item: ${item.sabor}\n`;
        message += `Valor: R$ ${item.valor}\n`;
        message += `Quantidade: ${item.quantidade}\n`;

        if (item.refrigeranteDoCombo) {
          message += `Refrigerante do Combo: ${item.refrigeranteDoCombo}\n`;
        }
        if (item.opicionais) {
          message += `Opcionais: ${item.opicionais}\n`;
        }
        if (
          item.valorSelecionado === undefined ||
          item.valorSelecionado === "" ||
          item.valorSelecionado === 0
        ) {
          message += `Valor do opcional: Grátis\n`;
          console.log(item.valorSelecionado);
        } else {
          message += `Valor do opcional: R$ ${item.valorSelecionado}\n`;
        }
        if (item.adicionais && item.adicionais.length > 0) {
          message += "Adicionais:\n";

          item.adicionais.forEach((adicional, i) => {
            message += `(${adicional.qtde}x) ${adicional.name}`;

            if (i < item.adicionais.length - 1) {
              message += "\n";
            }
          });
        }

        if (item.valorTotalAdicionais) {
          message += `\nValor dos adicionais: R$ ${item.valorTotalAdicionais.toFixed(
            2
          )}\n`;
        }
        message += `Valor total do item: R$ ${item.valorTotalDoProduto.toFixed(
          2
        )}\n`;

        if (item.observacao) {
          message += `Observação: ${item.observacao}\n`;
        }
        if (index < sessionStorageData.length - 1) {
          message += "---------------------------------------\n";
        }
      });

      message += "---------------------------------------\n";
      message += `Forma de Pagamento: ${formData.formaDePagamento}\n`;
      message += `Entrega ou Retirada: ${formData.formaDeEntrega}\n`;

      if (isChangeNeeded === false) {
        message += "---------------------------------------\n";
        message += `Valor Total: R$ ${totalValue.toFixed(2)}\n\n`;
      } else {
        message += "---------------------------------------\n";
        message += `Valor Total: R$ ${totalValue.toFixed(2)}\n`;
        message += `Troco para: R$ ${changeAmount}\n\n`;
      }

      message += "---------------------------------------\n";
      message +=
        "Ahh escolhi a opção de retirada , então ja sei que o endereco é:\n";
      message +=
        "Rua: Rua das maravilhas\nNúmero: 194\nPonto de referência: próximo ao campo da luz\nCidade: Caucaia\n\n";
      message +=
        "Qualquer duvida eu acesso por essa localização pelo Google Maps:\nhttps://maps.app.goo.gl/6hMUzge2SxM1zGks9";

      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://api.whatsapp.com/send?phone=5585982168756&text=${encodedMessage}`;
      window.open(whatsappLink);
    }
  };
  return (
    <Box
      sx={{
        overflow: "auto",
        position: "relative",
        height: "100dvh",
        width: "100%",
        backgroundColor: "#f46c26",
      }}
    >
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
              <Box
                sx={{
                  position: "absolute",
                  top: "0",
                  width: "13rem",
                  height: "2.2rem",
                  background: "rgba(0, 0, 0, 0.87)",
                  borderRadius: "0 30px 0px 0px",
                }}
              ></Box>
              <Typography variant="h6" className="editInformation">
                Quem pediu
                <Button
                  onClick={changeCondition}
                  className="btnEditInformation"
                >
                  {isDisabled ? "Salvar" : "Editar"}
                </Button>
              </Typography>
              <Box className="nameAndTelephone">
                {isDisabled ? (
                  <>
                    <Typography
                      sx={{ display: "flex", flexDirection: "row" }}
                      variant="h6"
                    >
                      <label>Nome: </label>
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
                        type="text"
                        name="nome"
                        value={nomeLocalStorage}
                        onChange={(e) =>
                          handleInputChange("nome", e.target.value)
                        }
                      />
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "row" }}
                      variant="h6"
                    >
                      <label>Telefone:</label>
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
                        mask="99 9 99999999"
                        maskChar={null}
                        type="text"
                        name="telefone"
                        value={telefoneLocalStorage}
                        onChange={(e) =>
                          handleInputChange("telefone", e.target.value)
                        }
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
                        <Typography
                          variant="h6"
                          sx={{ textTransform: "capitalize" }}
                        >
                          Nome: {nomeLocalStorage}
                        </Typography>
                      </span>
                      <span>
                        <Typography variant="h6">
                          Telefone: {telefoneLocalStorage}
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
                justifyContent: "space-between",
                height: "100%",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "0",
                  width: "13rem",
                  height: "2.1rem",
                  background: "rgba(0, 0, 0, 0.87)",
                  borderRadius: "0 30px 0px 0px",
                }}
              ></Box>
              <Typography variant="h6" className="editInformation">
                Forma de Entrega
              </Typography>

              <RadioGroup
                sx={{ paddingLeft: "1.2rem" }}
                name="formaDeEntrega"
                onChange={handleDeliveryChange}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <FormControlLabel
                    value="Entrega"
                    name="Entrega"
                    {...register("formaDeEntrega")}
                    control={<Radio />}
                    label={
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <DeliveryDiningOutlinedIcon />
                          <Typography variant="h6" sx={{ pl: 2 }}>
                            Entrega
                          </Typography>
                        </Box>
                      </>
                    }
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <FormControlLabel
                    value="Retirada"
                    name="Retirada"
                    {...register("formaDeEntrega")}
                    control={<Radio />}
                    label={
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <StorefrontOutlinedIcon />
                          <Typography variant="h6" sx={{ pl: 2 }}>
                            Retirar no local
                          </Typography>
                        </Box>
                      </>
                    }
                  />
                </Box>
              </RadioGroup>
              {errors.formaDeEntrega && (
                <p className="error-message">{errors.formaDeEntrega.message}</p>
              )}
            </Box>
          </Box>

          <Box className="cardDeliveryAddress">
            <Box className="contentDeliveryAddress">
              <Box
                sx={{
                  position: "absolute",
                  top: "1rem",
                  width: "15rem",
                  height: "2.8rem",
                  background: "rgba(0, 0, 0, 0.87)",
                  borderRadius: "0 30px 0px 0px",
                }}
              ></Box>
              <Typography variant="h6" className="editInformationAddress">
                Entregar no Endereço
                <Button
                  onClick={changeCondition}
                  className="btnEditInformation"
                >
                  {isDisabled ? "Salvar" : "Editar"}
                </Button>
              </Typography>
              <Box className="addressData">
                {isDisabled ? (
                  <>
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
                        type="text"
                        name="cep"
                        value={cepLocalStorage}
                        onChange={(e) =>
                          handleInputChange("cep", e.target.value)
                        }
                      />
                    </Typography>

                    <Typography
                      sx={{ display: "flex", flexDirection: "row" }}
                      variant="h6"
                    >
                      <label>Rua / Av :</label>
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
                        type="text"
                        name="rua"
                        value={ruaLocalStorage}
                        onChange={(e) =>
                          handleInputChange("rua", e.target.value)
                        }
                      />
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "row" }}
                      variant="h6"
                    >
                      <label>Casa/Apto :</label>
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
                        type="text"
                        name="casaApto"
                        value={casaLocalStorage}
                        onChange={(e) =>
                          handleInputChange("casaApto", e.target.value)
                        }
                      />
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "row" }}
                      variant="h6"
                    >
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
                        type="text"
                        name="complemento"
                        value={complementoLocalStorage}
                        onChange={(e) =>
                          handleInputChange("complemento", e.target.value)
                        }
                      />
                    </Typography>

                    <Typography
                      sx={{ display: "flex", flexDirection: "row" }}
                      variant="h6"
                    >
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
                        type="text"
                        name="bairro"
                        value={bairroLocalStorage}
                        onChange={(e) =>
                          handleInputChange("bairro", e.target.value)
                        }
                      />
                    </Typography>

                    <Typography
                      sx={{ display: "flex", flexDirection: "row" }}
                      variant="h6"
                    >
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
                        type="text"
                        name="cidade"
                        value={cidadeLocalStorage}
                        onChange={(e) =>
                          handleInputChange("cidade", e.target.value)
                        }
                      />
                    </Typography>

                    <Typography
                      sx={{ display: "flex", flexDirection: "row" }}
                      variant="h6"
                    >
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
                        type="text"
                        name="estado"
                        value={estadoLocalStorage}
                        onChange={(e) =>
                          handleInputChange("estado", e.target.value)
                        }
                      />
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      <span className="inputCheckout">
                        Cep: {cepLocalStorage}
                      </span>
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      <span className="inputCheckout">
                        Rua / AV: {ruaLocalStorage}
                      </span>
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      <span className="inputCheckout">
                        Casa/Apto:{casaLocalStorage}
                      </span>
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      <span className="inputCheckout">
                        Ponto de Ref: {complementoLocalStorage}
                      </span>
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      <span className="inputCheckout">
                        Bairro: {bairroLocalStorage}
                      </span>
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      <span className="inputCheckout">
                        Cidade: {cidadeLocalStorage}
                      </span>
                    </Typography>
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      variant="h6"
                    >
                      <span className="inputCheckout">
                        Estado: {estadoLocalStorage}
                      </span>
                    </Typography>
                  </>
                )}
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
              <Box className="backgroundTitleFormPayment"></Box>
              <Typography variant="h6" className="editInformation">
                Forma de Pagamento
              </Typography>
              <Box className="FormOfPayment">
                <RadioGroup
                  sx={{ paddingLeft: "1.2rem" }}
                  name="formaDePagamento"
                  onChange={handleChangePayment}
                >
                  <FormControlLabel
                    sx={{ alignItems: "baseline" }}
                    value="cartaoDeCredito"
                    name="cartao de credito"
                    {...register("formaDePagamento")}
                    control={<Radio />}
                    label={
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <CreditCardOutlinedIcon />
                          <Typography variant="h6" sx={{ pl: 2 }}>
                            Cartão de Crédito
                          </Typography>
                        </Box>
                      </>
                    }
                  />

                  <FormControlLabel
                    sx={{ alignItems: "baseline" }}
                    value="cartaoDeDebito"
                    name="cartao de debito"
                    {...register("formaDePagamento")}
                    control={<Radio />}
                    label={
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <CreditCardOutlinedIcon />
                          <Typography variant="h6" sx={{ pl: 2 }}>
                            Cartão de Debito
                          </Typography>
                        </Box>
                      </>
                    }
                  />

                  <FormControlLabel
                    sx={{ alignItems: "baseline" }}
                    value="pix"
                    name="pix"
                    {...register("formaDePagamento")}
                    control={<Radio />}
                    label={
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <PixOutlinedIcon />
                          <Typography variant="h6" sx={{ pl: 2 }}>
                            Pix
                          </Typography>
                        </Box>
                      </>
                    }
                  />

                  <FormControlLabel
                    sx={{ alignItems: "baseline" }}
                    value="Dinheiro"
                    name="Dinheiro"
                    {...register("formaDePagamento")}
                    control={<Radio />}
                    label={
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <AttachMoneyIcon />
                          <Typography variant="h6" sx={{ pl: 2 }}>
                            Dinheiro
                          </Typography>
                        </Box>
                      </>
                    }
                    onChange={() => setIsModalOpen(true)} // Abre o modal quando o rádio é selecionado
                  />
                </RadioGroup>
                {errors.formaDePagamento && (
                  <p className="error-message">
                    {errors.formaDePagamento.message}
                  </p>
                )}
              </Box>
            </Box>
          </Box>

          <Box sx={{ mb: 2, width: "90%" }}>
            {showAlert && (
              <Alert
                severity="success"
                sx={{ width: "100%", alignItems: "center" }}
              >
                <Typography>
                  Pedido realizado com sucesso. <br />
                  Muito obrigado!
                </Typography>
              </Alert>
            )}
          </Box>

          <Box className="totalPurchase">
            <Box className="contentTotalPurchase">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "75%",
                  height: "100%",
                  alignItems: "left",
                  justifyContent: "center",
                  pl: 1,
                }}
              >
                <Typography variant="h6">
                  Total:{useFormat(calculateSubtotal(cart))}
                </Typography>
              </Box>
              <input className="btnSendRequest click" type="submit" />
            </Box>
          </Box>
        </Box>

        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          aria-labelledby="confirmation-modal-title"
          aria-describedby="confirmation-modal-description"
        >
          <Box
            sx={{
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
              backgroundColor: "#fae9de",
              position: " absolute",
              top: " 50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: " 90%",
              maxWidth: "600px",
              height: "15rem",
              minHeight: " 100px",
              border: "6px solid #e5c7b3",
              borderRadius: " 30px",
              boxShadow: "5px 4px 5px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography variant="h6" id="confirmation-modal-title">
              Sua compra deu: {useFormat(calculateSubtotal(cart))}
            </Typography>
            {isChangeNeeded ? (
              <>
                <Typography
                  sx={{
                    height: "auto",
                  }}
                  variant="body2"
                  gutterBottom
                >
                  Troco para
                </Typography>
                <InputMask
                  className="box-shadow"
                  mask="R$ 999"
                  maskChar={null}
                  style={{
                    border: "1px #f46c26 solid",
                    height: "2rem",
                    borderRadius: "5px",
                    paddingLeft: "1rem",
                  }}
                  label="Valor do Troco"
                  value={changeAmount}
                  onChange={(e) => setChangeAmount(e.target.value)}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexDirection: "row-reverse",
                    width: "100%",
                  }}
                >
                  <button
                    className="click box-shadow"
                    style={{
                      textTransform: "uppercase",
                      backgroundColor: "#f46c26",
                      color: "white",
                      border: "1px solid #f46c26",
                      height: "2rem",
                      borderRadius: "5px",
                      fontFamily: "Roboto",
                      fontSize: "16px",
                      width: "10rem",
                    }}
                    onClick={() => handleConfirmChangeAmount()}
                  >
                    Confirmar troco
                  </button>
                  <button
                    className="click box-shadow"
                    style={{
                      textTransform: "uppercase",
                      backgroundColor: "#f46c26",
                      color: "white",
                      border: "1px solid #f46c26",
                      height: "2rem",
                      borderRadius: "5px",
                      fontFamily: "Roboto",
                      fontSize: "16px",
                      width: "5rem",
                    }}
                    onClick={() => setIsChangeNeeded(false)}
                  >
                    Voltar
                  </button>
                </Box>
              </>
            ) : (
              <>
                <button
                  className="click box-shadow"
                  style={{
                    textTransform: "uppercase",
                    backgroundColor: "#f46c26",
                    color: "white",
                    border: "1px solid #f46c26",
                    height: "2rem",
                    borderRadius: "5px",
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    width: "12rem",
                  }}
                  onClick={() => handleConfirmChangeAmount()}
                >
                  Não preciso de troco
                </button>
                <button
                  className="click box-shadow"
                  style={{
                    textTransform: "uppercase",
                    backgroundColor: "#f46c26",
                    color: "white",
                    border: "1px solid #f46c26",
                    height: "2rem",
                    borderRadius: "5px",
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    width: "10rem",
                  }}
                  onClick={() => setIsChangeNeeded(true)}
                >
                  Preciso de troco
                </button>
              </>
            )}
          </Box>
        </Modal>
      </form>
    </Box>
  );
};

export default Order;
