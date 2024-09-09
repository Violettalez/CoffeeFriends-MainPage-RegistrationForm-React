import React, { useState } from "react";
import human from "./Component 29.svg";
import logo from "./Component 33.svg";
import darkTheme from "./darkTheme.png";
import lightTheme from "./lightTheme.svg";
import burgerIcon from "./burgerIcon.svg";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [isMenuClosed, setIsMenuClosed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setTimeout(() => {
      setIsMenuClosed(!isMenuOpen);
    }, 300);
  };

  const accountClick = () => {
    window.location.href = "/accountPage";
  };
  return (
    <header>
      <nav>
        <a className="logo" href="\" draggable="false">
          <img src={logo} alt="logo" draggable="false" />
        </a>
        <div className="burger-menu" onClick={toggleMenu}>
          <img src={burgerIcon} alt="burger menu" draggable="false" />
        </div>
        <ul
          className={
            isMenuOpen ? "menu-open" : isMenuClosed ? "menu-open hide" : ""
          }
        >
          <li>
            <a href="#" draggable="false">
              Про нас
            </a>
          </li>
          <li>
            <a href="#" draggable="false">
              Контакти
            </a>
          </li>
          <li className="theme">
            <button onClick={toggleDarkMode}>
              <img
                className="dark-theme"
                src={darkMode ? lightTheme : darkTheme}
                alt={darkMode ? "light theme" : "dark theme"}
                draggable="false"
              />
            </button>
          </li>
          <li>
            <a href="/#" draggable="false">
              <img src={human} alt="costomer account" draggable="false" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
