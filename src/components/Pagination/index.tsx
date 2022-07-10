import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

type TProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<TProps> = React.memo(({currentPage, onPageChange}) => {  
  return (
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onPageChange(event.selected + 1)}
        forcePage={currentPage - 1}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
      />
  );
});