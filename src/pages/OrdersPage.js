import React, { useContext, useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import { AppContext } from "../context/context";
import { baseUrl } from "../url";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const appCtx = useContext(AppContext);

  const fetchData = async () => {
    const response = await fetch(baseUrl + `orders/${appCtx.userId}`);
    const newData = await response.json();
    console.log(response);
    console.log(newData);
    setOrders(newData);
  };
  useEffect(() => fetchData, []);
  return (
    <div className="flex flex-col gap-7 w-full max-w-3xl mx-auto">
      {orders.length ? (
        <>
          {orders.map((item) => (
            <OrderCard
              fetchData={fetchData}
              id={item.order_id}
              status={item.status}
              totalPrice={item.total_price}
            />
          ))}
        </>
      ) : (
        <h2 className="text-center">Заказов нет</h2>
      )}
    </div>
  );
};

export default OrdersPage;
