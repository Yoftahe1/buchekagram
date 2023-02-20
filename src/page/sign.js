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
    setErrorMessage(null);
    setLoading(true);
    if (signIn) {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(async (userCredential) => {
          const docRef = doc(db, "users", userCredential.user.uid);
          try {
            const docSnap = await getDoc(docRef);
            ctx.setUid(docSnap.data().uid);
            ctx.setUsername(docSnap.data().username);
            ctx.setImage(docSnap.data().image)
            setLoading(false);
            navigate("/home");
          } catch (error) {
            setLoading(false);
            setErrorMessage("Something went wrong");
          }
        })
        .catch((error) => {
          setLoading(false);
          if (
            error.message === "Firebase: Error (auth/network-request-failed)."
          ) {
            setErrorMessage("Please check your internet connection");
          } else {
            setErrorMessage("Email address and Password don't match");
          }
        });
    } else {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(async (userCredential) => {
          try {
            await setDoc(doc(db, "users", userCredential.user.uid), {
              email: email.current.value,
              uid: userCredential.user.uid,
              username: username.current.value,
            });
          } catch (error) {
            setLoading(false);
            setErrorMessage("Something went wrong");
          }
        })
        .catch((error) => {
          setLoading(false);
          if (
            error.message === "Firebase: Error (auth/network-request-failed)."
          ) {
            setErrorMessage("Please check your internet connection");
          } else {
            setErrorMessage("Email address already taken");
          }
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
          <input
            className={styles.input}
            ref={username}
            placeholder="Enter Username"
          />
        </>
      )}
      <p className={styles.inputType}>Email</p>
      <input
        className={styles.input}
        ref={email}
        placeholder="Enter Email address"
        defaultValue="test@test.com"
      />
      <p className={styles.inputType}>Password</p>
      <input
        className={styles.input}
        ref={password}
        placeholder="Enter Password"
        defaultValue="test@test"
      />
      <div className={styles.container}>
        <p
          className={styles.changeSign}
          onClick={() => {
            setErrorMessage(null);
            setSignIn(!signIn);
          }}
        >
          {signIn === true ? "Sign-Up" : "Sign-In"}
        </p>

        <p className={styles.forgot}>Forgot Password?</p>
      </div>
      <p className={styles.error}>{errorMessage}</p>
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
