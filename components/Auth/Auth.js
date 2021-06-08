import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth({ onCloseModal, setTitleModal }) {
  const [showLogin, setShowLogin] = useState(true);

  const showLoginForm = () => {
    setShowLogin(true);
    setTitleModal("Inicia sesión");
  };
  const showRegisterForm = () => {
    setShowLogin(false);
    setTitleModal("Crear nuevo usuario");
  };

  return showLogin ? (
    <LoginForm
      showRegisterForm={showRegisterForm}
      onCloseModal={onCloseModal}
    />
  ) : (
    <RegisterForm showLoginForm={showLoginForm} />
  );
}
