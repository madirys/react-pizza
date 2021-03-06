import React, { ChangeEventHandler } from "react";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearch } from "../../redux/slices/filterSlice";

import styles from "./Search.module.scss";

export const Search: React.FC = () => {
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);

  // return memorized callback function to avoid unnecessary rerenders
  const updateSearchValue = React.useMemo(
    () => debounce(value => dispatch(setSearch(value)), 250),
    [dispatch]
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const onClickClear = () => {
    dispatch(setSearch(""))
    setValue("");
    // Fix for Firefox
    setTimeout(() => {
      inputRef.current?.focus();
    }, 1);
  };

  return (
    <div className={styles.root}>
      <svg
        className={[styles.icon, styles.icon__search].join(" ")}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.56,18.44l-4.67-4.67a7,7,0,1,0-2.12,2.12l4.67,4.67a1.5,1.5,0,0,0,2.12,0A1.49,1.49,0,0,0,20.56,18.44ZM5,10a5,5,0,1,1,5,5A5,5,0,0,1,5,10Z"
          fill="#464646"
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type="text"
        placeholder="Поиск по названию"
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={[styles.icon, styles.icon__clear].join(" ")}
          data-name="Layer 1"
          height="200"
          id="Layer_1"
          viewBox="0 0 200 200"
          width="200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
        </svg>
      )}
    </div>
  );
};