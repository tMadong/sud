import React, { useContext, useState } from "react";
import { AppContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../url";

const LoginPage = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const [email, setEmail] = useState("");
  const [parol, setParol] = useState("");
  const [repeatParol, setRepeatParol] = useState("");

  const appCtx = useContext(AppContext);
  const navigate = useNavigate();

  const setUser = (userId, userName) => {
    appCtx.setUser(userId, userName);
  };

  const clearInputs = () => {
    setEmail("");
    setParol("");
    setRepeatParol("");
  };

  const changeParolHandler = (e) => {
    const newParol = e.target.value;
    setParol(newParol);
  };
  const changeEmailHandler = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };
  const changeRepeatParol = (e) => {
    const newRepeatParol = e.target.value;
    setRepeatParol(newRepeatParol);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (isRegisterMode) {
      if (
        email.trim() &&
        parol.trim() &&
        repeatParol.trim() &&
        parol.trim() === repeatParol.trim()
      ) {
      }
    } else {
      if (email.trim() && parol.trim()) {
        const response = await fetch(
          baseUrl + `users/${parol}/${email}`
        );

        const data = await response.json();
        console.log(data);
        setUser(data[0].client_id, data[0].name);
        navigate("/products");
      }
      clearInputs();
    }
  };
  const changeModeHandler = (event) => {
    event.preventDefault();
    setIsRegisterMode((state) => !state);
    clearInputs();
  };

  return (
    <div className=" flex flex-col justify-center items-center grow">
      <form className="bg-white py-5 px-10  w-full max-w-[500px] rounded-lg md:shadow-custom align-middle">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-center text-gray-900 text-[36px] font-bold">
              {isRegisterMode ? "Регистрация" : "Авторизация"}
            </h2>
            <button
              className="hover:underline"
              onClick={changeModeHandler}
            >
              {isRegisterMode ? "Есть аккаунт?" : "Нет аккаунта?"}
            </button>
          </div>

          <div className="flex flex-col  gap-2">
            <label className="text-lg text-gray-900">
              Электронная почта:
            </label>
            <input
              type="email"
              className="w-full p-2 rounded-lg ring-1 ring-gray-800 focus:ring-gray-900 focus:ring-2 focus:outline-none"
              placeholder="Электронная почта"
              value={email}
              onChange={changeEmailHandler}
            ></input>
          </div>
          <div className="flex flex-col  gap-2">
            <label className="text-lg text-gray-900">Пароль:</label>
            <input
              type="parol"
              className="w-full p-2 rounded-lg ring-1 ring-gray-800 focus:ring-gray-900 focus:ring-2 focus:outline-none"
              placeholder="Пароль"
              value={parol}
              onChange={changeParolHandler}
            ></input>
          </div>
          {isRegisterMode && (
            <div className="flex flex-col  gap-2">
              <label className="text-lg text-gray-900">
                Повторите пароль:
              </label>
              <input
                type="parol"
                className="w-full p-2 rounded-lg ring-1 ring-gray-800 focus:ring-gray-900 focus:ring-2 focus:outline-none"
                placeholder="Пароль"
                value={repeatParol}
                onChange={changeRepeatParol}
              ></input>
            </div>
          )}

          <button
            type="submit"
            href="#"
            className="text-white bg-gray-800  hover:bg-gray-900  font-medium rounded-lg text-md px-6 py-3 text-center md:w-2/3 mx-auto w-full transition-all"
            onClick={loginHandler}
          >
            {isRegisterMode ? "Создать аккаунт" : "Войти"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
