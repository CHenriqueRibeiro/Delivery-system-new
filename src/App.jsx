import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './app.css';
import Footer from './components/Footer/footer';
import Menu from './components/Menu/menu';
import Header from './components/Header/header';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { FoodContext } from './context/FoodContext';

export default function App() {
  const [kart, setKart] = useState([]);

  return (
    <Container id="app" maxWidth="sm">
      <FoodContext.Provider value={{ kart, setKart }}>
        <div id="header">
          <Header />
        </div>

        <div id="content">
          <Menu />
        </div>

        <div id="footer">
          <Footer />
        </div>
      </FoodContext.Provider>
    </Container>
  );
}
