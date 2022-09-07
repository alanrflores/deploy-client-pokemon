import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {  createPokemon, getAllTypes } from '../../redux/actions';
import styles from './createPoke.module.css'

//validacion
const validate = (input) => {
    let error = {};
  if (!input.name) {
      error.name = "Name is required";
  };
  if(input.attack >= 100){
    error.attack= "Exceeds the maximum";
  };
  if(input.defending >= 100 ){
    error.defending= "Exceeds the maximum";
  };
  if(input.speed >= 100){
    error.speed= "Exceeds the maximum";
  };
   if(!input.image){
     error.image = "Image is required";
   }else if(input.image && !(input.image.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) !== null)){ // eslint-disable-line
    error.image= "The link provided is not an image";
  };
    return error;
};

const CreatePoke = ({ createNewPokemon, allTypes, TYPES}) => {


  const [error, setError]= useState({});
  const [select, setSelect] = useState({types : []});
  const [input, setInput] = useState({
    name: "",
    life:"",
    attack:"",
    defending:"",
    speed:"",
    height:"",
    weight:"",
    image: "",

  });

//me ejecuta despues de cada renderizado, los types
  useEffect(()=> {
    allTypes()
  },[allTypes]);



//destructuro los inputs
const { name, life, attack, defending, speed, height, weight, image } = input;

const handleChange = (e) => {
  setInput((input) => ({ ...input, [e.target.name]: e.target.value }));
  setError(validate({
      ...input,
      [e.target.name]: e.target.value
 })); 
};

//destructuro types
const { types } = select;

//detecta el cambio , si no existe aux ? agregamelos o seleccionalo, si no, no hagas nada -- que no se repita
const handleSelectChange = (e)=> {
 e.preventDefault();
 let aux = types.includes(e.target.value);
 if(!aux){
   setSelect({ types: [...types, e.target.value] });
 };
};

//vaciar o delete types, traeme el distinto
const emptyOptionsTypes = (e, key)=> {
 e.preventDefault();
 let newTypes = [];
 if(types && types.length > 0){
   for(let i = 0; i< types.length; i++){
     if(i !== key){
       newTypes.push(types[i])
     };
   };
 };
 setSelect({
   types : newTypes
 });
};

const handleSubmit = (e) =>{
  e.preventDefault();
  setError(validate(input)); 
  let array = []
    types.forEach((el) => {
      // console.log(el)
   let elementoJson = JSON.parse(el)
   array.push(elementoJson.id)
});
//creo el obj
 let obj = {
   name: name,
   life: life,
   attack: attack,
   defending: defending,
   speed: speed,
   height: height,
   weight: weight,
   image: image,
   tipos: array,
 };
 const errors = validate(input);
 //validacion 
 if(Object.values(errors).length === 0){
   createNewPokemon(obj)
   console.log(obj)
   alert('Pokemon created');
 }else{
   alert('Please complete the fields correctly')
 };
 setInput({
  name: "",
  life:"",
  attack:"",
  defending:"",
  speed:"",
  height:"",
  weight:"",
  image: "",
 
 });
setSelect({types: "" });
};

//console.log(pokemon)
  return (
    <div className={styles.container}>
     
       <h1>Create a new pokemon</h1> 
     
       
      <div className={styles.divForm}>
        <form onSubmit={(e)=> handleSubmit(e)}>
          <label>Name: </label>
          <input 
          type="text"
          name="name"
          value={name || ""}
          onChange={(e)=> handleChange(e)}
          className={styles.inputName}
          placeholder='example: pikachu' />
          {/* --- error --- */}
          {error.name && error.name  === 'Name is required' 
          ? <p style= {{color: "red"}}>{error.name}</p> 
          : ("")
          }

           <label>Life: </label>
          <input 
          type="number"
          name="life"
          value={life || ""}
          onChange={(e)=> handleChange(e)}
          className={styles.inputLife}
          placeholder='life...' />

           <label>Attack: </label>
          <input 
          type="number"
          name="attack"
          value={attack || ""}
          onChange={(e)=> handleChange(e)}
          className={styles.inputAttack}
          placeholder='max 99'  />

            {/* --- error --- */}
            {error.attack && error.attack  === 'Exceeds the maximum' 
          ? <p style= {{color: "red"}}>{error.attack}</p> 
          : ("")
          }

           <label>Defense: </label>
          <input 
          type="number"
          name="defending"
          value={defending || ""}
          onChange={(e)=> handleChange(e)}
          className={styles.inputDefense}
          placeholder='max 99' />

            {/* --- error --- */}
            {error.defense && error.defense  === 'Exceeds the maximum' 
          ? <p style= {{color: "red"}}>{error.defense}</p> 
          : ("")
          }
        
           <label>Speed: </label>
          <input 
          type="number"
          name="speed"
          value={speed || ""}
          onChange={(e)=> handleChange(e)}
          className={styles.inputSpeed}
          placeholder='speed...' />

            {/* --- error --- */}
            {error.speed && error.speed  === 'Exceeds the maximum' 
          ? <p style= {{color: "red"}}>{error.speed}</p> 
          : ("")
          }
         
           <label>Height: </label>
          <input 
          type="number"
          name="height"
          value={height || ""}
          onChange={(e)=> handleChange(e)}
          className={styles.inputHeight}
          placeholder='height...' />

          
           <label>Weight: </label>
          <input 
          type="number"
          name="weight"
          value={weight || ""}
          onChange={(e)=> handleChange(e)}
          className={styles.inputWeight}
          placeholder='weight...' />
         
         <label>Image: </label>
          <input 
          type="text"
          name="image"
          value={image}
          onChange={(e)=> handleChange(e)}
          className={styles.inputWeight}
          placeholder='upload your image ...' />

            {/* --- error --- */}
            {error.image && error.image  === 'Image is required' 
          ? <p style= {{color: "red"}}>{error.image}</p> 
          :  error.image && error.image  === 'The link provided is not an image' 
          ? <p style= {{color: "red"}}>{error.image}</p>  
          : ("")
          }

    
         <div className={styles.divSelect}>
                        {TYPES?.length > 0 ? (
                        <>
                        <label>Types: </label>
                        <select 
                            value={types || ""} 
                            onChange={(e)=> handleSelectChange(e)} 
                            className={styles.selects}
                            multiple aria-label="multiple select example">
                            {TYPES?.map((pointer,key) =>{
                             
                                return (
                                    <option 
                                        key={key}
                                        name={pointer.name} 
                                        id={pointer.id}
                                        //value tiene que ser string o nro no puede ser un array o objeto
                                        value={JSON.stringify({
                                        id: pointer.id,       
                                        name: pointer.name
                                        })}>
                                          {pointer.id}- 
                                          {pointer.name}
                                    </option>  
                                )
                            })}
                        </select>
                        { types?.length > 0 ? (
                            <span className={styles.list}>
                                {types?.map((point,key) => {
                                  //console.log(point);
                                  let aux = JSON.parse(point)
                                  //console.log(aux);
                                    return (
                                    <div key={key} className={styles.typesMap}>
                                        <h4>{aux.name}</h4>
                                        <button className={styles.delete} onClick={(e) => emptyOptionsTypes(e,key)}>x</button>
                                    </div>  
                                    )
                                })}
                            </span>
                        ):(
                            <></>
                        )}  
                        </> 
                        ) : ("")}   
                    </div> 
         
          <div className={styles.divButton}>
          <button className={styles.buttonCreate} type='submit'>Create pokemon</button>
          </div>
        </form>
      </div>
    </div>
  );
};
// export default CreatePoke;

export const mapStateToProps = (state) => {
  return {
    TYPES: state.types,
 
  }
}
export const mapDispachToProps = (dispatch) => {
  return{
     createNewPokemon: (pokemon) => dispatch(createPokemon(pokemon)),
     allTypes: ()=> dispatch(getAllTypes()),

  
  }
}
export default connect(mapStateToProps ,mapDispachToProps)(CreatePoke);