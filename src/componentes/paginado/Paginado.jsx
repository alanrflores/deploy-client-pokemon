import React from 'react'
import styles from './paginado.module.css'
//props del otro componente
 const Paginado = ({pokemonPerPage, pokemones, paginado}) => {
    const pageNumber = [];
    //me va a redondear para arriba, todos los pokemones sobre la cantidad de pokemones que quiero por pagina
    //y con ese resultado voy a pushearlo al array
    for (let i = 0; i < Math.ceil(pokemones/pokemonPerPage); i++) {
        pageNumber.push(i+1);
        
    }
  return (
    <nav className={styles.containerNav}>
        <ul className={styles.paginado}>
            {
                //si existe este arreglo, mapealo y devolveme cada numero que te devuelva el paginado
                pageNumber && pageNumber.map((number)=> (
                    <p className={styles.number} key={number} >
                    <button onClick={()=> paginado(number)}>{number}</button>
                    </p>
                ))
            }
        </ul>
    </nav>
  )
};

export default Paginado;
