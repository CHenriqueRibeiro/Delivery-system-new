// eslint-disable-next-line no-unused-vars
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./input.css";
export default function BasicTextFields() {
  return (
    /*---Componente Input--*/
    <Box
      id="boxinput"
      className="inputbox"
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Ta com fome de quê?"
        variant="outlined"
      />
    </Box>
    /*---Componente Input--*/
  );
}
