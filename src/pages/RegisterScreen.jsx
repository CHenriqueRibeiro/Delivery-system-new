import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
//import Button from "@mui/material/Button";
import InputMask from "react-input-mask";
import { NavLink } from "react-router-dom";
import "./RegisterScreen.css";

const RegisterScreen = () => {
  const { register, handleSubmit, setValue, setFocus } = useForm();

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
          <label className="labelFormEndereco">CEP </label>
          <Box id="inputAndBtnSerach">
            <InputMask
              mask="99999-999"
              maskChar={null}
              className="inputFormEndereco cep"
              {...register("cep")}
              onBlur={checkCEP}
            />
            <button type="submit" className="btnsearch">
              <SearchRoundedIcon />
            </button>
          </Box>
          <label className="labelFormEndereco">Rua </label>
          <input
            type="text"
            className="inputFormEndereco"
            {...register("address")}
          />

          <label className="labelFormEndereco">Numero</label>
          <input
            type="text"
            className="inputFormEndereco"
            {...register("addressNumber")}
          />

          <label className="labelFormEndereco">
            Complemento/Ponto de Referência
          </label>
          <input
            type="text"
            className="inputFormEndereco"
            {...register("addresscomplement")}
          />

          <label className="labelFormEndereco">Bairro</label>
          <input
            type="text"
            className="inputFormEndereco"
            {...register("neighborhood")}
          />
          <Box id="inputCidadeEEstado">
            <Box>
              <label className="labelFormEndereco onlyLetters">Cidade</label>
              <input
                type="text"
                className="inputFormEndereco"
                {...register("city")}
              />
            </Box>
            <Box className="dadosEstado">
              <label className="labelFormEndereco  onlyLetters">Estado</label>
              <input
                type="text"
                className="inputFormEndereco w4rem"
                {...register("uf")}
              />
            </Box>
          </Box>
          <Typography variant="h6">Dados Pessoais</Typography>

          <label className="labelFormEndereco">Nome</label>
          <input type="text" className="inputFormEndereco onlyLetters" />
          <Box id="inputTelEWhats">
            <Box id="inputTelefone">
              <label className="labelFormEndereco">Nº Telefone</label>

              <InputMask
                mask="(99) 9 99999999"
                maskChar={null}
                className="inputFormEndereco w9rem"
              />
              <Box className="checkboxWhatsapp">
                <input type="checkbox" name="oi" id="" />
                <span className="spancheckboxWhatsapp">Whatsapp</span>
              </Box>
            </Box>
            <Box id="inputWhatsapp">
              <label className="labelFormEndereco">Whatsapp</label>
              <InputMask
                mask="(99) 9 99999999"
                maskChar={null}
                className="inputFormEndereco w9rem"
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
