import { useState } from "react";
// eslint-disable-next-line no-unused-vars

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image1 from "../../../public/entrega-de-alimentos.png";
import Image2 from "../../../public/pizza.png";
import Image3 from "../../../public/hamburguer.png";
import Image4 from "../../../public/comida-mexicana.png";
import Image5 from "../../../public/refrigerantes.png";
import SearchIcon from "@mui/icons-material/Search";

import "./menu.css";

import Data from "../../db/data.json";
import { Card, CardContent, TextField, Typography } from "@mui/material";
import Header from "../Header/header";
import Footer from "../Footer/footer";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  ctx: PropTypes.Context,
};

export default function Menu() {
  const [value, setValue] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const promotions = Data.combos;
  const pizza = Data.pizzas;
  const hamburger = Data.hamburger;
  const paoArabe = Data.paoArabe;
  const drink = Data.drinks;

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
          className="tabs"
          label="Combos"
          icon={<img src={Image1} alt="ImgCombo" />}
        />
        <Tab
          label="Pizza"
          className="tabs"
          icon={<img src={Image2} alt="ImgPizza" />}
        />
        <Tab
          label="Hamburguer"
          className="tabs"
          icon={<img src={Image3} alt="ImgHamburguer" />}
        />
        <Tab
          label="Pão Arabe"
          className="tabs"
          icon={<img src={Image4} alt="ImgPaoArabe" />}
        />
        <Tab
          label="Bebida"
          className="tabs"
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
        <SearchIcon className="iconSearchFilterMenu"/>
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
                    <Typography variant="h6">{item.sabor}</Typography>
                    <Typography>{item.ingredientes}</Typography>
                    <Box className="priceAndIcons">
                      <Typography variant="h6">{item.valor}</Typography>
                      <FavoriteIcon className="iconFavoriteMenu" />
                      <AddShoppingCartIcon className="iconAddProduct" />
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
                    <Typography variant="h6">{item.sabor}</Typography>
                    <Typography>{item.ingredientes}</Typography>
                    <Box className="priceAndIcons">
                      <Typography variant="h6">{item.valor}</Typography>
                      <FavoriteIcon className="iconFavoriteMenu" />
                      <AddShoppingCartIcon className="iconAddProduct" />
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
                    <Typography variant="h6">{item.sabor}</Typography>
                    <Typography>{item.ingredientes}</Typography>
                    <Box className="priceAndIcons">
                      <Typography variant="h6">{item.valor}</Typography>
                      <FavoriteIcon className="iconFavoriteMenu" />
                      <AddShoppingCartIcon className="iconAddProduct" />
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
                    <Typography variant="h6">{item.sabor}</Typography>
                    <Typography>{item.ingredientes}</Typography>
                    <Box className="priceAndIcons">
                      <Typography variant="h6">{item.valor}</Typography>
                      <FavoriteIcon className="iconFavoriteMenu" />
                      <AddShoppingCartIcon className="iconAddProduct" />
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
                    <Typography variant="h6">{item.sabor}</Typography>
                    <Typography>{item.ingredientes}</Typography>
                    <Box className="priceAndIcons">
                      <Typography variant="h6">{item.valor}</Typography>
                      <FavoriteIcon className="iconFavoriteMenu" />
                      <AddShoppingCartIcon className="iconAddProduct" />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
        </CustomTabPanel>
      </Box>
      <Box id="footer">
        <Footer />
      </Box>
    </>
  );
}
