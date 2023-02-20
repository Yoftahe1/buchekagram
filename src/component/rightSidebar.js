import React from 'react'
import Profile from './profile'
import styles from './rightSidebar.module.css'
const RightSidebar = () => {
  const friends=['u','v','w','x','y','z']
  return (
    <div className={styles.rightSidebar}>
      <div className={styles.topBar}>Online friends</div>
      <div>
        {friends.map((element,index)=>{
          return <div key={index}><Profile  name={element}/></div>
        })}
      </div>
    </div>
  )
}

export default RightSidebar