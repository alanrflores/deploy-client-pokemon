import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";


const Navbar = () => {

 let url = 'https://images.wikidexcdn.net/mwuploads/esssbwiki/7/77/latest/20111028181540/TituloUniversoPok%C3%A9mon.png'
  return (
    <>
      <nav className={styles.containerNav}>
        <div className={styles.divNav}>
          <Link to="/"><img  src={url} alt="png-logo" /></Link>
          <Link to="/home">Home</Link>
          <Link to='/create'>Create Pokemon</Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
