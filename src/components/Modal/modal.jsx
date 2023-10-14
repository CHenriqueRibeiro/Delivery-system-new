









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
              <Typography
                variant="h6"
                id="confirmation-modal-title"
              ></Typography>
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
              {
                Object.keys(adicional).map(key => (
              <Box
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
                   {key}  <Box>{useFormat(1.99)}</Box>
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
                      /*onClick={() => handleIngredientDecrement({key})}*/
                    >
                      -
                    </Button>
                    <Typography>{adicional[key]}</Typography>
                    <Button
                      sx={{ color: "black" }}
                      /*onClick={() => handleIngredientIncrement({key})}*/
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
                  onClick={() => {
                     const adicionais = adicional.filter(item => (item.calabresa > 0 || item.queijo > 0))[0];
                    const adicionalCalabresa = adicional.reduce(
                      (total, combo) => total + 1.99 * combo.calabresa,
                      0
                    );

                    const adicionalQueijo = adicional.reduce(
                      (total, combo) => total + 1.99 * combo.queijo,
                      0
                    );

                    const valorTotalAdicionais =
                      adicionalCalabresa + adicionalQueijo;

                    const valorTotalDoProduto =
                      valorTotalAdicionais + itemToAdd.valor;
                    const itemToAddWithQuantity = {
                      ...itemToAdd,
                      refrigeranteDoCombo,
                      observacao,
                      bordaSelecionada,
                      adicionais,
                      valorTotalAdicionais,
                      valorTotalDoProduto,
                    };
                    addToCart(itemToAddWithQuantity);
                    setIsModalOpen(false);
                    setIsSegundoModalOpen(false);
                  }}
                >
                  Adicionar ao carrinho
                </Button>
              </Box>
            </Box>
          </Modal>