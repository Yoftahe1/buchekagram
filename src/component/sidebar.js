import React from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import styles from "./sidebar.module.css";
import { MdOutlineHome } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import {BiLogOut} from "react-icons/bi";
import {CiSun} from "react-icons/ci";
import {IoPaperPlaneOutline} from "react-icons/io5"
import {RiAddBoxLine} from "react-icons/ri"
// import {RxHamburgerMenu} from "react-icons/rx"
const Sidebar = () => {
  const navigate=useNavigate();
  const location = useLocation();
  return (
    <div className={location.pathname !== "/chat"?styles.sidebar:styles.nomargin}>
      <div className={styles.links}>
        <div className={styles.logo}>Instagram</div>
        <div className={styles.interactions}>
        <div onClick={()=>{navigate('/home')}} className={styles.link}><MdOutlineHome/><p className={styles.linkName}>Home</p></div>
        <div onClick={()=>{navigate('/search')}} className={styles.link}><BsSearch/><p className={styles.linkName}>Search</p></div>
        <div onClick={()=>{navigate('/chats')}} className={styles.link}><IoPaperPlaneOutline/><p className={styles.linkName}>Message</p></div>
        <div onClick={()=>{navigate('/create')}} className={styles.link}><RiAddBoxLine/><p className={styles.linkName}>Create</p></div>
        <div onClick={()=>{navigate('/editprofile')}} className={styles.link}><BiUserCircle/><p className={styles.linkName}>Profile</p></div>
        <div onClick={()=>{}} className={styles.link}><CiSun/><p className={styles.linkName}>Night Mode</p></div>
        <div onClick={()=>{navigate('/')}} className={styles.link}><BiLogOut/><p className={styles.linkName}>Log Out</p></div>
        </div>
      </div>
      {/* <div className={styles.more}><RxHamburgerMenu/><p className={styles.linkName}>More</p></div> */}
    </div>
  );
};
export default Sidebar;
