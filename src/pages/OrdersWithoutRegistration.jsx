import { Alert, Box, Typography } from "@mui/material";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { NavLink } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCarrinho } from "../context/useCarrinho";
import { useFormat } from "../utils/useFormat";
import InputMask from "react-input-mask";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import PixOutlinedIcon from "@mui/icons-material/PixOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import "./Order.css";

const schema = yup
  .object({
    estado: yup.string().required(
      <Typography variant="caption" style={{ color: "red", marginLeft: "5px" }}>
        Campo obrigatório
      </Typography>
    ),
    cidade: yup.string().required(
      <Typography variant="caption" style={{ color: "red", marginLeft: "5px" }}>
        Campo obrigatório
      </Typography>
    ),
    bairro: yup.string().required(
      <Typography variant="caption" style={{ color: "red", marginLeft: "5px" }}>
        Campo obrigatório
      </Typography>
    ),
    complemento: yup.string(),
    casaApto: yup.string().required(
      <Typography variant="caption" style={{ color: "red", marginLeft: "5px" }}>
        Campo obrigatório
      </Typography>
    ),
    rua: yup.string().required(
      <Typography variant="caption" style={{ color: "red", marginLeft: "5px" }}>
        Campo obrigatório
      </Typography>
    ),
    cep: yup.string().required(
      <Typography variant="caption" style={{ color: "red", marginLeft: "5px" }}>
        Campo obrigatório
      </Typography>
    ),
    telefone: yup
      .number()
      .required()
      .typeError(
        <Typography
          variant="caption"
          style={{ color: "red", marginLeft: "5px" }}
        >
          Campo obrigatório
        </Typography>
      ),
    nome: yup.string().required(
      <Typography variant="caption" style={{ color: "red", marginLeft: "5px" }}>
        Campo obrigatório
      </Typography>
    ),
    formaDePagamento: yup.string().required(
      <Typography variant="caption" style={{ color: "red", marginLeft: "5px" }}>
        Escolha um das formas de pagamento
      </Typography>
    ),
    formaDeEntrega: yup.string().required(
      <Typography variant="caption" style={{ color: "red", marginLeft: "5px" }}>
        Escolha uma Opção
      </Typography>
    ),
  })
  .required();

