import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import MessageWrapper from "../components/MessageWrapper";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import { baseUrl } from "../url";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProducts, setShowProducts] = useState([]);
  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(baseUrl + "products");
    const data = await response.json();
    setProducts(data);
    setShowProducts(data);
    setIsLoading(false);
  };

  const fetchFilteredData = async (field) => {
    const items = products.filter((person) => {
      return person.name.toLowerCase().includes(field.toLowerCase());
    });
    setShowProducts(items);
  };

  useEffect(() => fetchData, []);

  return (
    <>
      {isLoading ? (
        <MessageWrapper>
          <p className="text-center">Загружается...</p>
        </MessageWrapper>
      ) : (
        <div className="grid gap-5 min-w-full place-items-center">
          <Search handler={fetchFilteredData} />

          {showProducts.length !== 0 ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-7">
              {showProducts.map((item) => (
                <ProductCard
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  product_id={item.product_id}
                />
              ))}
            </div>
          ) : (
            <MessageWrapper>
              <p className="text-center">Такого у нас нет</p>
            </MessageWrapper>
          )}
        </div>
      )}
    </>
  );
}

export default ProductsPage;
