import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort, setOrder } from "../redux/slices/filterSlice";

type TSortProps = {
  name: string,
  sortProperty: string,
};

export const sortList: TSortProps[] = [
  { name: "популярности", sortProperty: "rating" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "title" },
];

const Sort: React.FC = () => {
  const dispatch = useDispatch();
  const { sort, order } = useSelector((state: any) => state.filter);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  const onChangeSort = (item: TSortProps) => {
    dispatch(setSort(item));
  };

  const onChangeOrder = () => {
    const direction = order === "asc" ? "desc" : "asc";
    dispatch(setOrder(direction));
  };

  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      const path = event.composedPath();
      if (!path.includes(sortRef.current)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <div
          onClick={onChangeOrder}
          className={`sort__label-order sort__label-order--${order}`}
        >
          <svg
            width="13"
            height="8"
            viewBox="0 0 10 6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z" />
          </svg>
        </div>
        <b>Сортировка по:</b>
        <span
          onMouseOver={() => setIsOpen(true)}
          onClick={() => setIsOpen(!isOpen)}
        >
          {sort.name}
        </span>
      </div>
      {isOpen && (
        <div onMouseLeave={() => setIsOpen(false)} className="sort__popup">
          <ul>
            {sortList.map((item, index) => (
              <li
                onClick={() => {
                  onChangeSort(item);
                  setIsOpen(false);
                }}
                className={
                  sort.sortProperty === item.sortProperty ? "active" : ""
                }
                key={index}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;