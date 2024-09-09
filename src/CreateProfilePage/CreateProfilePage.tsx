import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../Footer/Footer.css";
import "../Header/Header.css";
import MainPartCreateProfilePage from "./MainPartCreateProfilePage/MainPartCreateProfilePage";
import "./MainPartCreateProfilePage/MainPartCreateProfilePage.css";

interface ProfileProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const CreateProfilePage: React.FC<ProfileProps> = ({
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <div className={darkMode ? "app_conteiner_dark" : "app_conteiner"}>
      <div>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      <div>
        <MainPartCreateProfilePage darkMode={darkMode} />
      </div>
      <div>
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
};
export default CreateProfilePage;
