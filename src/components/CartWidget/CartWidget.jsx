import { useContext } from 'react';
import { CartContext } from '../../context/CartContextProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import './cartWidget.css';

const CartWidget = () => {
  const { totalAmount } = useContext(CartContext)

  return (
    <div className='d-flex'>
      <FontAwesomeIcon icon={faCartShopping} className="cartButton" />
      {totalAmount() !== 0 && <h5 className='counter'> {totalAmount()}</h5>}
    </div>
  )
}

export default CartWidget