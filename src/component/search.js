import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { FiUserPlus } from 'react-icons/fi';
import { db } from "../fire";
import Profile from "./profile";
import styles from "./search.module.css";
import Context from "../store/context";
const Search = () => {
  const [users, setUsers] = useState([]);
  const ctx = useContext(Context);
  const search = async (event) => {
    const q = query(
      collection(db, "users"),
      where("username", ">=", event.target.value),
      where("username", "<=", event.target.value + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);
    setUsers([]);
    querySnapshot.forEach((doc) => {
      setUsers((users) => {
        return [doc.data(), ...users];
      });
    });
  };
  async function add(uid, username) {
    await setDoc(doc(db, "friends", `${ctx.uid}${uid}`), {
      message: [],
      uid: [ctx.uid, uid],
      username: [ctx.username, username],
    });
  }
  return (
    <div className={styles.search}>
      <div className={styles.container}>
      <h3>Search by username</h3>
      <input
        className={styles.input}
        onChange={search}
        placeholder="Enter username you want to search"
      /></div>
      <div className={styles.users}>
        {users.map((element, index) => {
          return (
            <div className={styles.user}>
              <Profile key={index} name={element.username} />
              <button
                className={styles.button}
                onClick={() => add(element.uid, element.username)}
              >
                <FiUserPlus />
               <p>Add friend</p> 
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
