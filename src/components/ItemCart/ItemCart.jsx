import { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { CartContext } from '../../context/CartContextProvider';

import './ItemCart.css'


const ItemCart = ({ item }) => {
    const {  deleteItem } = useContext(CartContext)

    return (
        <li className="list-group">
            <Card className="container-fluid d-flex flex-row align-items-center justify-items-center justify-content-evenly w-100 mx-auto mt-2" >
                <Card.Img variant="top" src={item.item.img} className="img" />
                <Card.Body className="d-flex flex-row  align-items-center justify-content-evenly">
                    <Card.Title className="d-block  ">{`${item.item.name}`}</Card.Title>
                    <Card.Title className="d-block ">{`${item.amount}`}</Card.Title>
                    <Card.Title className="d-block">{`$${(item.item.price * item.amount)}`}</Card.Title>
                </Card.Body>
                <button className="trashButton" onClick={() => deleteItem(item.item.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
            </Card>
        </li>
    )
}

export default ItemCart