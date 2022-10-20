import React from "react";
import { NavLink } from "react-router-dom";
import { baseUrl } from "../url";

const OrderCard = (props) => {
  const { id, totalPrice, status } = props;

  const confirmOrder = async () => {
    await fetch(baseUrl + `orders/${id}`, { method: "PUT" });
    props.fetchData();
  };

  return (
    <div className="bg-white w-full p-5  shadow-custom  rounded-lg flex flex-col gap-5">
      <div className="flex justify-between">
        <h2 className="font-bold text-lg">{`Заказ № ${id}`}</h2>
        {status === "В работе" && (
          <button
            className="bg-green-600 px-4 py-2 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            onClick={confirmOrder}
          >
            Подтверждение
          </button>
        )}
      </div>

      <ul className="flex flex-col gap-3">
        <li>
          <span>{`Статус: `}</span>
          <span
            className={
              status === "В работе"
                ? "bg-yellow-400 px-3 py-1.5 rounded-lg font-semibold text-lg "
                : "bg-green-600 px-3 py-1.5 rounded-lg font-semibold text-lg"
            }
          >
            {status}
          </span>
        </li>
        <li className="text-right">
          <NavLink className="underline" to={`/orders/${id}`}>
            Подробнее
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default OrderCard;
