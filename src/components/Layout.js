import React, { useContext, useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AppContext } from "../context/context";
import { BsPersonCircle } from "react-icons/bs";
import Modal from "./Modal";

const NavigateLink = (props) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "  bg-white text-gray-900 p-5 block text-center hover:bg-white hover:text-gray-900 transition"
          : "p-5 block text-center hover:bg-white hover:text-gray-900 transition"
      }
      to={props.link}
    >
      {props.children}
    </NavLink>
  );
};

const Layout = () => {
  const appCtx = useContext(AppContext);
  const userName = appCtx.userName;
  useEffect(() => {
    appCtx.checkSavedUser();
    console.log(appCtx);
  }, []);
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <header className="bg-white text-gray-900 text-2xl  mb-5 shadow-custom ">
          <div className="container relative  mx-auto px-4 max-w-5xl grid grid-cols-5 ">
            <span className="h-full text-center grid place-items-center  ">
              <NavLink to="/products">LOGO</NavLink>
            </span>
            <ul className="col-start-2 col-span-3 list-none grid grid-cols-4  text-xl  ">
              <li>
                <NavigateLink link={"/products"}>Товары</NavigateLink>
              </li>
              <li>
                {userName && (
                  <NavigateLink link={"/orders"}>Заказы</NavigateLink>
                )}
              </li>
              <li>
                {userName && (
                  <NavigateLink link={"/cart"}>Корзина</NavigateLink>
                )}
              </li>
              <li>
                {userName ? (
                  <NavigateLink link={"/logout"}>Выйти</NavigateLink>
                ) : (
                  <NavigateLink link={"/login"}>Войти</NavigateLink>
                )}
              </li>
            </ul>
            <span className="grid place-items-center h-full text-center  ">
              {userName && (
                <div className="flex justify-between gap-5 items-center">
                  <span>
                    <BsPersonCircle />
                  </span>
                  <span>{userName} </span>
                </div>
              )}
            </span>
          </div>
        </header>

        <div className="container flex mx-auto justify-center   max-w-4xl   ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
