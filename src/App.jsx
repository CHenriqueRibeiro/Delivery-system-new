import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './app.css';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CarrinhoProvider } from './context/useCarrinho';

export default function App() {
  const [kart, setKart] = useState([]);

  return (
    <Container id="app" maxWidth="sm">
      <CarrinhoProvider value={{ kart, setKart }}>
        {/* <Box
          id="header"
          sx={{
            display: 'flex',
            backgroundColor: '#fbe9dd',
            width: '100%',
            height: '38%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Header />
        </Box> */}

        <Outlet />
        {/* <Box id="footer">
          <Footer />
        </Box> */}
      </CarrinhoProvider>
    </Container>
  );
}
