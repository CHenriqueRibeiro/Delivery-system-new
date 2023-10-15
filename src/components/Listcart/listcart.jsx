/* eslint-disable react-hooks/rules-of-hooks */

import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useCarrinho } from "../../context/useCarrinho";
import { useFormat } from "../../utils/useFormat";
import DeleteIcon from "@mui/icons-material/Delete";
import "../Listcart/listcart.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function ListCart() {
  
  const { cart, deleteFromCart, addToCart, removeQuantityFromCart } =
    useCarrinho();

  const handleDelete = (item) => {
    deleteFromCart(item);
  };

  const handleIncrement = (item) => {
    const date = new Date();
    addToCart({ ...item, key: date.getMilliseconds() });
   
  };

  const handleDecrement = (item) => {
    const date = new Date();
    
    if (item && item.quantidade > 1) {
      const updatedItem = { ...item, key: date.getMilliseconds() };
      updatedItem.quantidade -= 1;
      removeQuantityFromCart(updatedItem);
    }
  };

  return (
    <>
      <Box
        sx={{
          marginTop: "-1.8rem",
          maxHeight: "60vh",
          overflow: "auto",
        }}
      >
        <Box>
          <Box sx={{ height: "45rem" }}>
            {cart.map((item) => (
              <Card
                id="itemCard"
                key={item.id}
                sx={{
                  position: "relative",
                  display: "flex",
                  backgroundColor: "#fae9de",
                  height: "10rem",
                  maxHeight: "10rem",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: "29px !important",
                  margin: "0.4rem 0 10px 0",
                  border: "3px #f46c26 solid",
                  boxShadow:
                    "2px 8px 7px 5px #0003, 2px 2px 3px -1px #00000024, 2px 6px 4px #0000001f !important",
                }}
              >
                <CardContent
                  sx={{
                    position: "relative",
                    display: "flex",
                    backgroundColor: "#fae9de",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    padding: "0 !important",
                  }}
                >
                  <img
                    src={item.imagem}
                    alt="imagem do item escolhido"
                    className="ImgCardListCard"
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      alignItems: "start",
                      backgroundColor: "#fae9de",
                      height: "100%",
                      width: "100%",
                      paddingLeft: "1rem",
                      paddingRight: "0.5rem;",
                    }}
                  >
                    <Typography variant="h6">{item.sabor}</Typography>
                    <Typography>{item.ingredientes}</Typography>
                    <Typography variant="body2" gutterBottom>{item.adicionais.map(item => item.name).join(", ")}</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "90%",
                      }}
                    >
                      <Typography variant="h6">
                        {useFormat(item.valorTotalDoProduto)}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          marginLeft: "1rem",
                        }}
                      >
                        <DeleteIcon
                          className="click"
                          onClick={() => handleDelete(item)}
                          style={{ cursor: "pointer" }}
                        />
                        <Button
                          sx={{ color: "#201e1d" }}
                          onClick={() => handleDecrement(item)}
                          disabled={item.quantidade === 1}
                        >
                          <RemoveIcon />
                        </Button>
                        <span style={{ maxWidth: "10px" }}>
                          {item.quantidade}
                        </span>
                        <Button
                          sx={{ color: "#201e1d" }}
                          onClick={() => handleIncrement(item)}
                        >
                          <AddIcon />
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
