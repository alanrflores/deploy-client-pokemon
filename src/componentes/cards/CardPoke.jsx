import React from 'react';
import { Link } from 'react-router-dom';
import styles from './cardpoke.module.css'

const CardPoke = (props) => {
//console.log(props);
 const {name, type, image, id, tipos } = props;

  return (

    <div className={styles.containerDiv}>
        <div className={styles.card}>
        <img src={image} alt={name} />
        </div>
         <div className={styles.divTypes}>
        <Link to={`/home/${id}`}>
        <h2 className={styles.title}>{name}</h2>
        </Link>
        
         {tipos?.length > 0 ?  tipos?.map((element)=> (
           <p key={element.name}>{element.name}</p>
            )): (<p>{`${ type }`}</p>)
           }
         </div>
       
    </div> 
    
  )
}

export default CardPoke