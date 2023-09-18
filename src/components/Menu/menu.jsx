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

import "./menu.css";

import Data from "../../db/data.json";
import { Card, CardContent, Typography } from "@mui/material";

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const promotions = Data.combos;
  const pizza = Data.pizzas;
  const hamburger = Data.hamburger;
  const paoArabe = Data.paoArabe;
  const drink = Data.drinks;

  /* function addKart(e) {
    let arrayIndex;

    if (e.target && e.target.nodeName === "DIV") {
      arrayIndex = e.target.dataset.arrayposition;
    }

    if (e.target && e.target.nodeName === "svg") {
      arrayIndex = e.target.parentNode.dataset.arrayposition;
    }

    if (e.target && e.target.nodeName === "path") {
      arrayIndex = e.target.parentNode.parentNode.dataset.arrayposition;
    }

    ctx.setKart([...ctx.kart, promotions[arrayIndex]]);
  }*/

  return (
    <>
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
          {promotions.map((item) => (
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
          {pizza.map((item) => (
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
          {hamburger.map((item) => (
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
          {paoArabe.map((item) => (
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
          {drink.map((item) => (
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
    </>
  );
}
