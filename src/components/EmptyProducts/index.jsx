import React from "react";

import styles from "./EmptyProducts.module.scss";

const EmptyProducts = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>☹️</span>
        <br />
        Произошла ошибка.
      </h1>
      <p className={styles.description}>
        К сожалению, не удалось загрузить продукты. Попробуйте позже.
      </p>
    </div>
  );
};

export default EmptyProducts;
