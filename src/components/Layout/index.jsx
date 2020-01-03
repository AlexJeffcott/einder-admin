import React from "react";
import styles from "./Layout.module.css";

const Layout = ({header, firstCol, secondCol, thirdCol}) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h1>{header}</h1>
      </div>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h3>{firstCol.title}</h3>
          <div>{firstCol.content}</div>
        </div>
        <div className={styles.column}>
          <h3>{secondCol.title}</h3>
          <div>{secondCol.content}</div>
        </div>
        <div className={styles.column}>
          <h3>{thirdCol.title}</h3>
          <div>{thirdCol.content}</div>
        </div>
      </div>
    </div>
  );
};

Layout.defaultProps = {
  header: "Header Section",
  firstCol: {
    title: "Title One",
    content: "Content for the first column"
  },
  secondCol: {
    title: "Title Two",
    content: "Content for the second column"
  },
  thirdCol: {
    title: "Title Third",
    content: "Content for the third column"
  }
};

export default Layout;
