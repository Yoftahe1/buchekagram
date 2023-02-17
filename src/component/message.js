import { useRef, useContext } from "react";
import Profile from "./profile";
import { HiOutlinePaperClip, HiDotsVertical } from "react-icons/hi";
import { RiSendPlane2Line } from "react-icons/ri";
import { BiArrowBack } from "react-icons/bi";
import styles from "./message.module.css";
import Context from "../store/context";
import { useNavigate } from "react-router-dom";
import { db } from "../fire";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const Message = () => {
  const text = useRef();
  const ctx = useContext(Context);
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    if(text.current.value.trim().length>0){
    const friendRef = doc(db, "friends", ctx.docId);
    await updateDoc(friendRef, {
      message: arrayUnion({ sender: ctx.uid, message: text.current.value }),
    });}
    text.current.value=''
  }

  return (
    <div className={styles.message}>
      <div className={styles.topBar}>
        <div className={styles.profileAndBack}>
          <div className={styles.svg} onClick={() => navigate("/chats")}>
            <BiArrowBack />
          </div>
          <Profile name={ctx.person} />
        </div>
        <div className={styles.svg}>
          <HiDotsVertical />
        </div>
      </div>

      <div className={styles.texts}>
        {ctx.messages.map((element, index) => {
          return (
            <div
              className={
                ctx.uid === element[1] ? styles.sender : styles.receiver
              }
              key={index}
            >
              <div>
                {element[0]}
                </div>
            </div>
          );
        })}
      </div>
      <div className={styles.messageBar}>
        <HiOutlinePaperClip className={styles.button} />
        <form onSubmit={submit} className={styles.form}>
          <input
            className={styles.input}
            ref={text}
            placeholder="Enter message"
          />
        </form>
        <RiSendPlane2Line className={styles.button} onClick={submit} />
      </div>
    </div>
  );
};

export default Message;
