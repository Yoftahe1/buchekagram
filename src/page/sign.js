import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../store/context";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../fire";
import styles from "./sign.module.css";
const Sign = () => {
  const [signIn, setSignIn] = useState(true);
  let [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const ctx = useContext(Context);
  const navigate = useNavigate();
  function submit() {
    // const auth = getAuth(app);
    setLoading(true);
    if (signIn) {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(async (userCredential) => {
          const docRef = doc(db, "users", userCredential.user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            // console.log(docSnap.data());
            ctx.setUid(docSnap.data().uid);
            ctx.setUsername(docSnap.data().username);
            setLoading(false);

            navigate("/home");
          } else {
            setLoading(false);

            console.log("No such document!");
          }
        })
        .catch((error) => {
          setLoading(false);

          console.log(error);
          setErrorMessage(error.message);
        });
    } else {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(async (userCredential) => {
          await setDoc(doc(db, "users", userCredential.user.uid), {
            email: email.current.value,
            uid: userCredential.user.uid,
            username: username.current.value,
          });
        })
        .catch((error) => {
          setLoading(false);

          console.log(error);
          setErrorMessage(error.message);
        });
    }
  }

  return (
    <div className={styles.sign}>
      <div className={styles.signType}>
        Account {signIn === true ? "sign-In" : "sign-up"}
      </div>
      {!signIn && (
        <>
          <p className={styles.inputType}>User-name</p>
          <input className={styles.input} ref={username} />
        </>
      )}
      <p className={styles.inputType}>Email</p>
      <input className={styles.input} ref={email} value='test@test.com'/>
      <p className={styles.inputType}>Password</p>
      <input className={styles.input} ref={password} value='test@test'/>
      <div className={styles.container}>
        <p
          className={styles.changeSign}
          onClick={() => {
            setSignIn(!signIn);
          }}
        >
          {signIn === true ? "Sign-Up" : "Sign-In"}
        </p>

        <p className={styles.forgot}>test@test2 Forgot Password?</p>
      </div>

      <button className={styles.button} onClick={submit}>
        {signIn === true ? "Sign-In" : "Sign-Up"}
      </button>

      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loading}></div>
        </div>
      )}
    </div>
  );
};

export default Sign;
