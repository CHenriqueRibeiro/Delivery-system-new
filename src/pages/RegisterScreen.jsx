import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { Button, Fade, Modal, Typography } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import InputMask from "react-input-mask";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./RegisterScreen.css";

const RegisterScreen = () => {
  const schema = yup
    .object({
      cep: yup.string().required(),
      rua: yup.string().required(),
    })
    .required();
  const { register, handleSubmit, setValue, setFocus } = useForm({
    resolver: yupResolver(schema),
  });
  const [whatsCheckBox, setwhatsCheckBox] = useState(false);
  const [numberPhone, setNumberPhone] = useState("");
  const [numberWhats, setNumberWhats] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const saveToLocalStorage = (key, value) => {
    const val = value
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(" ");
    const formData = JSON.parse(localStorage.getItem("formData")) || {};
    formData[key] = val;
    localStorage.setItem("formData", JSON.stringify(formData));
  };
  const handleFormSubmit = (data) => {
    Object.entries(data).forEach(([key, value]) => {
      saveToLocalStorage(key, value);
    });

    history.push("/pedido");
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

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box className="dadosCadastro">
          <Box
            sx={{
              background: "#f46c26",
              width: "100vw",
              height: "4rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box className="headerOrder">
              <Box className="iconAndText">
                <NavLink to="/" style={{ color: "#f9e9df" }}>
                  <ArrowBackIcon />
                </NavLink>
                <Typography variant="h6">Cadastro</Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: "#f9e9df ",
              display: "flex",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-around",
              borderRadius: "25px 25px 0 0",
            }}
          >
            <Typography variant="h6">Endereço</Typography>
            <Box id="inputAndBtnSerach">
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label className="labelFormEndereco">CEP </label>
                <InputMask
                  mask="99999-999"
                  maskChar={null}
                  className="inputFormEndereco cep"
                  {...register("cep")}
                  onChange={(e) => {
                    saveToLocalStorage("cep", e.target.value);
                  }}
                  onBlur={checkCEP}
                />
              </Box>
              <Button
                className="btnsearch click"
                sx={{
                  color: "#f46c26",
                  background: "#f9e9df",
                  marginLeft: "10px",
                  height: "2rem",
                  minWidth: "2.3rem",
                  padding: "0 ",
                  position: "relative",
                  top: "0.6rem",
                  left: "0",
                  border: "1px solid #f16d2f",
                  borderRadius: "8px",
                  boxShadow:
                    " 5px 4px 5px 2px rgba(0, 0, 0, 0.2), 5px 4px 5px 2px rgba(0, 0, 0, 0.14), 5px 4px 5px 2px rgba(0, 0, 0, 0.12) !important;",
                }}
              >
                <SearchRoundedIcon />
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label className="labelFormEndereco">Rua </label>
              <input
                type="text"
                className="inputFormEndereco"
                {...register("rua")}
                onChange={(e) => {
                  saveToLocalStorage("rua", e.target.value);
                }}
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label className="labelFormEndereco">Numero</label>
              <input
                type="text"
                className="inputFormEndereco"
                {...register("casaApto")}
                onChange={(e) => {
                  saveToLocalStorage("casaApto", e.target.value);
                }}
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label className="labelFormEndereco">
                Complemento/Ponto de Referência
              </label>
              <input
                type="text"
                className="inputFormEndereco"
                {...register("complemento")}
                onChange={(e) => {
                  saveToLocalStorage("complemento", e.target.value);
                }}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label className="labelFormEndereco">Bairro</label>
              <input
                type="text"
                className="inputFormEndereco"
                {...register("bairro")}
                onChange={(e) => {
                  saveToLocalStorage("bairro", e.target.value);
                }}
              />
            </Box>
            <Box id="inputCidadeEEstado">
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label className="labelFormEndereco onlyLetters">Cidade</label>
                <input
                  type="text"
                  className="inputFormEndereco"
                  {...register("cidade")}
                  onChange={(e) => {
                    saveToLocalStorage("cidade", e.target.value);
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label className="labelFormEndereco onlyLetters">Estado</label>
                <input
                  type="text"
                  className="inputFormEndereco w4rem"
                  {...register("estado")}
                  onChange={(e) => {
                    saveToLocalStorage("estado", e.target.value);
                  }}
                />
              </Box>
            </Box>
            <Typography variant="h6">Dados Pessoais</Typography>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label className="labelFormEndereco">Nome</label>
              <input
                style={{ textTransform: "captalize" }}
                type="text"
                className="inputFormEndereco "
                {...register("nome")}
                onBlur={(e) => saveToLocalStorage("nome", e.target.value)}
              />
            </Box>
            <Box id="inputTelEWhats">
              <Box id="inputTelefone">
                <label className="labelFormEndereco">Nº Telefone</label>

                <InputMask
                  mask="99 9 99999999"
                  maskChar={null}
                  className="inputFormEndereco w9rem"
                  value={numberPhone}
                  {...register("telefone")}
                  onChange={(e) => {
                    setNumberPhone(e.target.value);
                    saveToLocalStorage("telefone", e.target.value);
                  }}
                />

                <Box className="checkboxWhatsapp">
                  <input
                    type="checkbox"
                    name="oi"
                    id=""
                    onChange={(e) => setwhatsCheckBox(e.target.checked)}
                  />
                  <span className="spancheckboxWhatsapp">Whatsapp</span>
                </Box>
              </Box>
              <Box id="inputWhatsapp">
                <label className="labelFormEndereco">Whatsapp</label>
                <InputMask
                  mask="99 9 99999999"
                  maskChar={null}
                  className="inputFormEndereco w9rem"
                  disabled={whatsCheckBox ? "disabled" : ""}
                  value={whatsCheckBox ? numberPhone : numberWhats}
                  onChange={(e) => setNumberWhats(e.target.value)}
                />
              </Box>
            </Box>
            <input
              style={{
                background: "#f16d2f",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Roboto",
                height: "5%",
                border: "1px solid #f46c26",
                borderRadius: "10px",
                color: "#f9e9df",
                minWidth: "226px",
                textDecoration: "none",
                transition: "background-color 0.3s",
                fontSize: "16px",
              }}
              className="click box-shadow"
              type="submit"
              value={"Finalizar Cadastro"}
              onClick={handleOpen}
            />
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
                      <Typography variant="h6">
                        Cadastro Realizado com Sucesso!
                      </Typography>

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

                    <Button style={{ color: "#f9e9df" }}>
                      <input
                        onClick={handleClose}
                        className="btnCloseService click"
                        value="fechar"
                        style={{
                          textAlign: "center",
                          color: "white",
                          textTransform: "capitalize",
                        }}
                      />
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Modal>
            <NavLink to="/pedido" className="btnIrParaPagamento click">
              Ir para Pagamento
            </NavLink>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default RegisterScreen;
