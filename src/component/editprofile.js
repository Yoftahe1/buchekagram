import React, { useState, useEffect, useContext, useRef } from "react";
import Context from "../store/context";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { MdOutlineBrokenImage, MdFavoriteBorder } from "react-icons/md";
import { BsCamera } from "react-icons/bs";
import styles from "./editprofile.module.css";
import Post from "./post";
import { db } from "../fire";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
const EditProfile = () => {
  const ctx = useContext(Context);
  const [isPost, setIsPost] = useState(true);
  const [posts, setPosts] = useState([]);
  const [liked, setLiked] = useState([]);
  const fileRef = useRef();
  useEffect(() => {
    async function getPost() {
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
              doc.data().likes,
              doc.data().comment,
              doc.id,
            ],
            ...posts,
          ];
        });
      });
    }
    getPost();
    async function getLiked() {
      const q = query(
        collection(db, "trends"),
        where("likes", "array-contains", ctx.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setLiked((liked) => {
          return [
            [
              doc.data().description,
              doc.data().image,
              doc.data().uid,
              doc.data().username,
              doc.data().likes,
              doc.data().comment,
              doc.id,
            ],
            ...liked,
          ];
        });
      });
    }
    getLiked();
  }, [ctx.uid]);

  function addToPost(event) {
    if (event.target.files[0] !== null) {
      const storage = getStorage();
      const storageRef = ref(storage, `/profile_image/${ctx.uid}.jpg}`);
      const uploadTask = uploadBytesResumable(
        storageRef,
        event.target.files[0]
      );
      uploadTask.on(
        "state changed",
        (snapshot) => {
          // const percent = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // );
          // console.log("Upload is " + percent + "% done");
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            await setDoc(
              doc(db, "users", ctx.uid),
              {
                image: url,
              },
              { merge: true }
            );
          });
        }
      );
    }
  }
  return (
    <div className={styles.profile}>
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={addToPost}
        style={{ display: "none" }}
      />
      <div className={styles.user}>
        <div className={styles.image}>
          <div
            className={styles.changeImg}
            onClick={() => {
              fileRef.current?.click();
            }}
          >
            <BsCamera />
          </div>
          {ctx.image?<img src={ctx.image} className={styles.img} alt="add profile pic" />:
          <div className={styles.background}></div>}
        </div>
        <div>
          <p>{ctx.username}</p>
          <div className={styles.friendsAndPosts}>
            <p>0 Friends</p>
            <p>{posts.length} Posts</p>
            <p>{liked.length} Liked</p>
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
              return <Post key={index} element={element} />;
            })}
      </div>
    </div>
  );
};

export default EditProfile;
