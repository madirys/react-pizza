import React from "react";
import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setCurrentPage } from "../redux/slices/filterSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { category, sort, order, search, currentPage } = useSelector((state) => state.filter);

  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);

  const onCahngeCategory = (category) => {
    dispatch(setCategory(category));
  };

  const onChangeCurrentPage = (page) => {
    dispatch(setCurrentPage(page));
  }

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://628e18f4368687f3e7104a3b.mockapi.io/items?page=${currentPage}&limit=4&${
          category.id > 0 ? `category=${category.id}&` : ""
        }sortBy=${sort.sortProperty}&order=${order}${
          search ? `&name=${search}` : ""
        }`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sort, order, search, currentPage]);

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={category} onCahngeCategory={onCahngeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">{category.name}</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onPageChange={(number) => onChangeCurrentPage(number)} />
    </div>
  );
};

export default Home;
