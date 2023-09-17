import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './app.css';
import Footer from './components/Footer/footer';
import Header from './components/Header/header';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { FoodContext } from './context/FoodContext';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

export default function App() {
  const [kart, setKart] = useState([]);

  return (
    <Container id="app" maxWidth="sm">
      <FoodContext.Provider value={{ kart, setKart }}>
        <Box
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
        </Box>

        <Outlet />
        <Box id="footer">
          <Footer />
        </Box>
      </FoodContext.Provider>
    </Container>
  );
}
