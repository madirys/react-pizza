import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string
}

const FullProduct: React.FC = () => {
  const [product, setProducct] = React.useState<Product>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios(
          "https://628e18f4368687f3e7104a3b.mockapi.io/items/" + id
        );
        setProducct(data);
      } catch (error) {
        navigate('/not-found');
      }
    }
    fetchProduct();
  }, [id, navigate]);

  if (!product) {
    return <>Загрузка...</>
  }

  return (
    <div className="container">
      <img src={product.imageUrl} alt={product.name} />
      <h2>{product.name}</h2>
      <h4>{product.price}</h4>
    </div>
  );
};

export default FullProduct;
