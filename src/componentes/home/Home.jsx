import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllPokemon } from "../../redux/actions";
import CardPoke from "../cards/CardPoke";
import SearchBar from "../search/SearchBar";
import styles from "./home.module.css";
import Paginado from "../paginado/Paginado";
import Loading from "../loading/Loading";
import FilterPerTypes from "../filter/FilterPerTypes";
import Filtercreated from "../filter/Filtercreated";
import OrderName from "../order/OrderName";
import OrderAttack from "../order/OrderAttack";

const Home = ({ pokemones, getAllPokemonAction, loading }) => {
  //orden x nombre
  // eslint-disable-next-line no-unused-vars
  const [orderName, setOrderName] = useState("");
  //orden x ataque
  // eslint-disable-next-line no-unused-vars
  const [orderAttacks, setOrderAttacks] = useState("");

  //me va a ejecutar despues de cada renderizado los pokemones
  useEffect(() => {
    getAllPokemonAction();
  }, [getAllPokemonAction]);

  //pagina actual
  const [currentPage, setCurrentPage] = useState(1);
  //cantidad de pokemones por pagina
  const pokemonPerPage = 12;
  //seteo el ultimo indice de pokemon, sobre la pagina actual x la cantidad de pokemones por pagina
  const lastPokemon = currentPage * pokemonPerPage;
  //primer indice de pokemon, ultimo indice de pokemon - la cantidad de pokemones por pagina
  const firstPokemon = lastPokemon - pokemonPerPage;
  //se va a ir guardando cuales son los pokemones que hay que renderizar dependiendo de la pagina
  const currentPokemons = pokemones.slice(firstPokemon, lastPokemon);

  //paginado, me ayuda a renderizar, va a setear la pagina en el nro que yo vaya apretando
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleResetFilter = (e) => {
     e.preventDefault();
     getAllPokemonAction(currentPokemons)
     setCurrentPage(1);
  }

  return (
    <div className={styles.home}>
      <div className={styles.banner}>
        <img alt={""} />
      </div>
      <hr />
      <div className={styles.divFiltered}>
        {/* orden x nombre */}
        <OrderName setOrderName={setOrderName} />
        {/* orden x ataque */}
        <OrderAttack setOrderAttacks={setOrderAttacks} />
        {/* filtro de creados, api y todos */}
        <Filtercreated setPage={setCurrentPage} />
        {/* filtro por tipos */}
        <FilterPerTypes setPage={setCurrentPage} />
        <div>
          <button onClick={(e)=> handleResetFilter(e)}>
            Reset Filter
          </button>
        </div>
      </div>
      <section className={styles.section1}>
        <div className={styles.divInput}>
          {/* barra de busqueda */}
          <SearchBar setPage={setCurrentPage} />
        </div>
      </section>
      <section className={styles.sectionCard}>
        {loading ? (
          <Loading />
        ) : (
          currentPokemons?.map((pokemon) =>
            pokemon.err ? (
              <h2 key={pokemon.err}>{pokemon.err}</h2>
            ) : (
              <CardPoke
                key={pokemon?.id}
                id={pokemon?.id}
                image={pokemon?.image}
                name={pokemon?.name}
                type={pokemon?.type}
                tipos={pokemon?.tipos}
              />
            )
          )
        )}
      </section>
      {/* paginado */}
      <Paginado
        pokemonPerPage={pokemonPerPage}
        pokemones={pokemones.length}
        paginado={paginado}
      />
    </div>
  );
};

//pedido de estado a redux
export const mapStateToProps = (state) => {
  return {
    pokemones: state.pokemones,
    loading: state.loading,
  };
};
//despachamos la accion que necesito
export const mapDispatchToProps = (dispatch) => {
  return {
    getAllPokemonAction: () => dispatch(getAllPokemon()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
