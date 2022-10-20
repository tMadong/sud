import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/context";

const LogoutPage = () => {
  const appCtx = useContext(AppContext);
  const navigate = useNavigate();
  const logouthandler = () => {
    appCtx.logout();
    navigate("/login");
  };

  const navigateHandler = () => {
    navigate("/products");
  };
  return (
    <div className="bg-white px-10 py-20 text-center w-1/2 shadow-custom rounded-lg">
      <p className="text-lg mb-5">Вы действительно хотите выйти?</p>
      <div className="grid grid-cols-2 gap-5 text-lg">
        <button
          href="#"
          class="text-white bg-gray-800  hover:bg-gray-900  font-medium rounded-lg text-md px-6 py-3 text-center md:w-2/3 mx-auto w-full transition-all"
          onClick={navigateHandler}
        >
          Нет
        </button>
        <button
          href="#"
          class="text-gray-900 border border-gray-900 bg-white  hover:bg-gray-900 hover:text-white font-medium rounded-lg text-md px-6 py-3 text-center md:w-2/3 mx-auto w-full transition-all"
          onClick={logouthandler}
        >
          Да
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
