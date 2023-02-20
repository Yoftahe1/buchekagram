import React, { useContext, useRef } from "react";
import Context from "../store/context";
import Profile from "./profile";
import styles from "./comment.module.css";
import { db } from "../fire";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {BiArrowBack} from 'react-icons/bi'
const Comment = () => {
  const ctx = useContext(Context);
  const comment = useRef();
  const navigate=useNavigate()
  async function addComment() {
    if (comment.current.value.trim().length > 0) {
      ctx.setComment((comments) => {
        return [
          ...comments,
          {
            senderUid: ctx.uid,
            senderUsername: ctx.username,
            message: comment.current.value,
          },
        ];
      });
      const commentRef = doc(db, "trends", ctx.docId);
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
  return (
    <div className={styles.comment}>
      <div className={styles.topBar} onClick={() => navigate("/home")}>
        <div className={styles.svg}><BiArrowBack /></div>
        <h3>Comments</h3>
      </div>
      
      <div className={styles.middleBar}>
        {ctx.comments.map((element, index) => {
          return (
            <div key={index}>
              <Profile name={element.senderUsername} />
              <p className={styles.description}>{element.message}</p>
            </div>
          );
        })}
      </div>
      <div className={styles.bottomBar}>
        <input
          type="text"
          className={styles.input}
          ref={comment}
          placeholder="Leave a comment"
        />
        <button className={styles.postButton} onClick={addComment}>
          comment
        </button>
      </div>
    </div>
  );
};

export default Comment;
