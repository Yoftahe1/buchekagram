import { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Context from "./store/context";
import Homepage from "./page/homepage";
// import { RxHamburgerMenu } from "react-icons/rx";
import styles from "./app.module.css";
import Sidebar from "./component/sidebar";
import MiddleBar from "./component/middlebar";
import Search from "./component/search";
import EditProfile from "./component/editprofile";
import Chats from "./component/chats";
import Message from "./component/message";
import Sign from "./page/sign";
import Create from "./component/create";
function App() {
  const location = useLocation();
  const ctx = useContext(Context);
  return (
    <div>
      {location.pathname === "/" ? null : location.pathname === "/chat" ? (
        <Sidebar />
      ) : (
        <>
          <div className={styles.logoAndMore}>
            <p className={styles.logo}>Instagram</p>
          </div>
          <Sidebar />
        </>
      )}

      <Routes>
        <Route path="/" element={<Sign />} />
        {ctx.uid === null ? null : (
          <>
            <Route
              path="/home"
              element={
                <Homepage>
                  <MiddleBar />
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
          </>
        )}
        <Route path="/*" element={<h1>404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
