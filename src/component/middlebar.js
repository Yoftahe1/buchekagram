import React from "react";
import Posts from "./posts";
import styles from "./middlebar.module.css";
const MiddleBar = () => {
  return (
    <div className={styles.middleBar}>
      <Posts />
    </div>
  );
};

export default MiddleBar;
