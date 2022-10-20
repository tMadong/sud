import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CartCard from "../components/CartCard";
import MessageWrapper from "../components/MessageWrapper";
import { AppContext } from "../context/context";
import { baseUrl } from "../url";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const appCtx = useContext(AppContext);
  const navigate = useNavigate();
  const fetchData = async () => {
    console.log("FETCH DATA CART ITEMS");
    const response = await fetch(baseUrl + `cart/${appCtx.userId}`);
    const newData = await response.json();
    console.log(newData);
    setCartItems(newData);
  };

  const deleteCart = async () => {
    await fetch(baseUrl + `cart/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: +appCtx.userId,
      }),
    });
    await fetchData();
  };

  const orderHandler = async () => {
    console.log("user id: " + appCtx.userId);
    await fetch(baseUrl + `orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: appCtx.userId,
      }),
    });
    // await fetchData();
    navigate("/orders");
  };

  useEffect(() => fetchData, []);

  return (
    <>
      {!!cartItems.length ? (
        <div className="flex flex-col gap-7 w-full max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-5 justify-between w-full">
            <div className="flex justify-end gap-20 md:gap-5 min-w-full md:w-1/2">
              <button
                className="bg-white  hover:bg-red-600 text-gray-600 border border-gray-200  font-medium rounded-lg text-md px-5 py-2.5 text-center   transition-all hover:border-red-600  hover:text-white "
                onClick={deleteCart}
              >
                Очистить корзину
              </button>
              <button
                className="text-white bg-green-600  hover:bg-green-700  font-medium rounded-lg text-md px-5 py-2.5 text-center w-1/3  transition-all"
                onClick={orderHandler}
              >
                Заказать
              </button>
            </div>
          </div>
          <div className="mb-3 grid gap-5">
            {cartItems.map((item) => (
              <CartCard
                fetchData={fetchData}
                product_id={item.product_id}
                key={item.product_id}
                image={item.image}
                price={item.price}
                quantity={item.quantity}
                name={item.name}
              />
            ))}
          </div>
        </div>
      ) : (
        <MessageWrapper>
          <div className="flex flex-col gap-5">
            <p className="text-center text-xl">Корзина пуста</p>
            <NavLink
              className="text-white bg-gray-800  hover:bg-gray-900  font-medium rounded-lg text-md px-6 py-3 text-center md:w-2/3 mx-auto w-full transition-all"
              to={"/products"}
            >
              Каталог
            </NavLink>
          </div>
        </MessageWrapper>
      )}
    </>
  );
};

export default CartPage;
