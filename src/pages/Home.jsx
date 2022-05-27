import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = ({searchValue}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [category, setCategory] = React.useState({ id: 0, name: "Все" });
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [orderBy, setOrderBy] = React.useState("asc");

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://628e18f4368687f3e7104a3b.mockapi.io/items?${
        category.id > 0 ? `category=${category.id}&` : ""
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
  }, [category, sortType, orderBy]);

  const pizzas = items.filter(el => el.name.toLowerCase().includes(searchValue)).map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...Array(12)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={category}
          onCahngeCategory={(category) => setCategory(category)}
        />
        <Sort
          value={sortType}
          onChangeSort={(id) => setSortType(id)}
          orderBy={orderBy}
          setOrderBy={(order) => setOrderBy(order)}
        />
      </div>
      <h2 className="content__title">{category.name}</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </div>
  );
};

export default Home;
