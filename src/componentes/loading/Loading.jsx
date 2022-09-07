import React from 'react';
import styles from './loading.module.css'

const Loading = () => {
    let url = 'https://i.pinimg.com/originals/0a/50/6f/0a506fe0f6c211128cf1ed370655c6a1.gif'
  return (
    <div className={styles.containerLoading}>
      <img src={url} alt="loading" width='300px' heigth='200px' />
    </div>
  )
}

export default Loading