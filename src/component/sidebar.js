import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./sidebar.module.css";
import { MdOutlineHome } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import {BiLogOut} from "react-icons/bi";
import {IoPaperPlaneOutline} from "react-icons/io5"
import {RiAddBoxLine} from "react-icons/ri"
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.links}>
        <div className={styles.logo}>buchekagram</div>
        <div className={styles.interactions}>
        <NavLink to='/home' className={({isActive})=>isActive ? styles.active : styles.link} ><MdOutlineHome/><p className={styles.linkName}>Home</p></NavLink>
        <NavLink to='/search' className={({isActive})=>isActive ? styles.active : styles.link}><BsSearch/><p className={styles.linkName}>Search</p></NavLink>
        <NavLink to='/create' className={({isActive})=>isActive ? styles.active : styles.link}><RiAddBoxLine/><p className={styles.linkName}>Create</p></NavLink>
        <NavLink to='/chats' className={({isActive})=>isActive ? styles.active : styles.link}><IoPaperPlaneOutline/><p className={styles.linkName}>Message</p></NavLink>
        <NavLink to='/editprofile' className={({isActive})=>isActive ? styles.active : styles.link}><BiUserCircle/><p className={styles.linkName}>Profile</p></NavLink>
        <NavLink to='/' id={styles.logout} className={styles.link}><BiLogOut/><p className={styles.linkName}>Log Out</p></NavLink>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
