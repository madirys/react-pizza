import React from "react";

import styles from "./EmptyProducts.module.scss";

export const EmptyProducts: React.FC = () => {
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