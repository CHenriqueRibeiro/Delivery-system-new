import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '../Card/card';
import './Menu.css';

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
        <Tab label="Promoções" className="teste" />
        <Tab label="Pizza" className="teste" />
        <Tab label="Hamburguer" className="teste" />
        <Tab label="Pão Arabe" className="teste" />
        <Tab label="Bebida" className="teste" />
      </Tabs>

      <Box id="contentmenu" /*--Todo conteudo do Menu---*/>
        <CustomTabPanel
          value={value}
          index={0}
          className="tabContents" /*--Conteudo da primeira aba---*/
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
          className="tabContents" /*--Conteudo da segunda aba---*/
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
          className="tabContents" /*--Conteudo da terceira aba---*/
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
          className="tabContents" /*--Conteudo da quarta aba---*/
        >
          <Card
            imageUrl="https://www.fbgcdn.com/pictures/81072610-a150-4f05-8420-1545af60994a_d3.jpg"
            flavor="Frango"
            ingredients="Frango recheado, Bacon, Queijo Coalho e molho"
            price={18.99}
          />
          <Card
            imageUrl="https://www.fbgcdn.com/pictures/a6110bf6-449a-4c5d-84bd-fcc292b25f2f_d3.jpg"
            flavor="Carne do sol"
            ingredients="Carne do Sol, Queijo Coalho e molho"
            price={22.99}
          />
          <Card
            imageUrl="https://www.fbgcdn.com/pictures/f83fb99a-64aa-4848-b746-b6dbb9a08030_d3.jpg"
            flavor="Monstrão"
            ingredients="2 carnes de 100 g, Bacon, Cheddar e molho"
            price={27.99}
          />
        </CustomTabPanel>

        <CustomTabPanel
          value={value}
          index={4}
          className="tabContents" /*--Conteudo da quinta aba---*/
        >
          <Card
            imageUrl="https://client-assets.anota.ai/produtos/1688936873587blob"
            flavor="Água sem gás"
            ingredients="Refrigerante gelado"
            price={2.99}
          />
          <Card
            imageUrl="https://s3-us-west-2.amazonaws.com/anotaai/produtos/1660517293657blob"
            flavor="Coca-cola 600ml"
            ingredients="Refrigerante gelado"
            price={5.99}
          />
          <Card
            imageUrl="https://s3-us-west-2.amazonaws.com/anotaai/produtos/1660517871236blob"
            flavor="Guaraná Antartica 1L"
            ingredients="Refrigerante gelado"
            price={7.99}
          />
          <Card
            imageUrl="https://s3-us-west-2.amazonaws.com/anotaai/produtos/1660517976941blob"
            flavor="São Geraldo 1L"
            ingredients="Refrigerante gelado"
            price={8.99}
          />
          <Card
            imageUrl="https://s3-us-west-2.amazonaws.com/anotaai/produtos/1660517731434blob"
            flavor="Coca-cola 2L"
            ingredients="Refrigerante gelado"
            price={13.99}
          />
        </CustomTabPanel>
      </Box>
    </>
  );
}
