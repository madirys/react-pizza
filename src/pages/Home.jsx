import React from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Categories, { categoriesList } from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { category, sort, order, search, currentPage } = useSelector(
    (state) => state.filter
  );

  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);

  const onCahngeCategory = (category) => {
    dispatch(setCategory(category));
  };

  const onChangeCurrentPage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const fetchItems = async () => {
    setIsLoading(true);
    const api = "https://628e18f4368687f3e7104a3b.mockapi.io/items?page=";
    try {
      const res = await axios.get(
        `${api}${currentPage}&limit=4&${
          category.id > 0 ? `category=${category.id}&` : ""
        }
        sortBy=${sort.sortProperty}&order=${order}${
          search ? `&name=${search}` : ""
        }`
      );
      setItems(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

  };

  // if first render then check url-params and save to redux
  React.useEffect(() => {
    if (window.location.search) {
      const query = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (item) => item.sortProperty === query.sortProperty
      );
      const category = categoriesList.find(
        (item) => item.id === Number(query.categoryId)
      );
      dispatch(
        setFilters({
          category,
          sort,
          ...query,
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchItems();
    }
    isSearch.current = false;
  }, [category, sort, order, search, currentPage]);

  // if params changed
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId: category.id,
        currentPage,
        order,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [category, sort, order, currentPage]);

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
      <Pagination
        currentPage={currentPage}
        onPageChange={(number) => onChangeCurrentPage(number)}
      />
    </div>
  );
};

export default Home;
