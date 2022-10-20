import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../url";

const SingleOrderPage = () => {
  const [order, setOrder] = useState({});
  const styleHeaders = "border border-black p-3 text-center";
  const style = "border border-black p-3  font-normal";
  const { id } = useParams();

  const fetchData = async () => {
    const response = await fetch(baseUrl + `order/${id}`);
    const newData = await response.json();
    console.log(newData);
    setOrder(newData);
  };

  const confirmOrder = async () => {
    await fetch(baseUrl + `orders/${id}`, { method: "PUT" });
    fetchData();
  };
  useEffect(() => fetchData, []);

  return (
    <div className="bg-white shadow-custom mx-10 rounded-lg p-10 w-full flex flex-col justify-center gap-5">
      {!!order.length && (
        <>
          <div className="grid grid-cols-2 place-items-center">
            <span className="justify-self-start text-lg font-bold">{`Заказ № ${id}`}</span>
            {+order[1][0].status_id === 1 && (
              <button
                className="bg-green-600 w-1/2 justify-self-end px-4 py-2 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                onClick={confirmOrder}
              >
                Подтверждение
              </button>
            )}
          </div>

          <table className={style}>
            <tr className={style}>
              <th className={styleHeaders}></th>
              <th className={styleHeaders}>Наименование</th>
              <th className={styleHeaders}>Кол-во</th>
              <th className={styleHeaders}>Цена</th>
              <th className={styleHeaders}>Итого</th>
            </tr>
            {!!order.length &&
              order[0].map((item, index) => (
                <tr className={style}>
                  <th className={style}>{index + 1}</th>
                  <th className={style}>{item.name}</th>
                  <th className={style}>{`${item.quantity} шт.`}</th>
                  <th className={style}>{`${item.price} руб.`}</th>
                  <th className={style}>{`${
                    item.quantity * item.price
                  } руб.`}</th>
                </tr>
              ))}
            <tr className={style}>
              <th className={style}></th>
              <th className={styleHeaders}>Итого:</th>
              <th className={style}></th>
              <th className={style}></th>
              <th className={styleHeaders}>
                {`${order[0].reduce(
                  (sum, current) =>
                    sum + current.quantity * current.price,
                  0
                )} руб.`}
              </th>
            </tr>
          </table>
        </>
      )}
    </div>
  );
};

export default SingleOrderPage;
