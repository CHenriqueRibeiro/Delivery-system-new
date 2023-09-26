/* eslint-disable react-hooks/rules-of-hooks */

import { Box, Card, CardContent, Typography } from "@mui/material";
import { useCarrinho } from "../../context/useCarrinho";
import { useFormat } from "../../utils/useFormat";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ListCart.css";

export default function ListCart() {
  // const { cart, sumValueItems, deleteFromCart } = useCarrinho();
  const { cart, deleteFromCart } = useCarrinho();

  const handleDelete = (itemId) => {
    deleteFromCart(itemId);
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
          <Box sx={{ height: "45rem", padding: "0 6px" }}>
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
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "90%",
                      }}
                    >
                      <Typography variant="h6">
                        {useFormat(item.valor)}
                      </Typography>
                      <DeleteIcon
                        onClick={() => handleDelete(item.id)}
                        style={{ cursor: "pointer" }}
                      />
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
