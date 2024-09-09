import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import MainPart from "./MainPart/MainPart";
import Footer from "../Footer/Footer";
import "../Footer/Footer.css";
import "../Header/Header.css";
import "./MainPart/MainPart.css";
import "./App.css";

interface AppProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const App: React.FC<AppProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className={darkMode ? "app_conteiner_dark" : "app_conteiner"}>
      <div>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      <div>
        <MainPart darkMode={darkMode} />
      </div>
      <div>
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
};

export default App;
