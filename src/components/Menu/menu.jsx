/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Image1 from "../../../public/entrega-de-alimentos.png";
import Image2 from "../../../public/pizza.png";
import Image3 from "../../../public/hamburguer.png";
import Image4 from "../../../public/comida-mexicana.png";
import Image5 from "../../../public/refrigerantes.png";
import SearchIcon from "@mui/icons-material/Search";
import Data from "../../db/data.json";
import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../Header/header";
import "./menu.css";
import { useCarrinho } from "../../context/useCarrinho";
import { useFormat } from "./../../utils/useFormat";
import Cart from "../Cart/cart";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </Box>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function Menu() {
  const [value, setValue] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToAdd, setItemToAdd] = useState(null);

  const [refrigeranteDoCombo, setrefrigeranteDoCombo] = useState("");
  const [isSegundoModalOpen, setIsSegundoModalOpen] = useState(false);
  const [observacao, setObservacao] = useState("");
  const [activeTab, setActiveTab] = useState("combos");
  const [bordaSelecionada, setbordaSelecionada] = useState("");
  const [adicional, setAdicional] = useState([]);

  useEffect(() => {
    let objGenerico = [];
    Data.adicionais[activeTab].forEach((adicional) =>
      objGenerico.push(adicional)
    );
    setAdicional(objGenerico);
  }, []);

  useEffect(() => {
    let objGenerico = [];
    Data.adicionais[activeTab].forEach((adicional) =>
      objGenerico.push(adicional)
    );
    setAdicional(objGenerico);
  }, [activeTab]);

  const modalCheckout = () => {
    const adicionais = adicional.filter((item) => item.qtde > 0);
    const totais = adicionais.map((item) => ({
      ...item,
      total: item.valor * item.qtde,
    }));
    const valorTotalAdicionais = totais
      .map((item) => item.total)
      .reduce((acumulatter, currentValue) => acumulatter + currentValue);
    const valorTotalDoProduto = valorTotalAdicionais + itemToAdd.valor;
    const itemToAddWithQuantity = {
      ...itemToAdd,
      refrigeranteDoCombo,
      observacao,
      bordaSelecionada,
      adicionais: totais,
      valorTotalAdicionais,
      valorTotalDoProduto,
    };

    addToCart(itemToAddWithQuantity);
    setIsModalOpen(false);
    setIsSegundoModalOpen(false);

    const cpy = [...adicional];
    cpy.forEach((item) => (item.qtde = 0));
    setAdicional(cpy);
  };

  const handleIngredientIncrement = (ingredient) => {
    let copia = [...adicional];
    copia.forEach((item) => {
      if (item.name === ingredient) item.qtde += 1;
    });
    setAdicional(copia);
  };

  const handleIngredientDecrement = (ingredient) => {
    const adicionalSelected = adicional.filter(
      (item) => item.name === ingredient
    )[0];
    if (adicionalSelected.qtde > 0) {
      let copia = [...adicional];
      copia.forEach((item) => {
        if (item.name === ingredient) item.qtde -= 1;
      });
      setAdicional(copia);
    }
  };

  const openConfirmationModal = (item) => {
    setIsModalOpen(true);
    setItemToAdd(item);
    setbordaSelecionada("");
    setObservacao("");
  };
  const { addToCart } = useCarrinho();

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleChange = (event, newValue) => {
    const tabClasses = [...event.target.classList];
    const optionClass = tabClasses
      .filter((item) => item.includes("opt"))[0]
      .substring(3);
    setValue(newValue);
    setActiveTab(optionClass);
  };

  const promotions = Data.combos;
  const pizza = Data.pizzas;
  const hamburger = Data.hamburger;
  const paoArabe = Data.paoArabe;
  const drink = Data.drinks;

  window.onload = function () {
    sessionStorage.clear();
  };

  return (
    <>
      <Box
        id="header"
        sx={{
          display: "flex",
          backgroundColor: "#fbe9dd",
          width: "100%",
          height: "21%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Header />
      </Box>

      <Tabs
        id="sectionsmenu"
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "20%",
          width: "100%",
        }}
      >
        <Tab
          className="tabs optcombos"
          label="Combos"
          icon={<img src={Image1} alt="ImgCombo" />}
        />
        <Tab
          label="Pizza"
          className="tabs optpizza"
          icon={<img src={Image2} alt="ImgPizza" />}
        />
        <Tab
          label="Hamburguer"
          className="tabs opthamburguer"
          icon={<img src={Image3} alt="ImgHamburguer" />}
        />
        <Tab
          label="Pão Arabe"
          className="tabs optpaoArabe"
          icon={<img src={Image4} alt="ImgPaoArabe" />}
        />
        <Tab
          label="Bebida"
          className="tabs optbebidas"
          icon={<img src={Image5} alt="ImgBebidas" />}
        />
      </Tabs>

      <Box
        id="boxInput"
        className="boxInputMenu"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <SearchIcon className="iconSearchFilterMenu" />
        <TextField
          label="Ta com fome de quê?"
          variant="outlined"
          onChange={handleSearchInputChange}
        />
      </Box>
      <Box className="fundoInputFiltro"></Box>
      <Box
        id="contentmenu"
        sx={{
          width: "100%",
          borderRadius: "35px 35px 0 0",
          height: "90%",
          overflow: "hidden",
          marginTop: "0.2rem",
        }}
      >
        <CustomTabPanel value={value} index={0} className="tabContents">
          {promotions
            .filter((item) =>
              item.sabor.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <Card key={item.id} className="cardMenu">
                <CardContent className="cardContent">
                  <img src={item.imagem} alt="" />
                  <Box className="descriptionCard">
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6" sx={{ width: "100%" }}>
                        {item.sabor}
                      </Typography>
                    </Box>
                    <Typography>{item.ingredientes}</Typography>
                    <Box className="priceAndIcons">
                      <Typography variant="h6">
                        {useFormat(item.valor)}
                      </Typography>
                      <AddShoppingCartIcon
                        className="iconAddProduct click"
                        onClick={() => openConfirmationModal(item)}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1} className="tabContents">
          {pizza
            .filter((item) =>
              item.sabor.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <Card key={item.id} className="cardMenu">
                <CardContent className="cardContent">
                  <img src={item.imagem} alt="" />
                  <Box className="descriptionCard">
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6" sx={{ width: "100%" }}>
                        {item.sabor}
                      </Typography>
                    </Box>
                    <Typography>{item.ingredientes}</Typography>
                    <Box className="priceAndIcons">
                      <Typography variant="h6">
                        {useFormat(item.valor)}
                      </Typography>
                      <AddShoppingCartIcon
                        className="iconAddProduct click"
                        onClick={() => openConfirmationModal(item)}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2} className="tabContents">
          {hamburger
            .filter((item) =>
              item.sabor.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <Card key={item.id} className="cardMenu">
                <CardContent className="cardContent">
                  <img src={item.imagem} alt="" />
                  <Box className="descriptionCard">
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6" sx={{ width: "100%" }}>
                        {item.sabor}
                      </Typography>
                    </Box>
                    <Typography>{item.ingredientes}</Typography>
                    <Box className="priceAndIcons">
                      <Typography variant="h6">
                        {useFormat(item.valor)}
                      </Typography>
                      <AddShoppingCartIcon
                        className="iconAddProduct click"
                        onClick={() => openConfirmationModal(item)}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={3} className="tabContents">
          {paoArabe
            .filter((item) =>
              item.sabor.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <Card key={item.id} className="cardMenu">
                <CardContent className="cardContent">
                  <img src={item.imagem} alt="" />
                  <Box className="descriptionCard">
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6" sx={{ width: "100%" }}>
                        {item.sabor}
                      </Typography>
                    </Box>
                    <Typography>{item.ingredientes}</Typography>
                    <Box className="priceAndIcons">
                      <Typography variant="h6">
                        {useFormat(item.valor)}
                      </Typography>
                      <AddShoppingCartIcon
                        className="iconAddProduct click"
                        onClick={() => openConfirmationModal(item)}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={4} className="tabContents">
          {drink
            .filter((item) =>
              item.sabor.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <Card key={item.id} className="cardMenu">
                <CardContent className="cardContent">
                  <img src={item.imagem} alt="" />
                  <Box className="descriptionCard">
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6" sx={{ width: "100%" }}>
                        {item.sabor}
                      </Typography>
                    </Box>
                    <Typography>{item.ingredientes}</Typography>
                    <Box className="priceAndIcons">
                      <Typography variant="h6">
                        {useFormat(item.valor)}
                      </Typography>
                      <AddShoppingCartIcon
                        className="iconAddProduct click"
                        onClick={() => openConfirmationModal(item)}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
        </CustomTabPanel>
      </Box>
      <Box id="footer">
        <Cart />
      </Box>

      {/*---- Fazendo isso para separar o modal pra nao confundir( a partir daqui tem dois modais)*/}

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
          <Typography variant="h6" id="confirmation-modal-title"></Typography>
          {itemToAdd && (
            <>
              <Typography variant="h6" id="confirmation-modal-title">
                Escolha o refrigerante
              </Typography>
              <RadioGroup
                sx={{
                  display: "flex",
                  height: "40%",
                  justifyContent: "space-around",
                }}
                aria-label="sabores"
                name="sabores"
                value={refrigeranteDoCombo}
                onChange={(e) => {
                  setrefrigeranteDoCombo(e.target.value);
                }}
              >
                <FormControlLabel
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "1rem",
                  }}
                  value="Pepsi 1L"
                  control={<Radio />}
                  label="Pepsi 1L"
                />
                <FormControlLabel
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "1rem",
                  }}
                  value="Guarana Antartica 1L"
                  control={<Radio />}
                  label="Guarana Antartica 1L"
                />
              </RadioGroup>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Button
                  sx={{
                    width: "30%",
                    backgroundColor: "#f76d26 ",
                    color: "#f7e9e1",
                  }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Voltar
                </Button>
                <Button
                  sx={{
                    width: "30%",
                    backgroundColor: "#f76d26 ",
                    color: "#f7e9e1",
                  }}
                  onClick={setIsSegundoModalOpen}
                >
                  Avançar
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/*Segundo modal */}
      <Modal
        open={isSegundoModalOpen}
        onClose={() => setIsSegundoModalOpen(true)}
        aria-labelledby="segundo-modal-title"
        aria-describedby="segundo-modal-description"
      >
        <Box
          sx={{
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: " space-around",
            backgroundColor: "#fae9de",
            position: " absolute",
            top: " 50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: " 90%",
            maxWidth: "600px",
            height: "35rem",
            minHeight: " 100px",
            border: "6px solid #e5c7b3",
            borderRadius: " 30px",
            boxShadow: "5px 4px 5px 2px rgba(0, 0, 0, 0.2)",
            paddingLeft: "0.6rem",
          }}
        >
          <Typography
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            variant="h6"
            id="segundo-modal-title"
          >
            Deseja acrescentar algo?
          </Typography>

          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Adicionar ingredientes:
          </Typography>
          {adicional.map((obj, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-evenly",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>
                  {obj.name} <Box>{useFormat(obj.valor)}</Box>
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "40%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    sx={{ color: "black" }}
                    onClick={() => handleIngredientDecrement(obj.name)}
                  >
                    -
                  </Button>
                  <Typography>{obj.qtde}</Typography>
                  <Button
                    sx={{ color: "black" }}
                    onClick={() => handleIngredientIncrement(obj.name)}
                  >
                    +
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}

          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Selecionar borda:
          </Typography>

          <RadioGroup
            sx={{
              display: "flex",
              gap: "1.2rem",
              justifyContent: "space-around",
              width: "100%",
            }}
            aria-label="borda"
            name="borda"
            value={bordaSelecionada}
            onChange={(e) => setbordaSelecionada(e.target.value)}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: "1rem",
              }}
            >
              <FormControlLabel
                value="Sem borda"
                control={<Radio />}
                label="Sem borda"
              />
              <Typography sx={{ paddingRight: "5%" }}>
                {useFormat(0.0)}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: "1rem",
              }}
            >
              <FormControlLabel
                value="Borda com Catupiry"
                control={<Radio />}
                label="Borda com Catupiry"
              />
              <Typography sx={{ paddingRight: "5%" }}>
                {useFormat(7.99)}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: "1rem",
              }}
            >
              <FormControlLabel
                value="Borda de Chocolate"
                control={<Radio />}
                label="Borda de Chocolate"
              />
              <Typography sx={{ paddingRight: "5%" }}>
                {useFormat(9.99)}
              </Typography>
            </Box>
          </RadioGroup>
          <TextField
            sx={{
              width: "100%",
              display: "flex",
              height: "15%",
              justifyContent: "center",
            }}
            placeholder="Observação ex: tirar cebola, verdura."
            variant="outlined"
            fullWidth
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
          />

          <Box
            sx={{
              height: "3rem",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              sx={{
                height: "100%",
                width: "30%",
                backgroundColor: "#f76d26 ",
                color: "#f7e9e1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => setIsSegundoModalOpen(false)}
            >
              Voltar
            </Button>
            <Button
              sx={{
                height: "100%",
                width: "50%",
                backgroundColor: "#f76d26 ",
                color: "#f7e9e1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={modalCheckout}
            >
              Adicionar ao carrinho
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
