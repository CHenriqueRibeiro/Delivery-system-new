import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import InputMask from "react-input-mask";
import { NavLink } from "react-router-dom";
import "./RegisterScreen.css";
import { useState } from "react";

const RegisterScreen = () => {
  const { register, handleSubmit, setValue, setFocus } = useForm();
  const [whatsCheckBox, setwhatsCheckBox] = useState(false);
  const [numberPhone, setNumberPhone] = useState("");
  const [numberWhats, setNumberWhats] = useState("");

  const onSubmit = (e) => {
    console.log(e);
  };

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep === "") {
      setValue("address");
      setValue("addressNumber");
      setValue("addresscomplement");
      setValue("neighborhood");
      setValue("city");
      setValue("uf");
      console.log(e);
    } else {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          setValue("address", data.logradouro);
          setValue("neighborhood", data.bairro);
          setValue("city", data.localidade);
          setValue("uf", data.uf);
          setFocus("addressNumber");
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="dadosCadastro">
          <Typography variant="h6">Endereço</Typography>
          <Box id="inputAndBtnSerach">
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label className="labelFormEndereco">CEP </label>
              <InputMask
                mask="99999-999"
                maskChar={null}
                className="inputFormEndereco cep"
                {...register("cep")}
                onBlur={checkCEP}
                />
                </Box>
              <Button
                type="submit"
                className="btnsearch"
                sx={{
                  color: "#f46c26",
                  background: "#f9e9df",
                  marginLeft: "10px",
                  height: "2rem",
                  minWidth: "2.3rem",
                  padding: "0 ",
                  position:'relative',
                  top:'0.6rem',
                  left:'0',
                  border:'1px solid #f16d2f',
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
              {...register("address")}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label className="labelFormEndereco">Numero</label>
            <input
              type="text"
              className="inputFormEndereco"
              {...register("addressNumber")}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label className="labelFormEndereco">
              Complemento/Ponto de Referência
            </label>
            <input
              type="text"
              className="inputFormEndereco"
              {...register("addresscomplement")}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label className="labelFormEndereco">Bairro</label>
            <input
              type="text"
              className="inputFormEndereco"
              {...register("neighborhood")}
            />
          </Box>
          <Box id="inputCidadeEEstado">
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label className="labelFormEndereco onlyLetters">Cidade</label>
              <input
                type="text"
                className="inputFormEndereco"
                {...register("city")}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label className="labelFormEndereco  onlyLetters">Estado</label>
              <input
                type="text"
                className="inputFormEndereco w4rem"
                {...register("uf")}
              />
            </Box>
          </Box>
          <Typography variant="h6">Dados Pessoais</Typography>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label className="labelFormEndereco">Nome</label>
            <input type="text" className="inputFormEndereco onlyLetters" />
          </Box>
          <Box id="inputTelEWhats">
            <Box id="inputTelefone">
              <label className="labelFormEndereco">Nº Telefone</label>

              <InputMask
                mask="99 9 99999999"
                maskChar={null}
                className="inputFormEndereco w9rem"
                value={numberPhone}
                onChange={(e) => setNumberPhone(e.target.value)}
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

          <NavLink to="/pedido" className="btnIrParaPagamento">
            Ir para pagamento
          </NavLink>
        </Box>
      </form>
    </>
  );
};

export default RegisterScreen;
