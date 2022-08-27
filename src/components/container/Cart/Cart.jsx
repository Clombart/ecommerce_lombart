import { useContext } from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { CartContext } from '../../../context/CartContextProvider';
import ItemCart from '../../ItemCart/ItemCart'
import ModalComponentForm from '../../ModalComponentForm/ModalComponentForm';
import EmptyCart from '../../EmptyCart/EmptyCart';

import './cart.css';


const Cart = () => {

  const {
    cart,
    emptyCart,
    totalPrice,
    totalAmount,
    handleShow,

  } = useContext(CartContext)
  totalAmount()


  return (
    <div className="container-fluid px-0">
      <h1 className="my-4">Carrito</h1>
      {(cart.length)
        ?
        <div className="container-fluid change px-0">
          <ul className="px-0">
            {cart.map((product) =>
              <ItemCart item={product} key={product.item.id} />
            )}
          </ul>

          <div className="g-container mt-2">
            <div className=" d-flex flex-column mx-auto justify-content-center px-2">
              <div className="my-3">
                <h4 className="my-1">Cantidad de Productos:</h4>
                <h4 className="my-1">{totalAmount()}</h4>
              </div>
              <h3 className="my-2">Total: ${totalPrice()}</h3>
            </div>

            <div className="containerButtons">
              <Button variant="warning" onClick={handleShow}>Finalizar Compra</Button>
              <ModalComponentForm />
              <Link to={`/`}>
                <Button variant="success w-100">Seguir Comprando</Button>
              </Link>
              <Button variant="danger" onClick={emptyCart}>Vaciar Carrito</Button>
            </div>
          </div>
        </div>

        :
        <>
          <EmptyCart />
        </>
      }
    </div>
  )
}

export default Cart