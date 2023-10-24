import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Logo from "@mui/material/Avatar";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./header.css";
import { Typography } from "@mui/material";

export default function Header() {
  const imagem =
    "https://img.freepik.com/vetores-premium/modelo-de-logo-de-taco-logotipo-de-emblema-de-comida-de-taco_664675-608.jpg";

  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",

          padding: " 10px 4px",
          position: "absolute",

          width: " 80%",
          minWidth: "270px",
          maxWidth: "540px",
          minHeight: "78px",
          borderRadius: "25px !important",
          boxShadow:
            "2px 0px 10px 1px rgba(0, 0, 0, 0.2), 4px 6px 10px 2px rgba(0, 0, 0, 0.14), 6px 6px 8px 3px rgba(0, 0, 0, 0.12)",

          border: " 1px #f76d26 solid",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Box id="teste">
          <Logo id="imglogo" alt="Remy Sharp" src={imagem} />

          <Box className="row">
            <h2>Taco Tex-Mex</h2>

            <Typography>
              {<WhatsAppIcon className="iconscontact" />}85 998767654
            </Typography>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
