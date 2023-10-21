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
          width: "98%",
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
                  height: "auto",
                  width: "100%",
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
                    <Typography
                      sx={{
                        width: "100%",
                      }}
                      variant="h6"
                    >
                      {item.sabor}
                    </Typography>
                    <Typography
                      sx={{
                        width: "100%",
                        borderBottom: "2px dotted",
                      }}
                    >
                      {item.ingredientes}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        {" "}
                        <Typography
                          sx={{
                            width: "100%",
                          }}
                          variant="body2"
                          gutterBottom
                        >
                          <em>
                            <b>Opicional do combo:</b>
                          </em>{" "}
                          {item.refrigeranteDoCombo}
                        </Typography>
                        <Typography
                          sx={{
                            width: "100%",
                          }}
                          variant="body2"
                          gutterBottom
                        >
                          <em>
                            <b>Opicionais:</b>
                          </em>{" "}
                          {item.opicionais}
                        </Typography>
                        {item.adicionais && item.adicionais.length > 0 && (
                          <Box>
                            <Typography
                              sx={{
                                width: "100%",
                              }}
                              variant="body2"
                              gutterBottom
                            >
                              {" "}
                              <em>
                                <b>Adicionais:</b>
                              </em>
                            </Typography>
                            {item.adicionais.map((adicional) => (
                              <Typography
                                sx={{
                                  width: "100%",
                                }}
                                variant="body2"
                                gutterBottom
                                key={adicional.id}
                              >
                                ({adicional.qtde}x) {adicional.name} {""}
                                {useFormat(adicional.valor)}
                              </Typography>
                            ))}
                          </Box>
                        )}
                        <Typography
                          sx={{
                            width: "100%",
                          }}
                          variant="body2"
                          gutterBottom
                        >
                          <em>
                            <b>Valor Adicionais:</b>
                          </em>{" "}
                          {useFormat(item.valorTotalAdicionais)}
                        </Typography>
                        <Typography
                          sx={{
                            width: "100%",
                          }}
                          variant="body2"
                          gutterBottom
                        >
                          <em>
                            <b>Observação:</b>
                          </em>{" "}
                          {item.observacao}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",

                        borderTop: "2px dotted",
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
