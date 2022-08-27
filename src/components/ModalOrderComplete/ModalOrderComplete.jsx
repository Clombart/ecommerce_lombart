import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import { CartContext } from '../../context/CartContextProvider';

import './ModalOrderComplete.css';


const ModalOrderComplete = ({ id }) => {

    const { showBis, handleCloseBis, handleClose, resetCart } = useContext(CartContext)
    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false)
    }, 3000)

    const resetAll = () => {
        resetCart()
        handleCloseBis()
        handleClose()
    }

    return (
        <Modal show={showBis} className='modalOc' size="md" centered>
            <Modal.Header>
                <Modal.Title>Compra realizada con exito</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <br></br>
                {loading
                    ? <Spinner className="position-relative top-50 start-50 mb-3" animation="border" variant="warning" role="status"></Spinner>
                    : <p className='text-center'> Tu código de compra es: {id}</p>
                }
            </Modal.Body>
            <Modal.Footer>
                <Link to='/'><Button variant="warning" onClick={resetAll}> Volver al inicio </Button></Link>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalOrderComplete