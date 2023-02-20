import React, { useState, useEffect, useContext } from "react";
import Context from "../store/context";
import { useNavigate } from "react-router-dom";
import Profile from "./profile";
import styles from "./chats.module.css";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../fire";
const Chats = () => {
  const navigate = useNavigate();
  const [chat, setChat] = useState([]);
  const [type,setType]=useState('chats')
  const ctx = useContext(Context);
  useEffect(() => {
    const q = query(
      collection(db, "friends"),
      where("uid", "array-contains", ctx.uid)
    );
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setChat((chat) => {
          let message = [];
          doc.data().message.forEach((data) => {
            message.push([data.message, data.sender]);
          });
          return [
            [
              [doc.data().uid[0], doc.data().uid[1]],
              [doc.data().username[0], doc.data().username[1]],
              message,
              doc.id,
            ],
            ...chat,
          ];
        });
      });
    });
  }, [ctx.uid]);
  function setPersonAndMessage(person, message, id) {
    ctx.setPerson(person);
    // ctx.setMessage(message);
    ctx.setID(id);
  }
  return (
    <div className={styles.Chats}>
      <div className={styles.topBar}>
        <div onClick={()=>setType('chats')}>Chats</div>
        <div onClick={()=>setType('groups')}>Groups</div>
        <div onClick={()=>setType('channels')}>Channels</div>
      </div>
      {type==='chats'?<div className={styles.container}>
        {chat.map((element, index) => {
          return (
            <div
              onClick={() => {
                ctx.uid === element[0][0]
                  ? setPersonAndMessage(element[1][1], element[2], element[3])
                  : setPersonAndMessage(element[1][0], element[2], element[3]);
                navigate("/chat");
              }}
              key={index}
              className={styles.user}
            >
              <Profile
                name={ctx.uid === element[0][0] ? element[1][1] : element[1][0]}
              />
              <div className={styles.notification}>11</div>
            </div>
          );
        })}
      </div>:type==='groups'?null:null}
    </div>
  );
};

export default Chats;
