import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Categories, { categoriesList, TCategory } from "../components/Categories";
import EmptyProducts from "../components/EmptyProducts";
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
import { fetchProducts } from "../redux/slices/productsSlice";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { category, sort, order, search, currentPage } = useSelector(
    (state: any) => state.filter
  );
  const { items, status } = useSelector((state: any) => state.products);

  const onCahngeCategory = (category: TCategory) => {
    dispatch(setCategory(category));
  };

  const onChangeCurrentPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getProducts = async () => {
    const categoryId = `${category.id > 0 ? `category=${category.id}` : ""}`;
    const { sortProperty } = sort;
    const searchInput = `${search ? `&search=${search}` : ""}`;

    dispatch(
      // @ts-ignore
      fetchProducts({
        currentPage,
        categoryId,
        sortProperty,
        order,
        searchInput,
      })
    );
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
      getProducts();
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

  const products = items.map((item: any) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={category} onCahngeCategory={onCahngeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">{category.name}</h2>
      {status === "error" ? (
        <EmptyProducts />
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : products}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        onPageChange={(number) => onChangeCurrentPage(number)}
      />
    </div>
  );
};

export default Home;