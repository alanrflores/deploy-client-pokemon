//configurar el reducer, (del lado del cliente) el mas importante

//importar los action types
import {
  GET_ALL_POKEMONS,
  GET_POKEMON_DETAILS,
  CREATE_POKEMON,
  GET_ALL_TYPES,
  // GET_NAME_POKEMONS,
  ORDER_NAME,
  FILTER_BY_TYPES,
  FILTER_BY_CREATED,
  LOADING,
  ORDER_ATTACK,
  CLEAR_PAGE,
  // POKEMON_ATTACK
  POKEMON_VALUE

} from "./actions";

//definir estados que vamos a manejar
const initialState = {
  loading: true,
  pokemones: [],
  allPokemones: [],
  pokemonDetails: [],
  types: [],
};
//recibe un estado inicial y la action
const rootReducer = (state = initialState, action) => {
  if (action.type === LOADING) {
    return {
      ...state,
      loading: action.payload,
    };
  }

  if (action.type === GET_ALL_POKEMONS) {
    return {
      ...state,
      loading: false,
      pokemones: action.payload,
      allPokemones: action.payload,
    };
  }

  if (action.type === POKEMON_VALUE) {
    if (action.payload.err) {
      return {
        ...state,
        loading: false,
        pokemones: [action.payload],
      };
    }
    return {
      ...state,
      loading: false,
      pokemones: action.payload,
    };
  }

  if (action.type === GET_POKEMON_DETAILS) {
    return {
      ...state,
      loading: false,
      pokemonDetails: action.payload,
    };
  }
  if (action.type === CLEAR_PAGE) {
    return {
      ...state,
      pokemonDetails: [],
    };
  }
  if (action.type === CREATE_POKEMON) {
    //console.log(action.payload)
    return {
      ...state,
      pokemones: [...state.pokemones, action.payload],
    };
  };

  if (action.type === GET_ALL_TYPES) {
    return {
      ...state,
      types: action.payload,
    };
  }

  if (action.type === FILTER_BY_TYPES) {
    const filteredTypes =
      action.payload === "all"
        ? state.allPokemones
        : state.allPokemones.filter((elemnt) =>
            elemnt.type?.includes(action.payload)
          );
    return {
      ...state,
      pokemones: filteredTypes,
    };
  }
  if (action.type === FILTER_BY_CREATED) {
    const createdFilter =
      action.payload === "created"
        ? state.allPokemones.filter((elemnt) => elemnt.createInDb)
        : state.allPokemones.filter((elemnt) => !elemnt.createInDb);
    return {
      ...state,
      pokemones: action.payload === "all" ? state.allPokemones : createdFilter,
    };
  }
  if (action.type === ORDER_NAME) {
    let orderName =
      action.payload === "asc"
        ? state.pokemones.sort((a, b) =>(a.name.localeCompare(b.name)))                 
        : state.pokemones.sort((a, b) => (b.name.localeCompare(a.name)))
    return {
      ...state,
      pokemones: orderName,
    };
  };

  if (action.type === ORDER_ATTACK) {
    let orderAttack =
      action.payload === "asc"
        ? state.pokemones.sort((a, b) => (a.attack - b.attack))
        : state.pokemones.sort((a, b) => (b.attack - a.attack));
    return {
      ...state,
      pokemones: orderAttack,
    };
  };

  return state;
};

export default rootReducer;
