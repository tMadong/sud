import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/context";
import { baseUrl } from "../url";

const ProductCard = (props) => {
  const { name, image, price, product_id } = props;
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
          product_id: +product_id,
        }),
      });
    } else {
      navigate("/login");
    }
  };
  return (
    <div class="max-w-2xl mx-auto">
      <div class="bg-white shadow-custom hover:shadow-xl hover:translate-y-[-0.25rem] min-h-full transition-all rounded-lg max-w-sm flex flex-col justify-between  py-6">
        <NavLink
          className=" aspect-square"
          to={`/products/${product_id}`}
        >
          <img
            class="rounded-t-lg   mx-auto 	w-4/5 "
            src={image}
            alt="product image"
          />
        </NavLink>
        <div class="px-5 pt-2">
          <div className="grid place-items-center">
            <h3 class="text-neutral-900 font-bold text-xl tracking-tight">
              {name}
            </h3>
          </div>
        </div>
        <div className="px-5">
          <div class="grid grid-cols-2 gap-5 items-center justify-between mt-3">
            <span class="text-[1.4em] font-bold text-zinc-900 ">
              {price} &#8381;
            </span>
            <button
              href="#"
              className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-4 py-2 text-center "
              onClick={addItemHandler}
            >
              В корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
