import React from "react";
import { Link } from "react-router-dom";

import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className="container">
      <div className={styles.root}>
        <h1>
          <span>☹️</span>
          <br />
          Ничего не найдено.
        </h1>
        <p className={styles.description}>
          К сожалению, данная страница отсутсвует.
        </p>
        <div className={styles.goBack}>
          <Link
            to="/"
            className="button button--outline button--add go-back-btn"
          >
            <span>Вернуться на главную</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundBlock;
