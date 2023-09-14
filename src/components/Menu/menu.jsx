import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '../Card/card';
import './menu.css';

import Data from '../../db/data.json';

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
};

export default function Menu() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const promotions = Data.promocoes;
  const pizza = Data.pizzas;
  const hamburger = Data.hamburger;
  const paoArabe = Data.paoArabe;
  const drink = Data.drinks;

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
      >
        <Tab
          className="teste"
          label="Combos"
          icon={
            <img
              src="./public/entrega-de-alimentos.png"
              alt="Imagem"
            />
          }
        />
        <Tab
          label="Pizza"
          className="teste"
          icon={
            <img
              src="./public/pizza.png"
              alt="Imagem"
            />
          }
        />
        <Tab
          label="Hamburguer"
          className="teste"
          icon={
            <img
              src="./public/hamburguer.png"
              alt="Imagem"
            />
          }
        />
        <Tab
          label="Pão Arabe"
          className="teste"
          icon={
            <img
              src="./public/comida-mexicana.png"
              alt="Imagem"
            />
          }
        />
        <Tab
          label="Bebida"
          className="teste"
          icon={
            <img
              src="./public/refrigerantes.png"
              alt="Imagem"
            />
          }
        />
      </Tabs>

      <Box id="contentmenu">
        <CustomTabPanel
          value={value}
          index={0}
          className="tabContents"
        >
          {promotions.map((item) => (
            <Card
              imageUrl={item.imagem}
              key={item.id}
              flavor={item.sabor}
              ingredients={item.ingredientes}
              price={item.valor}
            />
          ))}
        </CustomTabPanel>

        <CustomTabPanel
          value={value}
          index={1}
          className="tabContents"
        >
          {pizza.map((item) => (
            <Card
              imageUrl={item.imagem}
              key={item.id}
              flavor={item.sabor}
              ingredients={item.ingredientes}
              price={item.valor}
            />
          ))}
        </CustomTabPanel>

        <CustomTabPanel
          value={value}
          index={2}
          className="tabContents"
        >
          {hamburger.map((item) => (
            <Card
              imageUrl={item.imagem}
              key={item.id}
              flavor={item.sabor}
              ingredients={item.ingredientes}
              price={item.valor}
            />
          ))}
        </CustomTabPanel>

        <CustomTabPanel
          value={value}
          index={3}
          className="tabContents"
        >
          {paoArabe.map((item) => (
            <Card
              imageUrl={item.imagem}
              key={item.id}
              flavor={item.sabor}
              ingredients={item.ingredientes}
              price={item.valor}
            />
          ))}
        </CustomTabPanel>

        <CustomTabPanel
          value={value}
          index={4}
          className="tabContents"
        >
          {drink.map((item) => (
            <Card
              imageUrl={item.imagem}
              key={item.id}
              flavor={item.sabor}
              ingredients={item.ingredientes}
              price={item.valor}
            />
          ))}
        </CustomTabPanel>
      </Box>
    </>
  );
}
