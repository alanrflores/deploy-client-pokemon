import React from "react";
import { connect } from "react-redux";
import { orderByName } from "../../redux/actions";
import styles from "./order.module.css";

const OrderName = ({ orderArrays, setOrderName }) => {
  //detecta el cambio para ordernar por nombre
  const handleOrderName = (e) => {
    e.preventDefault();
    orderArrays(e.target.value);

    //paso importante! seteo el estado local que uno vacio, para que se modifique y vuelva a renderizar la pagina con los pokemones cambiados
    setOrderName(`ordenado, ${e.target.value}`);
  };
  return (
    <>
      <select className={styles.selects} onChange={(e) => handleOrderName(e)}>
        <option hidden value="">
          Order name
        </option>
        <option value="asc">ASC name</option>
        <option value="desc">DSC name</option>
      </select>
    </>
  );
};

//despachamos la accion que necesito
export const mapDispatchToProps = (dispatch) => {
  return {
    orderArrays: (payload) => dispatch(orderByName(payload)),
  };
};

export default connect(null, mapDispatchToProps)(OrderName);
