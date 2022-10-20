import React, { useContext, useEffect, useState } from "react";
import {
  TbArrowsDiagonal,
  TbBattery4,
  TbCamera,
} from "react-icons/tb";
import { MdOutlineSdStorage } from "react-icons/md";
import { CgSmartphoneRam } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../url";
import { AppContext } from "../context/context";
import MessageWrapper from "../components/MessageWrapper";

const ListItem = (props) => {
  const { value, metric } = props;
  return (
    <li className="flex gap-5 items-center">
      {props.children}
      <span className="font-bold text-xl">
        {`${value} ${metric}`}{" "}
      </span>
    </li>
  );
};

const ProductPage = () => {
  const [data, setData] = useState({});
  const[isLoading, setIsLoading] = useState(true);
  const appCtx = useContext(AppContext);
  const navigate = useNavigate();
  const addItemHandler = async () => {
    if (appCtx.userId) {
      fetch(baseUrl + "cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: +appCtx.userId,
          product_id: +data.product_id,
        }),
      });
    } else {
      navigate("/login");
    }
  };

  const {
    RAM,
    battery,
    storage,
    screen_size,
    price,
    name,
    camera,
    image,
    description,
  } = data;

  const { id } = useParams();

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(baseUrl + `products/${id}`);
    const newData = await response.json();
    console.log(newData);
    setData(newData[0]);
    setIsLoading(false);
  };

  useEffect(() => fetchData, []);

  return (
    <>
      {isLoading ? (
        <MessageWrapper>
          <p className="text-center">Загружается...</p>
        </MessageWrapper>
      ) : (
        <div className="flex justify-center items-center grow mb-10">
          <div class="flex  p-10 flex-col md:grid md:grid-cols-2 rounded-lg align-middle bg-white shadow-custom max-w-5xl ">
            <img
              class="  mx-auto   rounded-t-lg md:rounded-none md:rounded-l-lg max-w-[300px]"
              src={image}
              alt=""
            />
            <div class=" flex flex-col w-full   justify-center items-end">
              <div className="grid grid-cols-2">
                <h5 class="text-3xl font-bold text-gray-900 ">
                  {name}
                </h5>
                <div className=" grid pl-5">
                  <span class="text-3xl font-semibold text-gray-800 text-right ">
                    {price} &#8381;
                  </span>
                </div>
              </div>
              <button
                href="#"
                class="text-white block bg-gray-900  font-medium rounded-lg text-md px-5 py-2.5 text-center    ease-in-out duration-300  "
                onClick={addItemHandler}
              >
                В корзину
              </button>
              <p class="text-gray-700 text-base mt-3">
                {description}
              </p>
              <ul className="list-none text-gray-700 my-5  grid sm:grid-cols-2  gap-5">
                <ListItem value={camera} metric={"Мп"}>
                  <TbCamera size={48} />
                </ListItem>
                <ListItem value={RAM} metric={"Гб"}>
                  <CgSmartphoneRam size={48} />
                </ListItem>
                <ListItem value={screen_size} metric={"дюйм."}>
                  <TbArrowsDiagonal size={48} />
                </ListItem>
                <ListItem value={storage} metric={"Гб"}>
                  <MdOutlineSdStorage size={48} />
                </ListItem>
                <ListItem value={battery} metric={"mAh"}>
                  <TbBattery4 size={48} />
                </ListItem>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
