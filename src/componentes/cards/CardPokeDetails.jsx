import React, { useEffect } from "react";
import { connect } from "react-redux";
import { clearPage, getPokemonDetails } from "../../redux/actions";
import Loading from "../loading/Loading";
import styles from "./cardpokeDetails.module.css";


const CardPokeDetails = ({ match: { params: { id },}, pokemonDetails, getPokeDetails , loading, clearPage}) => {
  //const {match: {params: {id}}} = props;
  useEffect(() => {
    getPokeDetails(id);
     return () => clearPage()
  }, [getPokeDetails, clearPage, id]);

  //console.log(pokemonDetails)
  const { name, life, attack, defending, speed, height, weight, image, type, image2, tipos } = pokemonDetails;

  return (
    <div className={styles.body}>
    
      { loading ? ( <div className={styles.divLoading}><Loading /></div> ) :
      pokemonDetails && (
        <div className={styles.containerDetail}>
          <div className={styles.card}>
          <div className={styles.content}>
          <div><h3>{name}</h3></div> 
          <p>Id : 
             <span> {id} </span>
          </p>
          <p>Life : 
            <span> {life} </span> 
          </p>          
          <p>Attack : 
            <span> {attack} </span>
          </p>
          <p>Defense : 
            <span> {defending} </span>
          </p>
          <p>Speed : 
            <span> {speed} </span>
          </p>
          <p>Height : 
            <span> {height} </span>
          </p>
          <p>Weight : 
            <span> {weight} </span>
          </p>
          <div> Type : {type ? <span>{ type }</span>  : tipos?.map((element) => (<span key={element.id}> {element.name} </span>))}</div>
          </div>
            <img src={image2 ? image2 : image} alt={name}/>
          </div>
        </div>
          
      )}
    </div>
  );
};
//pedido de estado a redux
export const mapStateToProps = (state) => {
  return {
    pokemonDetails: state.pokemonDetails,
    loading: state.loading
  };
};
//despachamos la accion que necesito
export const mapDispatchToProps = (dispatch) => {
  return {
    getPokeDetails: (id) => dispatch(getPokemonDetails(id)),
     clearPage: ()=> dispatch(clearPage())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardPokeDetails);
