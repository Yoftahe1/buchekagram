import { useContext } from "react";
import { Route, Routes, useLocation,NavLink } from "react-router-dom";
import Context from "./store/context";
import Homepage from "./page/homepage";
// import { RxHamburgerMenu } from "react-icons/rx";
import styles from "./app.module.css";
import Sidebar from "./component/sidebar";
import Search from "./component/search";
import EditProfile from "./component/editprofile";
import Chats from "./component/chats";
import Message from "./component/message";
import Comment from './component/comment'
import Sign from "./page/sign";
import Create from "./component/create";
import { useEffect } from "react";
import { useState } from "react";
import Posts from "./component/posts";
import {BiLogOut} from 'react-icons/bi'
function App() {
  const location = useLocation();
  const ctx = useContext(Context);
  const [width, setWidth] = useState();
  function detectSize() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [width]);
  return (
    <div>
      {location.pathname === "/home" ||
      location.pathname === "/search" ||
      location.pathname === "/editprofile" ||
      location.pathname === "/create" ||
      location.pathname === "/chats" ? (
        <>
          <div className={styles.logoAndMore}>
            <p className={styles.logo}>buchekagram</p>
            <NavLink to='/' id={styles.logout} className={styles.link}><BiLogOut/></NavLink>
          </div>
          <Sidebar />
        </>
      ) : location.pathname === "/chat" && width > 550 ? (
        <Sidebar />
      ) : location.pathname === "/comment" && width > 550 ? (
        <Sidebar />
      ) : null}
      <Routes>
        <Route path="/" element={<Sign />} />
        {ctx.uid === null ? null : (
          <>
            <Route
              path="/home"
              element={
                <Homepage>
                  <Posts />
                </Homepage>
              }
            />
            <Route
              path="/search"
              element={
                <Homepage>
                  <Search />
                </Homepage>
              }
            />
            <Route
              path="/editprofile"
              element={
                <Homepage>
                  <EditProfile />
                </Homepage>
              }
            />
            <Route
              path="/create"
              element={
                <Homepage>
                  <Create />
                </Homepage>
              }
            />
            <Route
              path="/chats"
              element={
                <Homepage>
                  <Chats />
                </Homepage>
              }
            />
            <Route
              path="/chat"
              element={
                <Homepage>
                  <Message />
                </Homepage>
              }
            />
            <Route
              path="/comment"
              element={
                <Homepage>
                  <Comment />
                </Homepage>
              }
            />
          </>
        )}
        <Route path="/*" element={<h1>404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
