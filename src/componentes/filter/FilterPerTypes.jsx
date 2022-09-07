import React, { useEffect } from "react";
import { connect } from "react-redux";
import { filterTypes, getAllTypes } from "../../redux/actions";
import styles from "./filter.module.css";

const FilterPerTypes = ({ getAllTypes, filterTypes, types, setPage }) => {
  useEffect(() => {
    getAllTypes();
  }, [getAllTypes]);

  const handleFilterTypes = (e) => {
    e.preventDefault();
    filterTypes(e.target.value);
    setPage(1);
  };
  return (
    <>
      <select className={styles.selects} onChange={(e) => handleFilterTypes(e)}>
        <option hidden value="">
          Filtered types
        </option>
        <option value="all">All</option>
        {types?.map((element) => (
          <option key={element.name} value={element.name}>
            {element.name}
          </option>
        ))}
      </select>
    </>
  );
};
//pedido de estado a redux
export const mapStateToProps = (state) => {
  return {
    types: state.types,
  };
};
//despachamos la accion que necesito
export const mapDispatchToProps = (dispatch) => {
  return {
    filterTypes: (payload) => dispatch(filterTypes(payload)),
    getAllTypes: () => dispatch(getAllTypes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPerTypes);
