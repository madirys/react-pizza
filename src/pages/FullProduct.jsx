import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const FullProduct = () => {
  const [product, setProducct] = React.useState({});
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchProduct(params) {
      try {
        const { data } = await axios(
          "https://628e18f4368687f3e7104a3b.mockapi.io/items/" + id
        );
        setProducct(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, []);

  return (
    <div className="container">
      <img src={product.imageUrl} alt={product.name} />
      <h2>{product.name}</h2>
      <h4>{product.price}</h4>
    </div>
  );
};

export default FullProduct;
