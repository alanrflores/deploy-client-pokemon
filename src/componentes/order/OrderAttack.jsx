import React from "react";
import { connect } from "react-redux";
import { orderByAttack } from "../../redux/actions";
import styles from "./order.module.css";

const OrderAttack = ({ orderAttack, setOrderAttacks }) => {
  //detecta el cambio para ordernar por ataque
  const handleOrderAttack = (e) => {
    e.preventDefault();
    orderAttack(e.target.value);
    //paso importante! seteo el estado local que uno vacio, para que se modifique y vuelva a renderizar la pagina con los pokemones cambiados
    setOrderAttacks(`ordenado, ${e.target.value}`);
  };
  return (
    <>
      <select className={styles.selects} onChange={(e) => handleOrderAttack(e)}>
        <option hidden value="">
          Order attack
        </option>
        <option value="asc">ASC Attack</option>
        <option value="desc">DSC Attack</option>
      </select>
    </>
  );
};

//despachamos la accion que necesito
export const mapDispatchToProps = (dispatch) => {
  return {
    orderAttack: (payload) => dispatch(orderByAttack(payload)),
  };
};

export default connect(null, mapDispatchToProps)(OrderAttack);
