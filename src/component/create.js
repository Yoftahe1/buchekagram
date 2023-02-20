import React, { useState, useRef, useContext } from "react";
import { FaCamera, FaImage } from "react-icons/fa";
import { SlClose } from "react-icons/sl";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../fire";
import Context from "../store/context";
import styles from "./create.module.css";
const Create = () => {
  const [image, setImage] = useState(null);
  const [preview,setPreview]=useState(null)
  const fileRef = useRef();
  const description = useRef();
  const ctx = useContext(Context);
  function addToPost(event) {
    setImage(event.target.files[0])
    
    const reader = new FileReader();
    if (event?.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setPreview(readerEvent.target?.result);
    };
  }

  async function submit() {
    const date = new Date();
    if (description.current.value.trim().length > 0) {
      if (image !== null) {
        let message=description.current.value
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `/trend_image/${ctx.uid}${date}.jpg}`
           
        );

        const uploadTask = uploadBytesResumable(storageRef, image);
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
            getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
              await addDoc(collection(db, "trends"), {
                description: message,
                image: url,
                uid: ctx.uid,
                username: ctx.username,
                comment: [],
                likes: [],
              });
            });
          }
        );

      } else {
        await addDoc(collection(db, "trends"), {
          description: description.current.value,
          image: "",
          uid: ctx.uid,
          username: ctx.username,
          comment: [],
          likes: [],
        });
      }
    }
    description.current.value = "";
    setImage(null);
    setPreview(null);
  }
  return (
    <div className={styles.create}>
      <h3>What do you want to create?</h3>
      <div className={styles.post}>
        <p className={styles.type}>Create Post</p>
        {preview !== null && (
          <div>
            <div className={styles.close} onClick={() => {setImage(null);setPreview(null)}}>
              <SlClose />
            </div>
            <img className={styles.image} src={preview} alt="Post" />
          </div>
        )}

        <div className={styles.choice}>
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={addToPost}
            style={{ display: "none" }}
          />

          <div
            onClick={() => {
              fileRef.current?.click();
            }}
          >
            <FaImage />
            Gallery
          </div>
          <div>
            <FaCamera />
            Camera
          </div>
        </div>
        <input
          className={styles.input}
          ref={description}
          placeholder="Add description."
        />
        <button className={styles.button} onClick={() => submit()}>
          Create
        </button>
      </div>
      <div className={styles.post}>
        <p className={styles.type}>Create Group</p>
        <input className={styles.input} placeholder="Enter group name." />
        <div className={styles.buttons}>
          <button className={styles.button}>Add members</button>
          <button className={styles.button}>Create</button>
        </div>
      </div>
      <div className={styles.post}>
        <p className={styles.type}>Create Channel</p>
        <input className={styles.input} placeholder="Enter channel name." />
        <div className={styles.buttons}>
          <button className={styles.button}>Add members</button>
          <button className={styles.button}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default Create;
