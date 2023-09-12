// eslint-disable-next-line no-unused-vars
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import "./cart.css";

export default function MediaControlCard(props) {
  /*---Props dos Card do carrinho--*/
  MediaControlCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    flavor: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  };
  /*---Props dos Card do carrinho--*/

  return (
    <Card className="displayCart" /*---Conteudo(espaco do card) do carrinho--*/>
      
      <Box className="cartDescription"  /*---Descrição  do card carrinho--*/>

        <CardMedia /*---Imagem do card do  carrinho--*/
          className="imgCard"
          component="img"
          src={props.imageUrl}
          l
          alt={props.flavor}
        />

        <CardContent className="contentCart" /*---(Sabor, ingrediente, preco)do card do  carrinho--*/>
          <Typography variant="h6" /*---Sabor do card do  carrinho--*/>
            {props.flavor}
            </Typography>

          <Typography variant="subtitle2" color="text.secondary" /*---Ingrediente do card do  carrinho--*/>
            {props.ingredients}
          </Typography>

          <Typography variant="h6" /*---Preço do card do  carrinho--*/>
            R$ {props.price}
            </Typography>

          <IconButton className="iconDelete" aria-label="delete"  /*---Icone do card do  carrinho--*/>
            <DeleteIcon />
          </IconButton>

          <TextField  /*---Campo de observação do card do  carrinho--*/
            className="standard-basic"
            label="Observações"
            variant="standard"
          />

          
        </CardContent>
      </Box>
    </Card>
  );
}
