import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Card from "../Card/card";
import "./menu.css";


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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs /*--Abas do menu---*/
        id="sectionsmenu"
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        <Tab label="Promoções" className="teste"  /*--Aba do menu---*/ />
        <Tab label="Pizza" className="teste"  /*--Aba do menu---*/ />
        <Tab label="Hamburguer" className="teste" /*--Aba do menu---*/ />
        <Tab label="Pão Arabe" className="teste" /*--Aba do menu---*//>
        <Tab label="Bebida" className="teste" /*--Aba do menu---*//>
      </Tabs>


      <Box id="contentmenu" /*--Todo conteudo do Menu---*/>


        <CustomTabPanel value={value} index={0} className="tabContents"  /*--Conteudo da primeira aba---*/>

          <Card /*--Componente CARD---*/
            imageUrl="https://s3-us-west-2.amazonaws.com/anotaai/produtos/1606493132361blob"
            flavor="Pizza Calabresa + Refrigerante"
            ingredients="Calabresa, Queijo, Mussarela, Orégano"
            price={22.99}
          />
          <Card /*--Componente CARD---*/
            imageUrl="https://s3-us-west-2.amazonaws.com/anotaai/produtos/1643916486366blob"
            flavor="Pizza Pepperoni + Refrigerante"
            ingredients="Pepperoni, Queijo, Mussarela, Orégano"
            price={26.99}
          />
          <Card /*--Componente CARD---*/
            imageUrl="https://s3-us-west-2.amazonaws.com/anotaai/produtos/1606493213786blob"
            flavor="Pizza Mista + Refrigerante"
            ingredients="Mussarela, Presunto, Tomate e Orégano"
            price={22.99}
          />
          <Card /*--Componente CARD---*/
            imageUrl="https://s3-us-west-2.amazonaws.com/anotaai/produtos/1610659117583blob"
            flavor="Pizza 4 Queijos + Refrigerante"
            ingredients="Queijo Coalho, Queijo Parmesão, Queijo Mussarela, Requeijão e Orégano"
            price={22.99}
          />
          <Card /*--Componente CARD---*/
            imageUrl="https://s3-us-west-2.amazonaws.com/anotaai/produtos/1610659977411blob"
            flavor="Pizza Carne do Sol + Refrigerante"
            ingredients="Queijo Mussarela, Carne do Sol, Requeijão, e Orégano "
            price={22.99}
          />
        </CustomTabPanel>


        <CustomTabPanel value={value} index={1} className="tabContents"  /*--Conteudo da segunda aba---*/>
          <Card /*--Componente CARD---*/
            imageUrl="https://s3-us-west-2.amazonaws.com/anotaai/produtos/1606493132361blob"
            flavor="Pizza Calabresa"
            ingredients="Calabresa, Queijo, Mussarela, Orégano"
            price={19.99}
          />
          <Card /*--Componente CARD---*/
            imageUrl="https://s3-us-west-2.amazonaws.com/anotaai/produtos/1643916486366blob"
            flavor="Pizza Pepperoni"
            ingredients="Pepperoni, Queijo, Mussarela, Orégano"
            price={24.99}
          /> 
          <Card /*--Componente CARD---*/
            imageUrl="https://s3-us-west-2.amazonaws.com/anotaai/produtos/1606493213786blob"
            flavor="Pizza Mista"
            ingredients="Mussarela, Presunto, Tomate e Orégano"
            price={19.99}
          />
          <Card /*--Componente CARD---*/
            imageUrl="https://s3-us-west-2.amazonaws.com/anotaai/produtos/1610659117583blob"
            flavor=" Pizza 4 Queijos"
            ingredients="Queijo Coalho, Queijo Parmesão, Queijo Mussarela, Requeijão e Orégano"
            price={19.99}
          />
          <Card /*--Componente CARD---*/
            imageUrl="https://s3-us-west-2.amazonaws.com/anotaai/produtos/1610659977411blob"
            flavor="Pizza Carne do Sol"
            ingredients="Queijo Mussarela, Carne do Sol, Requeijão, e Orégano "
            price={19.99}
          /> 
        </CustomTabPanel>


        <CustomTabPanel value={value} index={2} className="tabContents"  /*--Conteudo da terceira aba---*/>
          <Card /*--Componente CARD---*/
            imageUrl="https://www.fbgcdn.com/pictures/1be2bbdc-bdaf-49be-bc10-e83d3f9f0f8b_d3.jpg"
            flavor="Smash Tradicional"
            ingredients="Carne de 100g smash + cheddar + molho especial no pao brioche"
            price={15.99}
          />
          <Card /*--Componente CARD---*/
            imageUrl="https://www.fbgcdn.com/pictures/241cbc96-2e12-4215-a07c-78b3db74a086_d3.jpg"
            flavor="Smash Bacon"
            ingredients="blend 100g esmagado na chapa + creme de cheddar especial + bacon crispy"
            price={20.99}
          />
          <Card /*--Componente CARD---*/
            imageUrl="https://www.fbgcdn.com/pictures/4b8baf21-21da-4ac3-b1a7-73edfa25188f_d3.jpg"
            flavor="Churrasco"
            ingredients="Pão brioche + Blend 140g + cheddar + salada"
            price={23.99}
          />
          <Card /*--Componente CARD---*/
            imageUrl="https://www.fbgcdn.com/pictures/cfc35bc8-bdee-4f03-a860-cfb481f1012c_d3.jpg"
            flavor="Duplo Smash Bacon"
            ingredients="pão brioche + 2 blends 100g + cheddar + bacon + molho especial"
            price={27.99}
          />
          <Card /*--Componente CARD---*/
            imageUrl="https://www.fbgcdn.com/pictures/977a242d-0591-4182-ba01-169bd14eb28d_d3.jpg"
            flavor="Mega Smash"
            ingredients="Calabresa, Queijo, Mussarela, Orégano, Catupiry"
            price={30.99}
          />
        </CustomTabPanel>


        <CustomTabPanel value={value} index={3} className="tabContents"  /*--Conteudo da quarta aba---*/>
          <Card /*--Componente CARD---*/
            imageUrl="https://www.fbgcdn.com/pictures/81072610-a150-4f05-8420-1545af60994a_d3.jpg"
            flavor="Frango"
            ingredients="Frango recheado, Bacon, Queijo Coalho e molho"
            price={18.99}
          />
          <Card /*--Componente CARD---*/
            imageUrl="https://www.fbgcdn.com/pictures/a6110bf6-449a-4c5d-84bd-fcc292b25f2f_d3.jpg"
            flavor="Carne do sol"
            ingredients="Carne do Sol, Queijo Coalho e molho"
            price={22.99}
          /> 
          <Card /*--Componente CARD---*/
            imageUrl="https://www.fbgcdn.com/pictures/f83fb99a-64aa-4848-b746-b6dbb9a08030_d3.jpg"
            flavor="Monstrão"
            ingredients="2 carnes de 100 g, Bacon, Cheddar e molho"
            price={27.99}
          />
        </CustomTabPanel>


        <CustomTabPanel value={value} index={4} className="tabContents" /*--Conteudo da quinta aba---*/>
          <Card /*--Componente CARD---*/
            imageUrl="https://client-assets.anota.ai/produtos/1688936873587blob"
            flavor="Água sem gás"
            ingredients="Refrigerante gelado"
            price={2.99}
          />
          <Card /*--Componente CARD---*/
            imageUrl="https://s3-us-west-2.amazonaws.com/anotaai/produtos/1660517293657blob"
            flavor="Coca-cola 600ml"
            ingredients="Refrigerante gelado"
            price={5.99}
          />
          <Card /*--Componente CARD---*/
            imageUrl="https://s3-us-west-2.amazonaws.com/anotaai/produtos/1660517871236blob"
            flavor="Guaraná Antartica 1L"
            ingredients="Refrigerante gelado"
            price={7.99}
          />
          <Card /*--Componente CARD---*/
            imageUrl="https://s3-us-west-2.amazonaws.com/anotaai/produtos/1660517976941blob"
            flavor="São Geraldo 1L"
            ingredients="Refrigerante gelado"
            price={8.99}
          />
          <Card /*--Componente CARD---*/
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
