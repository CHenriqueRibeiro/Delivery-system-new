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
      <Box id="containerheader">
        <Box id="teste">
          <Logo id="imglogo" alt="Remy Sharp" src={imagem} />

          <Box className="row">
            <h2>Taco Tex-Mex</h2>

            <Typography>{<WhatsAppIcon className="iconscontact" />}85 998767654</Typography>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
