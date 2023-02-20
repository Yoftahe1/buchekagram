import React, { useContext } from "react";
import styles from "./post.module.css";
import { MdOutlineFavoriteBorder,MdFavorite } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import Profile from "./profile";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../fire";
import Context from "../store/context";
import { useLocation, useNavigate } from "react-router-dom";
import { SlClose } from "react-icons/sl";
// import Ripple from 'ripple-button'
// import { Button } from "button-ripple-react";
const Post = (props) => {
  const ctx = useContext(Context);
  const navigate=useNavigate()
  const location =useLocation()

  async function like() {
    const commentRef = doc(db, "trends", props.element[6]);
    await updateDoc(commentRef, {
      likes: arrayUnion(ctx.uid),
    });
  }
  
  return (
    <div className={styles.post}>
      <div className={styles.user}>
        <Profile name={props.element[3]} />
        {location.pathname==='/editprofile'&&<SlClose />}
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
        {/* <Ripple color="rgba(12, 33, 124, 0.3)" duration={500} style={{width:'min-content'}}> */}
        {/* <Button backgroundColor="transparent"> */}
          <div className={styles.button} onClick={like}>
            {props.element[4].includes(ctx.uid)?<MdFavorite/>:<MdOutlineFavoriteBorder />}
            {props.element[4].length}
            <p className={styles.type}> Like</p>
          </div>
          {/* </Button> */}
          {/* </Ripple> */}
          <div className={styles.button} onClick={()=>{ctx.setID(props.element[6]);ctx.setComment(props.element[5]);navigate('/comment')}}>
            <BiCommentDetail />
            {props.element[5].length}
            <p className={styles.type}> Comment</p>
          </div>
          <div className={styles.button}>
            <TbMessageCircle />
            <p className={styles.type}>Message</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
