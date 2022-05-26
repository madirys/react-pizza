import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [orderBy, setOrderBy] = React.useState("asc");

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://628e18f4368687f3e7104a3b.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}&` : ""
      }sortBy=${sortType.sortProperty}&order=${orderBy}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, orderBy]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onCahngeCategory={(id) => setCategoryId(id)}
        />
        <Sort
          value={sortType}
          onChangeSort={(id) => setSortType(id)}
          orderBy={orderBy}
          setOrderBy={(order) => setOrderBy(order)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(12)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </div>
  );
};

export default Home;
