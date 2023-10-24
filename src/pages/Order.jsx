import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
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
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useCarrinho } from "../context/useCarrinho";
import { useFormat } from "../utils/useFormat";
import "./Order.css";

const Order = () => {
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
  const [isDisabled, setIsDisabled] = useState(false);
  const [open, setOpen] = useState(false);
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
  const [selectedValueDelivery, setSelectedValueDelivery] =
    useState("delivery");
  const [selectedValuePayment, setSelectedValuePayment] =
    useState("cartaoDeCredito");

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = (data) => {
    localStorage.setItem("formData", JSON.stringify(data));
    console.log(data);
  };
  const handleDeliveryChange = (event) => {
    const value = event.target.value;
    setSelectedValueDelivery(value);

    const storedData = localStorage.getItem("formData");
    const formData = storedData ? JSON.parse(storedData) : {};

    formData.formaDeEntrega = value;

    localStorage.setItem("formData", JSON.stringify(formData));
  };

  const handleChangePayment = (event) => {
    const value = event.target.value;
    setSelectedValuePayment(value);

    const storedData = localStorage.getItem("formData");
    const formData = storedData ? JSON.parse(storedData) : {};

    formData.formaDePagamento = value;

    localStorage.setItem("formData", JSON.stringify(formData));
  };

  function changeCondition() {
    setIsDisabled(!isDisabled);
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const storedSelectedDelivery = localStorage.getItem("selectedDelivery");
    if (storedSelectedDelivery) {
      setSelectedValueDelivery(storedSelectedDelivery);
    }

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
      setSelectedValueDelivery(parsedData.formaDeEntrega || "delivery");
      setSelectedValuePayment(parsedData.formaDePagamento || "cartaoDeCredito");
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

  const createWhatsAppMessage = () => {
    const sessionStorageData = JSON.parse(
      sessionStorage.getItem("itensSelecionados")
    );

    if (sessionStorageData) {
      const formData = JSON.parse(localStorage.getItem("formData"));

      if (!formData) {
        console.error(
          "Os dados do formulário não foram encontrados no Local Storage."
        );
        return;
      }

      const { nome, telefone } = formData;

      let message = `Olá ${nome},\n\nTelefone: ${telefone}\n\n---------------------------------------\nPedido:\n---------------------------------------\n`;

      const items = sessionStorageData.map((item, index) => {
        return `Item ${index + 1}:\nSabor: ${item.sabor}\nQuantidade: ${
          item.quantidade
        }\nPreço: R$ ${item.valor.toFixed(2)}\n`;
      });

      message += `CEP: ${formData.cep || ""}\n`;
      message += `Casa/Apto: ${formData.casaApto || ""}\n`;
      message += `Rua: ${formData.rua || ""}\n`;
      message += `Complemento: ${formData.complemento || ""}\n`;
      message += `Bairro: ${formData.bairro || ""}\n`;
      message += `Cidade: ${formData.cidade || ""}\n`;
      message += `Estado: ${formData.estado || ""}\n`;

      message += `---------------------------------------\n`;
      message += `Forma de Pagamento: ${formData.formaDePagamento || ""}\n`;
      message += `Forma de Entrega: ${formData.formaDeEntrega || ""}\n`;
      message += `---------------------------------------\n`;

      message += `${items.join("\n")}\n`;

      const totalValue = calculateSubtotal(cart);
      message += `Valor Total: R$ ${totalValue.toFixed(2)}`;

      const formattedPhoneNumber = telefone.replace(/\s+/g, "");

      const whatsappLink = `https://api.whatsapp.com/send?phone=55${formattedPhoneNumber}&text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappLink);
    }
  };
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
              
              <Box className="backgroundTitle"></Box>
              <Typography variant="h6" className="editInformation">
                Quem pediu
                <Button
                  onClick={changeCondition}
                  className="btnEditInformation"
                >
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
                justifyContent: "space-around",
                height: "100%",
                width: "100%",
              }}
            >
              <Box className="backgroundTitleDelivery"></Box>
              <Typography variant="h6" className="editInformation">
                Forma de Entrega
              </Typography>

              <RadioGroup
                sx={{ paddingLeft: "1.2rem" }}
                name="formaDeEntrega"
                value={selectedValueDelivery}
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
                    value="delivery"
                    name="delivery"
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
                            Delivery
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
          )}

          {selectedValueDelivery === "Retirada" && (
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
              
              <Box className="backgroundTitleFormPayment"></Box>
              <Typography variant="h6" className="editInformation">
                Forma de Pagamento
              </Typography>
              <Box className="FormOfPayment">
                <RadioGroup
                  sx={{ paddingLeft: "1.2rem" }}
                  name="formaDePagamento"
                  value={selectedValuePayment}
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
                    value="dinheiro"
                    name="dinheiro"
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
                  />
                </RadioGroup>
              </Box>
            </Box>
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
                <Typography style={{ fontSize: "12px", height: "auto" }}>
                  + Entrega: R$ 3,00
                </Typography>
                <Typography variant="h6">
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
                    
                    <Box
                      className="checkmark__circle"
                      cx="26"
                      cy="26"
                      r="25"
                    ></Box>
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