const Order = () => {
  const { cart, calculateSubtotal } = useCarrinho();
  const [showAlert, setShowAlert] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    getValues,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const horaAtual = new Date().getHours();

  let saudacao;
  if (horaAtual >= 5 && horaAtual < 12) {
    saudacao = "Bom dia";
  } else if (horaAtual >= 12 && horaAtual < 18) {
    saudacao = "Boa tarde";
  } else {
    saudacao = "Boa noite";
  }

  const createWhatsAppMessage = (data) => {
    const sessionStorageData = JSON.parse(
      sessionStorage.getItem("itensSelecionados")
    );

    if (sessionStorageData) {
      let message = ` Olá, ${saudacao} ${data.nome},\n\nTelefone: ${data.telefone}\n\n---------------------------------------\n`;

      const itemsPedido = sessionStorageData.map((item) => {
        const sabor = [item.sabor];
        const pedido = sabor.map((itemPedido) => ` ${itemPedido}`);
        return pedido;
      });
      message += `Pedido: ${itemsPedido}\n---------------------------------------\n`;

      message += `CEP: ${data.cep}\n`;

      message += `Numero: ${data.casaApto}\n`;

      message += `Rua: ${data.rua}\n`;
      message += `Complemento: ${data.complemento}\n`;
      message += `Bairro: ${data.bairro}\n`;
      message += `Cidade: ${data.cidade}\n`;
      message += `Estado: ${data.estado}\n`;

      message += `---------------------------------------\n`;

      message += `Forma de Pagamento: ${data.formaDePagamento}\n`;
      message += `Forma de Entrega: ${data.formaDeEntrega}\n`;

      const totalValue = calculateSubtotal(cart);
      message += `Valor Total: R$ ${totalValue.toFixed(2)}`;
      console.log(message);

      const whatsappLink = `https://api.whatsapp.com/send?phone=5585988154685&text=${message}`;

      window.open(whatsappLink);
    } else {
      alert("Não existe itens no carrinho");
    }
  };
  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep === "") {
      setValue("address");
      setValue("casaApto");
      setValue("addresscomplement");
      setValue("neighborhood");
      setValue("city");
      setValue("uf");
      console.log(e);
    } else {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          setValue("cep", data.cep);
          setValue("rua", data.logradouro);
          setValue("bairro", data.bairro);
          setValue("cidade", data.localidade);
          setValue("estado", data.uf);
          setFocus("casaApto");
        });
    }
  };

  const onSubmit = (data) => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      createWhatsAppMessage(data);
    }, 2000);
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
      <Box
        sx={{
          height: "8%",
          width: "100%",
          display: "flex",
          flexDirection: " row",
          alignItems: "center",
        }}
      >
        <Box className="iconAndText">
          <NavLink to="/" style={{ color: "#f9e9df" }}>
            <ArrowBackIcon />
          </NavLink>
          <Typography variant="h6">Checkout</Typography>
        </Box>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "74rem",
            backgroundColor: "#f9e9df",
            position: " relative",
            bottom: "0",
            borderRadius: "25px 25px 0 0",
            justifyContent: "flex-start",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "10rem",
            }}
          >
            <Box
              sx={{
                display: " flex",
                width: "100%",
                height: " 100%",
                alignContent: "stretch",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  width: "13rem",
                  height: "2.08rem",
                  background: "rgba(0, 0, 0, 0.87)",
                  borderRadius: "0 30px 0px 0px",
                }}
              ></Box>
              <Typography variant="h6" className="editInformation">
                Quem pediu
              </Typography>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: " flex-start",
                  justifyContent: "space-evenly",
                  paddingLeft: "16px",
                  color: "#070707",
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
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
                    {...register("nome")}
                  />
                </Typography>
                <p>{errors.nome?.message}</p>
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                  variant="h6"
                >
                  <label>Telefone:</label>
                  <InputMask
                    mask="99 9 99999999"
                    maskChar={null}
                    style={{
                      textTransform: "capitalize",
                      border: "1px #f16d2f solid",
                      borderRadius: "8px",
                      paddingLeft: ".5rem",
                      fontFamily: "Roboto",
                      fontWeight: "500",
                      marginLeft: ".5rem",
                    }}
                    {...register("telefone")}
                  />
                </Typography>
                <p>{errors.telefone?.message}</p>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: " 100%",
              height: " 9rem",
              position: " relative",
            }}
          >
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
                  width: "13rem",
                  height: "2rem",
                  background: "rgba(0, 0, 0, 0.87)",
                  borderRadius: "0 30px 0px 0px",
                }}
              ></Box>
              <Typography variant="h6" className="editInformation">
                Forma de Entrega
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  color: " #0f0f0f",
                }}
              >
                <Box display={"flex"} width={"100%"} alignItems={"center"}>
                  <Controller
                    name="formaDeEntrega"
                    control={control}
                    render={({ field }) => (
                      <Box
                        sx={{
                          display: "flex",
                          width: "100%",
                          height: " 100%",
                        }}
                      >
                        <Box
                          sx={{
                            pl: 2,
                            display: "flex",
                            height: "100%",
                            width: "100%",
                            flexDirection: "column",
                            justifyContent: "space-around",
                          }}
                        >
                          <label>
                            <Typography
                              variant="h6"
                              sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <input
                                type="radio"
                                {...field}
                                value="Entrega"
                                style={{
                                  width: " 1.2rem",
                                  height: "1.2rem",
                                }}
                              />
                              <DeliveryDiningOutlinedIcon />
                              Entrega
                            </Typography>
                          </label>

                          <label>
                            <Typography
                              variant="h6"
                              sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <input
                                type="radio"
                                {...field}
                                value="Retirada"
                                style={{
                                  width: " 1.2rem",
                                  height: "1.2rem",
                                }}
                              />
                              <StorefrontOutlinedIcon />
                              Retirar no local
                            </Typography>
                          </label>
                          <p>{errors.formaDeEntrega?.message}</p>
                        </Box>
                      </Box>
                    )}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "40rem",
              minHeight: "32rem",
            }}
          >
            <Box className="contentDeliveryAddress">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: " absolute",
                  top: "0",
                  width: "14rem",
                  height: "2.7rem",
                  background: "rgba(0, 0, 0, 0.87)",
                  borderRadius: " 0 30px 0px 0px",
                }}
              ></Box>
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  paddingLeft: " 5%",
                  paddingRight: "5%",
                  alignItems: "flex-end",
                  width: "100%",
                  height: "0.9rem",
                  color: "#f9e9df",
                  borderBottom: " 1px #0a0a0a solid",
                  zIndex: "1",
                }}
              >
                Entregar no Endereço
              </Typography>
              <Box className="addressData">
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: " wrap",
                  }}
                  variant="h6"
                >
                  <label>Cep:</label>
                  <InputMask
                    mask="99999-999"
                    maskChar={null}
                    {...register("cep")}
                    style={{
                      textTransform: "capitalize",
                      border: "1px #f16d2f solid",
                      borderRadius: "8px",
                      paddingLeft: ".5rem",
                      fontFamily: "Roboto",
                      fontWeight: "500",
                      marginLeft: ".5rem",
                    }}
                    onBlur={checkCEP}
                    name="cep"
                  />

                  <p>{errors.cep?.message}</p>
                </Typography>

                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: " wrap",
                  }}
                  variant="h6"
                >
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
                    {...register("rua")}
                    name="rua"
                  />
                  {errors.rua?.message && !getValues("rua") && (
                    <p>{errors.rua?.message}</p>
                  )}
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: " wrap",
                  }}
                  variant="h6"
                >
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
                    {...register("casaApto")}
                  />
                  <p>{errors.casaApto?.message}</p>
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: " wrap",
                  }}
                  variant="h6"
                >
                  <label>Complemento :</label>
                  <input
                    style={{
                      textTransform: "capitalize",
                      border: "1px #f16d2f solid",
                      borderRadius: "8px",
                      paddingLeft: ".5rem",
                      fontFamily: "Roboto",
                      fontWeight: "500",
                      marginLeft: ".5rem",
                      maxWidth: "50%",
                    }}
                    {...register("complemento")}
                  />
                  <p>{errors.complemento?.message}</p>
                </Typography>

                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: " wrap",
                  }}
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
                    spellCheck="false"
                    name="Bairro"
                    {...register("bairro")}
                  />
                  <p>{errors.bairro?.message}</p>
                </Typography>

                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: " wrap",
                  }}
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
                    spellCheck="false"
                    name="Cidade"
                    {...register("cidade")}
                  />
                  <p>{errors.cidade?.message}</p>
                </Typography>

                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: " wrap",
                  }}
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
                    spellCheck="false"
                    name="Estado"
                    {...register("estado")}
                  />
                  <p>{errors.estado?.message}</p>
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
              <Box
                sx={{
                  position: " absolute",
                  top: "0",
                  width: " 15rem",
                  height: "2.08rem",
                  background: "rgba(0, 0, 0, 0.87)",
                  borderRadius: "0 30px 0px 0px",
                  zIndex: "1",
                }}
              ></Box>
              <Typography variant="h6" className="editInformation">
                Forma de Pagamento
              </Typography>
              <Box
                sx={{
                  display: " flex",
                  flexDirection: "column",
                  height: "100%",
                  width: " 100%",
                  justifyContent: "space-around",
                  color: " #070707",
                }}
              >
                <Controller
                  name="formaDePagamento"
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        height: " 100%",
                      }}
                    >
                      <Box
                        sx={{
                          pl: 2,
                          display: "flex",
                          height: "100%",
                          width: "100%",
                          flexDirection: "column",
                          justifyContent: "space-around",
                        }}
                      >
                        <label>
                          <Typography
                            variant="h6"
                            sx={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <input
                              type="radio"
                              {...field}
                              value="Credito"
                              style={{
                                width: " 1.2rem",
                                height: "1.2rem",
                              }}
                            />
                            <CreditCardOutlinedIcon />
                            Cartão de Crédito
                          </Typography>
                        </label>

                        <label>
                          <Typography
                            variant="h6"
                            sx={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <input
                              type="radio"
                              {...field}
                              value="Debito"
                              style={{
                                width: " 1.2rem",
                                height: "1.2rem",
                              }}
                            />
                            <CreditCardOutlinedIcon />
                            Cartão de Débito
                          </Typography>
                        </label>

                        <label>
                          <Typography
                            variant="h6"
                            sx={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <input
                              type="radio"
                              {...field}
                              value="Pix"
                              style={{
                                width: " 1.2rem",
                                height: "1.2rem",
                              }}
                            />
                            <PixOutlinedIcon />
                            Pix
                          </Typography>
                        </label>

                        <label>
                          <Typography
                            variant="h6"
                            sx={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <input
                              type="radio"
                              {...field}
                              value="Dinheiro"
                              style={{
                                width: " 1.2rem",
                                height: "1.2rem",
                              }}
                            />
                            <AttachMoneyIcon />
                            Dinheiro
                          </Typography>
                        </label>
                      </Box>
                    </Box>
                  )}
                />
                <Box>
                  <p>{errors.formaDePagamento?.message}</p>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ mb: 2 }}>
            {showAlert && (
              <Alert severity="success">
                <Typography>
                  Pedido realizado com sucesso. <br />
                  Muito obrigado!
                </Typography>
              </Alert>
            )}
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
                Total:{useFormat(calculateSubtotal(cart))}
              </Typography>
            </Box>
            <input
              className="btnSendRequest click"
              type="submit"
              value="Enviar"
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Order;
