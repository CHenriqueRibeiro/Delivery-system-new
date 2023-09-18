import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Logo from '@mui/material/Avatar';
import Input from '../Input/input';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import './header.css';

export default function Header() {
  const imagem =
    'https://img.freepik.com/vetores-premium/modelo-de-logo-de-taco-logotipo-de-emblema-de-comida-de-taco_664675-608.jpg';

  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        id="containerheader" /*---Todo o conteudo da descriçao(LOGO e ESTABELECIMENTO)--*/
      >
        <div id="teste" /*---(LOGO e ESTABELECIMENTO)--*/>
          <Logo
            id="imglogo"
            alt="Remy Sharp"
            src={imagem} /*---LOGO --*/
          />

          <div
            className="row" /*---Descrição(ESTABELECIMENTO E TELEFONE)--*/
          >
            <h2 /*---Descrição ESTABELECIMENTO--*/>
              Taco Tex-Mex
            </h2>

            <p /*---Descrição TELEFONE--*/>
              {<WhatsAppIcon className="iconscontact" />}85
              998767654
            </p>
          </div>
        </div>
      </Box>

      <Input /*---Componente Input--*/ />
    </React.Fragment>
  );
}
