import React, { useState, useEffect, useContext,useCallback } from "react";
import Context from "../store/context";
import { collection, query, where, getDocs } from "firebase/firestore";
import { MdOutlineBrokenImage, MdFavoriteBorder } from "react-icons/md";
import { BsCamera } from "react-icons/bs";
import styles from "./editprofile.module.css";
import Post from "./post";
import { db } from "../fire";
const EditProfile = () => {
  const ctx = useContext(Context);
  const [isPost, setIsPost] = useState(true);
  const [posts, setPosts] = useState([]);
  const liked = ["a", "b", "c", "d", "e", "f"];
  
  const getPost = async () => {
    const q = query(collection(db, "trends"), where("uid", "==", ctx.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPosts((posts) => {
        return [
          [
            doc.data().description,
            doc.data().image,
            doc.data().uid,
            doc.data().username,
            doc.id,
          ],
          ...posts,
        ];
      });
    });
  };
  useEffect(() => {
    setPosts([]);
    getPost();
  }, [getPost]);
  
  return (
    <div className={styles.profile}>
      <div className={styles.user}>
        <div className={styles.image}>
          <div className={styles.changeImg}>
            <BsCamera />
          </div>
          <img className={styles.img} alt="add profile pic" />
        </div>
        <div>
          <p>{ctx.username}</p>
          <div className={styles.friendsAndPosts}>
            <p>0 Friends</p>
            <p>{posts.length}Posts</p>
          </div>
        </div>
      </div>
      <div className={styles.PostsAndLiked}>
        <div onClick={() => setIsPost(true)}>
          <MdOutlineBrokenImage />
          Posts
        </div>
        <div onClick={() => setIsPost(false)}>
          <MdFavoriteBorder />
          Liked
        </div>
      </div>
      <div>
        {isPost
          ? posts.map((element, index) => {
              return <Post key={index} element={element} />;
            })
          : liked.map((element, index) => {
              return <div key={index}>{element}</div>;
            })}
      </div>
    </div>
  );
};

export default EditProfile;
