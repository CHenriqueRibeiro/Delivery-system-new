import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./app.css";
import Footer from "./components/Footer/footer";
import Menu from "./components/Menu/menu";
import Header from "./components/Header/header";
import Container from "@mui/material/Container";
import cartContext from "./context/cartContext";
import { useState } from "react";

export default function App() {
  const [kart, setKart] = useState([]);

  return (
    <Container id="app" maxWidth="sm">
      <cartContext.Provider value={{ kart, setKart }}>
        <div id="header">
          <Header />
        </div>

        <div id="content">
          <Menu />
        </div>

        <div id="footer">
          <Footer />
        </div>
      </cartContext.Provider>
    </Container>
  );
}
