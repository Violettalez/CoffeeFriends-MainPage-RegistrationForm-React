import React from "react";
import instagramLogo from "./instagramLogo.png";
import tikrtokLogo from "./tiktokLogo.png";

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer>
      <ul>
        <li>
          <a href="#" draggable="false">
            Конфедеційність
          </a>
        </li>
        <li>
          <a href="#" draggable="false">
            Умови
          </a>
        </li>
        <li>
          <a href="#" draggable="false">
            Інтелектуальна власність
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#" draggable="false">
            Часті питання
          </a>
        </li>
        <li>
          <a href="#" draggable="false">
            Країни
          </a>
        </li>
        <li>
          <a href="#" draggable="false">
            Преса
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#" draggable="false">
            Контакти
          </a>
        </li>
        <li>
          <a href="#" draggable="false">
            Умови
          </a>
        </li>
        <li>
          <a href="#" draggable="false">
            Промокод
          </a>
        </li>
      </ul>
      <div className="socialMedia">
        <div className="media">
          <a href="#" draggable="false">
            <img src={tikrtokLogo} alt="TikTok" draggable="false" />
          </a>
          <a href="#" draggable="false">
            <img src={instagramLogo} alt="Instagram" draggable="false" />
          </a>
        </div>
        <div>
          <p>&copy; 2024 Coffee Friends. Всі права захищені</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
