import React, { useContext, useRef } from "react";
import styles from "./post.module.css";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AiOutlineShareAlt } from "react-icons/ai";
import { TbMessageCircle } from "react-icons/tb";
import Profile from "./profile";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../fire";
import Context from "../store/context";

const Post = (props) => {
  const comment = useRef();
  const ctx = useContext(Context);
  async function addComment() {
    if (comment.current.value.trim().length > 0) {
      const commentRef = doc(db, "trends", props.element[5]);
      await updateDoc(commentRef, {
        comment: arrayUnion({
          senderUid: ctx.uid,
          senderUsername: ctx.username,
          message: comment.current.value,
        }),
      });
    }
    comment.current.value = "";
  }
  async function like() {
    const commentRef = doc(db, "trends", props.element[5]);
    await updateDoc(commentRef, {
      likes: arrayUnion(ctx.uid),
    });
  }
  return (
    <div className={styles.post}>
      <div className={styles.user}>
        <Profile name={props.element[3]} />
      </div>
      <div className={styles.posted}>
        {props.element[0].length !== 0 && (
          <p className={styles.description}>{props.element[0]}</p>
        )}
        {props.element[1].length !== 0 && (
          <img
            src={props.element[1]}
            alt="imageMe"
            className={styles.postImage}
          />
        )}

        <div className={styles.interactions}>
          <div className={styles.button} onClick={like}>
            <MdOutlineFavoriteBorder />
            <p className={styles.type}>{props.element[4].length} Likes</p>
          </div>
          <div className={styles.button}>
            <AiOutlineShareAlt />
            <p className={styles.type}>Share</p>
          </div>
          <div className={styles.button}>
            <TbMessageCircle />
            <p className={styles.type}>Message</p>
          </div>
        </div>

        <div className={styles.postMessage}>
          <input
            className={styles.input}
            ref={comment}
            placeholder="Leave your comment."
          />
          <button className={styles.postButton} onClick={addComment}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
