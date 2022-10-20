import React, { useContext } from "react";
import { baseUrl } from "../url";

import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineDelete,
} from "react-icons/ai";
import { AppContext } from "../context/context";

const CartCard = (props) => {
  const { product_id, image, price, quantity, name } = props;
  const totalPrice = price * quantity;
  const appCtx = useContext(AppContext);

  const deleteCartItem = async () => {
    await fetch(baseUrl + `cart/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: +appCtx.userId,
        product_id: +product_id,
      }),
    });
    await props.fetchData();
  };
  const fetchToCart = async (mode) => {
    await fetch(baseUrl + `cart/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: +appCtx.userId,
        product_id: +product_id,
        decrease_mode: mode,
      }),
    });
    await props.fetchData();
  };
  const decreaseCartItem = async () => {
    fetchToCart(true);
  };
  const addItem = async () => {
    fetchToCart(false);
  };
  return (
    <div className="bg-white p-5 md:px-10 shadow-custom  rounded-lg grid grid-cols-1 md:grid-cols-2  gap-5 transition-all">
      <div className="grid  gap-5 md:grid-cols-2 items-center ">
        <img
          class="rounded-t-lg  max-w-[150px] mx-auto"
          src={image}
          alt="product image"
        />
        <h3 class="text-gray-900 font-semibold text-lg tracking-tight text-center md:text-start">
          {name}
        </h3>
      </div>

      <div
        className="w-full  md:flex-row justify-center md:justify-end items-center gap-2
      grid md:grid-cols-3"
      >
        <span className="flex  items-center text-gray-900  text-xl ">
          {price}&#8381;
        </span>
        <div className=" flex justify-center">
          <div className="grid grid-cols-3 justify-between ">
            <button
              className="hover:bg-red-600 hover:text-white transition-all text-gray-900    shadow-custom font-bold rounded-md  w-8 h-8 flex justify-center items-center text-2xl"
              onClick={decreaseCartItem}
            >
              <AiOutlineMinus />
            </button>
            <span className="flex justify-center items-center text-gray-900 font-semibold text-lg ">
              {quantity}
            </span>
            <button
              className=" hover:bg-green-600 hover:text-white transition-all text-gray-900    shadow-custom font-bold rounded-md  w-8 h-8 flex justify-center items-center text-2xl"
              onClick={addItem}
            >
              <AiOutlinePlus />
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3  items-center ">
          <span className="  flex items-center text-gray-900  text-xl ">
            {totalPrice}
          </span>

          <div className="flex justify-end">
            <button
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
              }}
              className="  text-gray-900 hover:text-white hover:bg-red-600 transition-all rounded-md  w-8 h-8 flex justify-center items-center text-2xl"
              onClick={deleteCartItem}
            >
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
