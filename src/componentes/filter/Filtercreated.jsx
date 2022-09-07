import React from "react";
import { connect } from "react-redux";
import { filterCreated } from "../../redux/actions";
import styles from "./filter.module.css";

const Filtercreated = ({ filterCreated, setPage }) => {
  //detecta el cambio para filtrar los pokemones creados
  const handleFilterCreated = (e) => {
    filterCreated(e.target.value);
    setPage(1);
  };
  return (
    <>
      <select
        className={styles.selects}
        onChange={(e) => handleFilterCreated(e)}
      >
        <option hidden value="">
          Filtered
        </option>
        <option value="all">All</option>
        <option value="created">Created</option>
        <option value="api">Existing</option>
      </select>
    </>
  );
};

//despachamos la accion que necesito
export const mapDispatchToProps = (dispatch) => {
  return {
    filterCreated: (payload) => dispatch(filterCreated(payload)),
  };
};

export default connect(null, mapDispatchToProps)(Filtercreated);
