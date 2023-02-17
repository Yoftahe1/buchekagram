import React, { useState, useEffect } from "react";
import Post from "./post";
import styles from "./posts.module.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../fire";
const Posts = () => {
  const [trends, setTrends] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "trends"), (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setTrends((trends) => {
          return [
            [
              doc.data().description,
              doc.data().image,
              doc.data().uid,
              doc.data().username,
              doc.data().likes,
              doc.id,
            ],
            ...trends,
          ];
        });
      });
    });
  }, []);

  return (
    <div className={styles.posts}>
      {trends.map((element, index) => {
        return <Post key={index} element={element} />;
      })}
    </div>
  );
};

export default Posts;
