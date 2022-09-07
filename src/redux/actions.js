import axios from "axios";

//Aca declaro las variables donde tengan el action types.
//declaro las variables para no tener error de tipeo

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMON_DETAILS = "GET_POKEMON_DETAILS";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const POKEMON_VALUE = 'POKEMON_VALUE';
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const ORDER_NAME = "ORDER_NAME";
export const ORDER_ATTACK = "ORDER_ATTACK";
export const LOADING = "LOADING";
export const CLEAR_PAGE = "CLEAR_PAGE";


// debido al uso del middleware "thunk", me permite trabajar con acciones asincrónicas.
// Necesitamos hacer uso de este middleware ya que nuestras peticiones al back siempre son asincrónicas,
// por lo tanto, necesitamos ese "delay" para despachar nuestra action hasta que la data nos llegue.

//la funcion "dispatch" recibida en la funcion interna me sirve para despachar la action que
// va a llegar a nuestro reducer.


//obtener todos los pokemones
export const getAllPokemon = () => {
   return async(dispatch) => {
    dispatch({type: LOADING, payload: true})
        let res = await axios.get('https://pokemon-deploy-22.herokuapp.com/pokemons');
        //console.log(res.data.data)
        dispatch({ type: GET_ALL_POKEMONS, payload: res.data.data});
   };
};

//obtener por name los pokemones
export const getPokemonValue = (value)=> {
console.log(value)
  return async(dispatch) => {
    dispatch({type: LOADING, payload: true})
    try {
      let res = await axios.get(`https://pokemon-deploy-22.herokuapp.com/pokemons?value=${value}`);
      dispatch({ type: POKEMON_VALUE, payload: res.data.data })
    }catch(err){
      dispatch({ type: POKEMON_VALUE, payload: { err: err.response.data.msg } })
    }
  };
};


//obtener detalles de un pokemon
export const getPokemonDetails = (id) => {
  return async(dispatch) => {
    dispatch({type: LOADING, payload: true})
     let res = await axios.get(`https://pokemon-deploy-22.herokuapp.com/pokemons/${id}`);
     dispatch({ type: GET_POKEMON_DETAILS, payload: res.data.data });
    
  };
};

//crear un pokemon
export const createPokemon = (pokemon) => {
    return async(dispatch) => {
      let res = await axios.post('https://pokemon-deploy-22.herokuapp.com/pokemons', pokemon);
      // console.log({msg: res.data.msg})
      dispatch({ type: CREATE_POKEMON , payload: res.data.msg });
    
    };
};


//obtener todos los tipos 
export const getAllTypes = () => {
  return async(dispatch) => {
      let res = await axios.get('https://pokemon-deploy-22.herokuapp.com/types');
    dispatch({ type: GET_ALL_TYPES, payload: res.data.data });
  };
};

export function clearPage(){
  return {
      type: CLEAR_PAGE
  };
};


export const filterTypes = (payload) => {
  return {
     type: FILTER_BY_TYPES,
     payload
  };
};

export const filterCreated = (payload)=> {
  return {
    type: FILTER_BY_CREATED,
    payload
  };
};

export const orderByName = (payload)=> {
  return {
    type: ORDER_NAME,
    payload
  };
};

export const orderByAttack = (payload)=> {
  return {
    type: ORDER_ATTACK,
    payload
  };
};


//obtener todos los tipos con fetch
// export const getAllTypes = () => {
//   return async(dispatch) => {
//       const res = await fetch('http://localhost:3001/types');
//       const datos = await res.json()
//     dispatch({ type: GET_ALL_TYPES, payload: datos.data });
//   };
// };

//promesas
// export const getAllTypes = ()=> {
//   return (dispatch)=> {
//     axios.get('http://localhost:3001/types').then(res => {
//       dispatch({type: GET_ALL_TYPES, payload: res.data.data })
//     })
   
// }
// }



