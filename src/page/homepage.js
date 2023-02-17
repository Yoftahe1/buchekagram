import React from 'react'
import RightSidebar from '../component/rightSidebar'
import styles from './homepage.module.css'
const Homepage = (props) => {
  return (
    <div className={styles.homepage}>
      <div className={styles.bars}>
        <div className={styles.sidebarPlaceholder}></div>
        {props.children}
        <RightSidebar/>
        <div className={styles.rightSidebarPlaceholder}></div>
      </div>
        
    </div>
  )
}

export default Homepage