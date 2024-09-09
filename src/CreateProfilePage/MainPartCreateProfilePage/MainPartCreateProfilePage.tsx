import React, { useState, ChangeEvent } from "react";
import shortLogo from "../../shortLogo.svg";
import nextInterests from "./next.svg";
import lastInterests from "./last.svg";
import styled, { keyframes } from "styled-components";
import { rotateInDownLeft } from "react-animations";
import { rotateInUpLeft } from "react-animations";
import { pulse } from "react-animations";
import { zoomIn } from "react-animations";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setName } from "../../reducers";

const rInDownLeft = keyframes`${rotateInDownLeft}`;
const rInUpLeft = keyframes`${rotateInUpLeft}`;
const pulseCircle = keyframes`${pulse}`;
const zoom = keyframes`${zoomIn}`;

const RotateCircleInDownLeft = styled.div`
  animation: 2s ${rInDownLeft};
`;
const FormZoom = styled.div`
  animation: 0.5s ${zoom};
`;
const RotateCircleInUpLeft = styled.div`
  animation: 4s ${rInUpLeft};
`;
const PulseCircle = styled.div`
  animation: 2s ${pulseCircle} infinite;
`;

const MainPartCreateProfilePage: React.FC<{ darkMode: boolean }> = ({
  darkMode,
}) => {
  const dispatch = useDispatch();

  const myDataEmail = useSelector((state: any) => state.user?.email);
  const myDataName = useSelector((state: any) => state.user?.name);

  const [step, setStep] = useState(1);
  const [email, setEmailPerson] = useState("");
  const [name, setNamePerson] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [selectedValueSex, setSelectedValueSex] = useState("");
  const [selectedValueSearch, setSelectedValueSearch] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  const nextStep = () => {
    setStep(step + 1);
    setMessage("");
  };
  const lastStep = () => {
    setStep(step - 1);
    setMessage("");
  };

  //Function to check the entered email and password data
  const checkEmailPassword = async () => {
    const messageElement = document.getElementById("passMessage");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,7}$/;
    if (email.length === 0) {
      setMessage("Введіть пошту");
      if (messageElement) {
        messageElement.style.display = "block";
      }
      return;
    }
    if (!emailRegex.test(email)) {
      setMessage("Введіть правильну пошту");
      if (messageElement) {
        messageElement.style.display = "block";
      }
      return;
    }
    if (password.length === 0) {
      setMessage("Введіть пароль");
      if (messageElement) {
        messageElement.style.display = "block";
      }
      return;
    }
    if (confirmPassword.length === 0) {
      setMessage("Введіть повторення паролю");
      if (messageElement) {
        messageElement.style.display = "block";
      }
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Невірно повторено пароль");
      if (messageElement) {
        messageElement.style.display = "block";
      }
      return;
    }
    setMessage("");
    nextStep();
  };

  //Function for checking the entered name and date of birth
  const validateNameBirthday = () => {
    const messageElement = document.getElementById("passMessage2");
    if (!name) {
      setMessage("Будь ласка, введіть Ваше ім'я");
      if (messageElement) {
        messageElement.style.display = "block";
      }
      return false;
    }
    if (!dob) {
      setMessage("Будь ласка, введіть Вашу дату народження");
      if (messageElement) {
        messageElement.style.display = "block";
      }
      return false;
    }
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dob.match(dobRegex)) {
      setMessage(
        "Будь ласка, введіть коректну дату народження у форматі YYYY-MM-DD"
      );
      if (messageElement) {
        messageElement.style.display = "block";
      }
      return false;
    }
    setMessage("");
    nextStep();
  };

  //Function for checking the entered sex and search type person
  const checkSexSearch = () => {
    const messageElement = document.getElementById("passMessage3");
    if (!selectedValueSex || selectedValueSex == "") {
      setMessage("Будь ласка, виберіть Вашу стать");
      if (messageElement) {
        messageElement.style.display = "block";
      }
      return false;
    }
    if (!selectedValueSearch || selectedValueSearch == "") {
      setMessage("Будь ласка, виберіть кого Ви шукаєте");
      if (messageElement) {
        messageElement.style.display = "block";
      }
      return false;
    }
    setMessage("");
    nextStep();
  };

  //Function for checking the entered city
  const checkCity = () => {
    const messageElement = document.getElementById("passMessage4");
    if (!city || city == "") {
      setMessage("Будь ласка, виберіть Ваше місто");
      if (messageElement) {
        messageElement.style.display = "block";
      }
      return false;
    }
    setMessage("");
    nextStep();
  };

  const handleChangeSex = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValueSex(event.currentTarget.value);
  };
  const handleChangeSearch = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValueSearch(event.currentTarget.value);
  };
  const handleChangeCity = (event: ChangeEvent<HTMLSelectElement>) => {
    setCity(event.currentTarget.value);
  };

  //Geolocation
  const handleGetGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a1774e91bbf4f8ded617cdb9a6dff943&lang=uk`
          )
            .then((response) => response.json())
            .then((data) => {
              const cityName = data.name;
              setCity(cityName);
            })
            .catch((error) => {
              console.error(
                "Помилка отримання назви населеного пункта:",
                error
              );
            });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            alert(
              "Для получения местоположения разрешите доступ к геолокации в настройках браузера."
            );
          } else {
            console.error("Помилка отримання геолокації:", error);
          }
        }
      );
    } else {
      console.error("Геолокація не підтримується браузером");
    }
  };

  //Processing of saving user interests in three stages according to the "checked/unchecked" principle

  let interests1: string[] = [
    "Мистецтво",
    "Спорт",
    "Музика",
    "Подорожі",
    "Наука",
    "Кулінарія",
    "Література",
    "Техніка",
    "Відеоігри",
    "Читання",
    "Волонтерство",
    "Психологія",
    "Фотографія",
    "Живопис",
    "Медицина",
    "Поезія",
  ];
  let interests2: string[] = [
    "Настільні ігри",
    "Дегустація їжі",
    "Екотуризм",
    "Історія",
    "Активізм",
    "Соціологія",
    "Інженерія",
    "Класична музика",
    "Футбол",
    "Фітнес",
    "Скульптура",
    "Джаз",
    "Пригоди",
    "Астрономія",
    "Велоспорт",
    "Рок",
  ];
  let interests3: string[] = [
    "Програмування",
    "Ботаніка",
    "Екзотичні місця",
    "Комп'ютерні технології",
    "Детективи",
    "Альпінізм",
    "Філософія",
    "Малювання",
    "Йога",
    "Збереження природи",
    "Театр",
    "Фантастика",
    "Плавання",
    "Туризм",
  ];

  const [stepInterest, setStepInterest] = useState(1);
  const nextStepInterest = () => {
    setStepInterest(stepInterest + 1);
  };
  const lastStepInterest = () => {
    setStepInterest(stepInterest - 1);
  };

  const [buttonStates, setButtonStates] = useState<boolean[]>(
    Array(interests1.length).fill(false)
  );
  const [buttonStatesPartThree, setButtonStatesPartThree] = useState<boolean[]>(
    Array(interests3.length).fill(false)
  );
  const [interestsBttns, setInterests] = useState<string[]>([]);
  const [buttonStatesSecondPart, setButtonStatesSecondPart] = useState<
    boolean[]
  >(Array(interests2.length).fill(false));

  const handleClickInterestsToArray = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    interest: string,
    part: number,
    index: number
  ) => {
    event.preventDefault();
    if (!interestsBttns.includes(interest)) {
      setInterests([...interestsBttns, interest]);
    } else {
      setInterests(interestsBttns.filter((item) => item !== interest));
    }

    if (part === 1) {
      const newButtonStates = [...buttonStates];
      newButtonStates[index] = !newButtonStates[index];
      setButtonStates(newButtonStates);
    } else if (part === 2) {
      const newButtonStates = [...buttonStatesSecondPart];
      newButtonStates[index] = !newButtonStates[index];
      setButtonStatesSecondPart(newButtonStates);
    } else if (part === 3) {
      const newButtonStates = [...buttonStatesPartThree];
      newButtonStates[index] = !newButtonStates[index];
      setButtonStatesPartThree(newButtonStates);
    }
  };

  const getButtonClassName = (index: number, part: number) => {
    if (part === 1) {
      return buttonStates[index]
        ? "interests_button_selected"
        : "interests_buttons";
    } else if (part === 2) {
      return buttonStatesSecondPart[index]
        ? "interests_button_selected"
        : "interests_buttons";
    } else if (part === 3) {
      return buttonStatesPartThree[index]
        ? "interests_button_selected"
        : "interests_buttons";
    }
  };

  const interests_buttons1 = interests1.map((item, index) => (
    <button
      key={index}
      className={getButtonClassName(index, 1)}
      onClick={(event) => handleClickInterestsToArray(event, item, 1, index)}
    >
      {item}
    </button>
  ));
  const interests_buttons2 = interests2.map((item, index) => (
    <button
      key={index}
      className={getButtonClassName(index, 2)}
      onClick={(event) => handleClickInterestsToArray(event, item, 2, index)}
    >
      {item}
    </button>
  ));
  const interests_buttons3 = interests3.map((item, index) => (
    <button
      key={index}
      className={getButtonClassName(index, 3)}
      onClick={(event) => handleClickInterestsToArray(event, item, 3, index)}
    >
      {item}
    </button>
  ));

  //Function to send user data to server
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      email,
      password,
      name,
      dob,
      selectedValueSex,
      selectedValueSearch,
      city,
      interestsBttns,
    };

    console.log(email + name);

    dispatch(setEmail(email));
    dispatch(setName(name));

    console.log(myDataEmail);
    console.log(myDataName);

    fetch("http://reactserver/index.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === "double-email") {
          const messageElement = document.getElementById("passMessageReg");
          setMessage(
            "Нажаль, користувач з такою електронною поштою вже є. Будь ласка, поверніться до минулого єтапу та вкажіть іншу електронну пошту"
          );
          if (messageElement) {
            messageElement.style.display = "block";
          }
        } else {
          if (data.status === "success") {
            nextStep();
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const finishClick = () => {
    window.location.href = "/accountPage";
  };

  const startClick = () => {
    window.location.href = "/generMeetingsPage";
  };

  return (
    <main>
      <RotateCircleInUpLeft className="circleProfilePage1"></RotateCircleInUpLeft>
      <PulseCircle className="circleProfilePage2"></PulseCircle>
      <PulseCircle className="circleProfilePage3"></PulseCircle>
      <PulseCircle className="circleProfilePage4"></PulseCircle>
      <PulseCircle className="circleProfilePage5"></PulseCircle>
      <PulseCircle className="circleProfilePage6"></PulseCircle>
      <RotateCircleInDownLeft className="circleProfilePage7"></RotateCircleInDownLeft>
      <form className="registration" onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="registrationForm">
            <FormZoom>
              <p className="form-label1">Введіть електронну пошту:</p>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmailPerson(e.target.value)}
              />
              <p className="form-label">Введіть пароль:</p>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="form-label">Повторіть пароль:</p>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <p className="message" id="passMessage">
                {message}
              </p>
            </FormZoom>
            <div className="buttons">
              <button
                type="button"
                className="formNextButton"
                onClick={checkEmailPassword}
              >
                Далі
              </button>
              <a className="login_in_link" href="#">
                В мене вже є профіль
              </a>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="registrationForm">
            <FormZoom>
              <p className="form-label1">Введіть своє ім'я:</p>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setNamePerson(e.target.value)}
              />
              <p className="form-label">Введіть дату народження:</p>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <p className="message" id="passMessage2">
                {message}
              </p>
            </FormZoom>
            <div className="buttons">
              <button
                type="button"
                className="formNextButton"
                onClick={validateNameBirthday}
              >
                Далі
              </button>
              <button
                type="button"
                className="formLastButton"
                onClick={lastStep}
              >
                Назад
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="registrationForm">
            <FormZoom>
              <p className="form-label1">Ваша стать:</p>
              <select value={selectedValueSex} onChange={handleChangeSex}>
                <option value="">Виберіть варіант</option>
                <option value="male">Чоловіча</option>
                <option value="female">Жіноча</option>
                <option value="other">Інше</option>
              </select>
              <p className="form-label">Кого шукаєте:</p>
              <select value={selectedValueSearch} onChange={handleChangeSearch}>
                <option value="">Виберіть варіант</option>
                <option value="boyfriend">Хлопця</option>
                <option value="girlfriend">Дівчину</option>
                <option value="male_friend">Друга</option>
                <option value="female_friend">Подругу</option>
              </select>
              <p className="message" id="passMessage3">
                {message}
              </p>
            </FormZoom>
            <div className="buttons">
              <button
                type="button"
                className="formNextButton"
                onClick={checkSexSearch}
              >
                Далі
              </button>
              <button
                type="button"
                className="formLastButton"
                onClick={lastStep}
              >
                Назад
              </button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="registrationForm">
            <FormZoom>
              <p className="form-label1">Вкажіть ваше місто:</p>
              <select value={city} onChange={handleChangeCity}>
                <option value="">Виберіть варіант</option>
                <option value="Kyiv">Київ</option>
                <option value="Mykolaiv">Миколаїв</option>
                <option value="Odesa">Одеса</option>
                <option value="Kharkiv">Харків</option>
                <option value="Poltava">Полтава</option>
                <option value="Dnipro">Дніпро</option>
              </select>
              <p className="form-label">
                Або дозвольте нам відстежувати геолокацію
              </p>
              <button
                className="gps_button"
                type="button"
                onClick={handleGetGeoLocation}
              >
                Дозволити
              </button>
              <p className="message" id="passMessage4">
                {message}
              </p>
              {city && <p>Ваше місто: {city}</p>}
            </FormZoom>
            <div className="buttons">
              <button
                type="button"
                className="formNextButton"
                onClick={checkCity}
              >
                Далі
              </button>
              <button
                type="button"
                className="formLastButton"
                onClick={lastStep}
              >
                Назад
              </button>
            </div>
          </div>
        )}
        {step === 5 && (
          <div className="registrationForm">
            <FormZoom>
              <p className="form-label2">Цікаві теми для Вас:</p>
              {stepInterest === 1 && (
                <div className="int_butt">
                  {interests_buttons1}
                  <button
                    type="button"
                    className="next_interests_button"
                    onClick={nextStepInterest}
                  >
                    <img src={nextInterests} alt="next interests" />
                  </button>
                </div>
              )}
              {stepInterest === 2 && (
                <div className="int_butt">
                  {interests_buttons2}
                  <button
                    type="button"
                    className="next_interests_button"
                    onClick={lastStepInterest}
                  >
                    <img
                      src={lastInterests}
                      alt="next interests"
                      className="image_reserve"
                    />
                  </button>
                  <button
                    type="button"
                    className="next_interests_button"
                    onClick={nextStepInterest}
                  >
                    <img src={nextInterests} alt="next interests" />
                  </button>
                </div>
              )}
              {stepInterest === 3 && (
                <div className="int_butt">
                  {interests_buttons3}
                  <button
                    type="button"
                    className="next_interests_button"
                    onClick={lastStepInterest}
                  >
                    <img
                      src={lastInterests}
                      alt="next interests"
                      className="image_reserve"
                    />
                  </button>
                </div>
              )}
            </FormZoom>
            <p className="message" id="passMessageReg">
              {message}
            </p>
            <div className="buttons">
              <button type="submit" className="formRegButton">
                Реєстрація
              </button>
              <button
                type="button"
                className="formLastButton"
                onClick={lastStep}
              >
                Назад
              </button>
            </div>
          </div>
        )}
        {step === 6 && (
          <div className="registrationForm">
            <FormZoom>
              <blockquote className="form6_message">
                Дякуємо за реєстрацію. Тепер Ви можете порейти в профіль для
                подальшого використання застосунку. Приємної Вам кави!
              </blockquote>
              <blockquote className="form6_message2">
                З любов'ю, команда CoffeeFriends
              </blockquote>
              <div className="buttonsFinish">
                <button
                  type="button"
                  className="formFinishButton"
                  onClick={finishClick}
                >
                  Профіль
                </button>
                <button
                  type="button"
                  className="formFinishButton"
                  onClick={startClick}
                >
                  Хочу піти на каву
                </button>
              </div>
            </FormZoom>
          </div>
        )}
        <div className="logo-circle">
          <img
            className="shortLogoProfilePage"
            src={shortLogo}
            alt="shortLogo"
            draggable="false"
          />
        </div>
      </form>
    </main>
  );
};

export default MainPartCreateProfilePage;
