import React, { useState, useEffect } from "react";
import "./index.css";
import HomePage from "./HomePage/App";
import CreateProfilePage from "./CreateProfilePage/CreateProfilePage";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers";
import ReactDOM from 'react-dom/client';

const store = configureStore({
  reducer: userReducer,
});

const CoffeeeFriends = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode !== null ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode: any) => !prevMode);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />,
    },
    {
      path: "/createProfilePage",
      element: (
        <CreateProfilePage
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      ),
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <CoffeeeFriends />
    </Provider>
  );
}
reportWebVitals();
