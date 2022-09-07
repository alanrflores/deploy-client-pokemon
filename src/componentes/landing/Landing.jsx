import React from 'react';
import { Link } from 'react-router-dom';
import poke from '../../cover/poke.mp4'
import styles from './landing.module.css';

const Landing = () => {
    let url = 'https://i.pinimg.com/originals/9e/39/23/9e3923825ba4a4fa967858f980b8460f.png'


  return (
    <div className={styles.containerVideo}>
        <video src={poke} autoPlay loop muted></video>
        <div className={styles.containerTitulo}>
        <Link to="/"><img  src={url} width="400px" height= "300px" alt="png-logo" /></Link>
            <Link to={'/home'}>Ingresar</Link>
        </div>
    </div>
  )
};


export default Landing;