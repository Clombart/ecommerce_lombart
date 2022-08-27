import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import ContactForm from '../Form/ContactForm';
import { CartContext } from '../../context/CartContextProvider';

import './ModalComponentForm.css'

const ModalComponent = () => {

    const { show, handleClose } = useContext(CartContext)

    return (
        <Modal show={show} onHide={handleClose} className='modal' size="md" centered>
            <Modal.Header>
                <Modal.Title>Formulario de Contacto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ContactForm />
            </Modal.Body>
            <Button variant="secondary" onClick={handleClose}> Cerrar </Button>
        </Modal>
    )
}

export default ModalComponent