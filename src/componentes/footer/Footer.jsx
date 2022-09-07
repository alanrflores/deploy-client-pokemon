import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css'

const Footer = () => {
    let url = 'https://images.wikidexcdn.net/mwuploads/esssbwiki/7/77/latest/20111028181540/TituloUniversoPok%C3%A9mon.png'
  return (
    <>
    
              <nav className={styles.footer}>
                  <Link to="/"><img  src={url} alt="png-logo" /></Link>
                      <h2> Developed by Alan Flores </h2>
              </nav>
     
    </>
  )
};


export default Footer;