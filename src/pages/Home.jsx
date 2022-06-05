import React from "react";
import { SearchContext } from "../App";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/slices/filterSlice";

const Home = () => {
  const dispatch = useDispatch();
  const {category, sort, order} = useSelector((state) => state.filter);

  const {searchValue } = React.useContext(SearchContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const onCahngeCategory = (category) => {
    dispatch(setCategory(category));
  }

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://628e18f4368687f3e7104a3b.mockapi.io/items?page=${currentPage}&limit=4&${
        category.id > 0 ? `category=${category.id}&` : ""
      }sortBy=${sort.sortProperty}&order=${order}${
        searchValue ? `&name=${searchValue}` : ""
      }`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sort, order, searchValue, currentPage]);

  const pizzas = items
    .map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={category}
          onCahngeCategory={onCahngeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">{category.name}</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onPageChange={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
