import React from "react";
import styles from "./profile.module.css";
const Profile = (props) => {
  return (
    <div className={styles.profile}>
      {props.image ? <img alt="profile" /> : <div className={styles.background}></div>}
      <div>
        <p className={styles.username}>{props.name}</p>
        <p className={styles.seen}>Last seen recently</p>
      </div>
      
    </div>
  );
};

export default Profile;
